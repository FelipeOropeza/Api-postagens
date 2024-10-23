import prisma from "../prisma/client.js";
import generateSlug from "../utils/slugUtils.js";

export const getPostagem = async () => {
  return await prisma.postagem.findMany({
    include: {
      comentarios: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const slugPostagem = async (slug) => {
  return await prisma.postagem.findFirst({
    where: {
      slug: slug,
    },
    include: {
      comentarios: {
        orderBy: {
          createdAt: "desc", 
        },
      },
    },
  });
};

export const idPostagem = async (id) => {
  return await prisma.postagem.findFirst({
    where: {
      id: id,
    },
    select: {
      imageUrl: true,
    },
  });
};

export const myPostagens = async (id) => {
  return await prisma.postagem.findMany({
    where: {
      autorId: id,
    },
    include: {
      comentarios: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const postPostagem = async (data, imgURL) => {
  const novapostagem = await prisma.postagem.create({
    data: {
      slug: generateSlug(data.titulo),
      titulo: data.titulo,
      imageUrl: imgURL,
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
  await prisma.comentario.deleteMany({
    where: {
      postId: id,
    }
  });

  return await prisma.postagem.delete({
    where: {
      id: id,
    },
  });
};
