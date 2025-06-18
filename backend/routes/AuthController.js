// /controllers/AuthController.js

import AuthService from "../services/AuthService.js";

const AuthController = {
  async login(req, res) {
    try {
      const { login, password } = req.body;

      const {
        id,
        login: loginName,
        token,
        expiresIn,
      } = await AuthService.login({ login, password });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: expiresIn * 1000,
        })
        .status(200)
        .json({
          id,
          login: loginName,
          token,
          expiresIn,
          message: "Login bem-sucedido.",
        });
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
