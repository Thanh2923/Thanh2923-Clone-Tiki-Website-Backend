const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authService = {
  // Đăng ký người dùng mới
  register: async (data) => {
    try {
      const { email, password} = data;

      // Kiểm tra xem email đã tồn tại chưa
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("Email already in use");
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo người dùng mới
      const newUser = await User.create({
        email,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      throw new Error(error.message || "Error registering user");
    }
  },

  // Đăng nhập người dùng
  login: async (data) => {
    try {
      const { email, password } = data;

      // Kiểm tra người dùng tồn tại
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      // Tạo Access Token
      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      return { accessToken, user };
    } catch (error) {
      throw new Error(error.message || "Error logging in");
    }
  },
};

module.exports = authService;
