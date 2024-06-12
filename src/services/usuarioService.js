import prisma from "../prisma/client.js";

export const getUsuario = async () => {
  return await prisma.usuario.findMany();
};

export const postUsuario = async (data) => {
  return await prisma.usuario.create({
    data,
  });
};

export const putUsuario = async (id, data) => {
  return await prisma.usuario.update({
    where: {
      id: id,
    },
    data: {
      nome: data.nome,
      email: data.email,
    },
  });
};

export const deleteUsuario = async (id) => {
  return await prisma.usuario.delete({
    where: {
      id: id,
    },
  });
};
