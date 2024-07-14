import { loginUsuario } from "../services/authService.js";

class AuthController {
  static async login(req, res) {
    try {
      const token = await loginUsuario(req.body);

      res
        .status(200)
        .json({ msg: "Autenticação realizada com sucesso!", token });
    } catch (erro) {
      res
        .status(500)
        .json(`Ocorreu um erro ao fazer login do usuário: ${erro.message}`);
    }
  }
}

export default AuthController;
