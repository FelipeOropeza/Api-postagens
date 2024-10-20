import prisma from "../prisma/client.js";
import bcryptjs from "bcryptjs";
import validarEmail from "../utils/emailValidationUtils.js";

export const getUsuario = async (id) => {
  const getUser = await prisma.usuario.findFirst({
    where: {
      id: id,
    },
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
  return await prisma.$transaction(async (prisma) => {
    // Primeiro, obtenha todas as postagens do usuário
    const postagens = await prisma.postagem.findMany({
      where: {
        autorId: id,
      },
    });

    // Remove comentários associados às postagens
    if (postagens.length > 0) {
      await prisma.comentario.deleteMany({
        where: {
          postId: {
            in: postagens.map(postagem => postagem.id),
          },
        },
      });
    }

    // Remove postagens associadas ao usuário
    await prisma.postagem.deleteMany({
      where: {
        autorId: id,
      },
    });

    // Remove o usuário
    return await prisma.usuario.delete({
      where: {
        id: id,
      },
    });
  });
};
