import prisma from "../prisma/client.js";
import bcryptjs from "bcryptjs";
import validarEmail from "../utils/emailValidationUtils.js";

export const getUsuario = async (id) => {
  const getUser = await prisma.usuario.findFirst({
    where: {
      id: id,
    },
    select:{
      id: true,
      nome: true,
      email: true
    }
  });

  return getUser;
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
  const postagens = await prisma.postagem.findMany({
    where: {
      autorId: id,
    },
  });

  for (const postagem of postagens) {
    await prisma.comentario.deleteMany({
      where: {
        postId: postagem.id,
      },
    });

    await prisma.postagem.delete({
      where: {
        id: postagem.id,
      },
    });
  }

  await prisma.comentario.deleteMany({
    where: {
      autorId: id,
    },
  });

  return await prisma.usuario.delete({
    where: {
      id: id,
    },
  });
};
