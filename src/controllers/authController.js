const authService = require("../services/authService");

const authController = {
  // Đăng ký
  register: async (req, res) => {
    try {
      const newUser = await authService.register(req.body);
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Đăng nhập
  login: async (req, res) => {
    try {
      const { accessToken, user } = await authService.login(req.body);
      res.status(200).json({ message: "Login successful", accessToken, user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
};

module.exports = authController;
