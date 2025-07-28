export const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"]; // Get the API key from headers

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  next();
};
