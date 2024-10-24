import prisma from "../prisma/client.js";

export const postLike = async (postId, userId) => {
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: userId,
        postId: postId
      }
    }
  });

  if (existingLike) {
    throw new Error('Usuário já curtiu esta postagem.');
  }

  await prisma.like.create({
    data: {
      userId: userId,
      postId: postId
    }
  });

  return { message: 'Postagem curtida com sucesso!' };
};


export const getLikesCount = async (postId) => {
  const likeCount = await prisma.like.count({
    where: {
      postId: postId
    }
  });

  return likeCount;
};
