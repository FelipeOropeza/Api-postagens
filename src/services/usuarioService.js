import prisma from "../prisma/client.js";
import bcryptjs from "bcryptjs";
import validarEmail from "../utils/emailValidationUtils.js";

export const getUsuario = async () => {
  return await prisma.usuario.findMany();
};

export const postUsuario = async (data) => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(data.senha, salt);

  if (!validarEmail(data.email)) {
    throw new Error("O email fornecido não é válido.");
  }

  const newUsuario = await prisma.usuario.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha: hash,
    },
  });

  return newUsuario;
};

export const putUsuario = async (id, data) => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(data.senha, salt);

  if (!validarEmail(data.email)) {
    throw new Error("O novo email fornecido não é válido.");
  }

  const updateUsuario = await prisma.usuario.update({
    where: {
      id: id,
    },
    data: {
      nome: data.nome,
      email: data.email,
      senha: hash,
    },
  });

  return updateUsuario;
};

export const deleteUsuario = async (id) => {
  return await prisma.usuario.delete({
    where: {
      id: id,
    },
  });
};
