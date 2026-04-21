const getApiBaseUrl = () => {
  const rawBaseUrl = import.meta.env.VITE_API_URL || "";
  return rawBaseUrl.trim().replace(/\/$/, "");
};

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const parseResponseBody = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : {};
};

export const apiRequest = async (
  path,
  { method = "GET", body, headers = {}, token } = {},
) => {
  const requestHeaders = {
    Accept: "application/json",
    ...headers,
  };

  const requestConfig = {
    method,
    headers: requestHeaders,
  };

  if (body !== undefined) {
    requestHeaders["Content-Type"] = "application/json";
    requestConfig.body = JSON.stringify(body);
  }

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, requestConfig);
  const data = await parseResponseBody(response);

  if (!response.ok || data?.success === false) {
    throw new ApiError(
      data?.message || "Something went wrong. Please try again.",
      response.status,
      data,
    );
  }

  return data;
};
