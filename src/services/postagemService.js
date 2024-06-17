import prisma from "../prisma/client.js";
import generateSlug from "../utils/slugUtils.js";

export const getPostagem = async (data) => {
  return await prisma.postagem.findMany();
};

export const postPostagem = async (data) => {
  const novapostagem = await prisma.postagem.create({
    data: {
      slug: generateSlug(data.titulo),
      titulo: data.titulo,
      body: data.body,
      autor: {
        connect: { id: data.autorId },
      },
    },
  });

  return novapostagem;
};

export const putPostagem = async (id, data) => {
  return await prisma.postagem.update({
    where: {
      id: id,
    },
    data: {
      slug: data.titulo != null ? generateSlug(data.titulo) : data.slug,
      titulo: data.titulo,
      body: data.body,
    },
  });
};

export const deletePostagem = async (id) => {
  return await prisma.postagem.delete({
    where: {
      id: id,
    },
  });
};
