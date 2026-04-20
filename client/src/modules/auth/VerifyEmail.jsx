import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../shared/components/Button";
import { ShieldCheck, ArrowLeft, CheckCircle } from "lucide-react";

const OTP_LENGTH = 6;
const COOLDOWN_SECONDS = 60;

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(COOLDOWN_SECONDS);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Format countdown for display
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // OTP input handlers
  const handleOtpChange = (index, value) => {
    // Allow only single digit
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-advance to next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move back on Backspace when current field is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    // Move forward on ArrowRight
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    // Move backward on ArrowLeft
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);

    if (pasted.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < pasted.length; i++) {
        newOtp[i] = pasted[i];
      }
      setOtp(newOtp);
      setError("");

      // Focus the next empty input or the last one
      const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  // Submit
  const otpValue = otp.join("");
  const isComplete = otpValue.length === OTP_LENGTH;

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (!isComplete) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    // Mock verification — no backend call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      console.log("Verify email OTP:", otpValue);
    }, 2000);
  };

  // Auto-submit when all digits are filled
  useEffect(() => {
    if (isComplete && !loading && !success) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete]);

  // Resend OTP
  const handleResend = () => {
    if (!canResend) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    setCountdown(COOLDOWN_SECONDS);
    setCanResend(false);
    inputRefs.current[0]?.focus();
    console.log("Resend OTP triggered (mock)");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] overflow-hidden relative p-5 box-border">
      <div className="relative z-10 w-full max-w-[420px]">
        {/* Background glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500/40 rounded-full blur-[120px] -top-[150px] -left-[150px] -z-10 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/40 rounded-full blur-[120px] -bottom-[120px] -right-[120px] -z-10 animate-pulse"></div>

        {success ? (
          /* ── Success State ── */
          <div className="p-6 sm:p-[30px] rounded-[20px] backdrop-blur-[20px] bg-slate-900/70 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] animate-[fadeIn_0.8s_ease] text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <h2 className="text-white text-2xl font-semibold mb-2">
              Email Verified
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Your email has been verified successfully. You can now continue
              using the platform.
            </p>
            <Button
              fullWidth
              className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 border-none font-bold text-[15px] hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300"
              onClick={() => navigate("/login")}
            >
              Continue to Login
            </Button>
          </div>
        ) : (
          /* ── OTP Verification Form ── */
          <form
            className="p-6 sm:p-[30px] rounded-[20px] backdrop-blur-[20px] bg-slate-900/70 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] animate-[fadeIn_0.8s_ease]"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Header */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-blue-400" />
              </div>
            </div>
            <h2 className="text-center text-white mb-1 text-2xl font-semibold">
              Verify Your Email
            </h2>
            <p className="text-center text-slate-400 text-sm mb-8">
              We've sent a 6-digit verification code to your email
            </p>

            {/* Segmented OTP Input */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-2" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  id={`otp-digit-${index}`}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={loading}
                  aria-label={`Digit ${index + 1}`}
                  className={`
                    w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-semibold
                    rounded-lg border bg-slate-800 text-white caret-transparent
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-0
                    ${
                      error
                        ? "border-red-400 focus:ring-red-400"
                        : digit
                        ? "border-blue-500 focus:ring-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                        : "border-slate-600 focus:ring-blue-500 hover:border-slate-500"
                    }
                    ${loading ? "cursor-not-allowed opacity-60" : ""}
                  `}
                />
              ))}
            </div>

            {/* Error message */}
            {error && (
              <p className="text-center text-xs text-red-400 mt-2 flex items-center justify-center gap-1">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}

            {/* Countdown & Resend */}
            <div className="text-center mt-6 mb-6">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium cursor-pointer bg-transparent border-none hover:underline transition-colors duration-200"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-slate-500 text-sm">
                  Resend code in{" "}
                  <span className="text-blue-400 font-semibold tabular-nums">
                    {formatTime(countdown)}
                  </span>
                </p>
              )}
            </div>

            {/* Verify Button */}
            <Button
              type="submit"
              fullWidth
              loading={loading}
              disabled={!isComplete}
              className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 border-none font-bold text-[15px] hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300"
            >
              Verify Email
            </Button>

            {/* Footer */}
            <p className="text-center mt-5 text-slate-400 text-[14px] flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              <Link to="/login" className="text-blue-400 hover:underline">
                Back to Login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
