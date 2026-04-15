export const uploadResume = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Resume upload endpoint working"
  });
};

export const analyzeResume = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Resume analysis endpoint working",
    data: {
      score: 0,
      atsCompatibility: "Pending",
      missingSkills: [],
      suggestions: []
    }
  });
};

export const getResumeResult = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    success: true,
    message: `Fetching resume result for ID: ${id}`
  });
};

