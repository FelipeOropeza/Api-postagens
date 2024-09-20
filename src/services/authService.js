import prisma from "../prisma/client.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/jwtUtils.js";

export const loginUsuario = async (data) => {
  const usuario = await prisma.usuario.findFirst({
    where: {
      email: data.email,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      senha: true,
    },
  });

  if (!usuario) {
    throw new Error("O usuario não existe");
  }

  const checkPassword = await bcryptjs.compare(data.senha, usuario.senha);

  if (!checkPassword) {
    throw new Error("Senha inválida");
  }

  const token = generateToken(usuario.id);

  return token, usuario.id, usuario.nome;
};
