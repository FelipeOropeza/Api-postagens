import prisma from "../prisma/client.js";

export const getComentario = async (data) => {
  return await prisma.comentario.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const postComentario = async (data) => {
  const newComentario = await prisma.comentario.create({
    data: {
      conteudo: data.conteudo,
      autor: {
        connect: { id: data.autorId },
      },
      post: {
        connect: { id: data.postId },
      },
    },
  });

  return newComentario;
};

export const putComentario = async (id, data) => {
  return await prisma.comentario.update({
    where: {
      id: id,
    },
    data: {
      conteudo: data.conteudo,
    },
  });
};

export const deleteComentario = async (id) => {
  return await prisma.comentario.delete({
    where: {
      id: id,
    },
  });
};
