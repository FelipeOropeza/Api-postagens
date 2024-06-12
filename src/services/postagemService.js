import prisma from "../prisma/client.js";
import generateSlug from "../utils/slugUtils.js";

export const getPostagem = async (data) => {
  return await prisma.postagem.findMany();
};

export const postPostagem = async (data) => {
  const slug = generateSlug(data.titulo);
  const novapostagem = await prisma.postagem.create({
    data: {
      slug: slug,
      titulo: data.titulo,
      body: data.body,
      autor: {
        connect: { id: data.autorId },
      },
    },
  });

  return novapostagem;
};
