// /controllers/AuthController.js

import AuthService from "../services/AuthService.js";

const AuthController = {
  async login(req, res) {
    try {
      const { login, password } = req.body;
      const token = await AuthService.login({login, password});

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 1000,
        })
        .status(200)
        .json({ message: "Login bem-sucedido.", token});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async registerDoctor(req, res) {
    try {
      const doctorData = req.body;
      const newDoctor = await AuthService.registerDoctor(doctorData);
      res.status(201).json(newDoctor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default AuthController;
