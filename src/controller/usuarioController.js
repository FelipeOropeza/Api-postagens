import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UsuarioController {
  static async listarUsuario(req, res) {
    const listausuarios = await prisma.usuario.findMany();

    if (listausuarios.length > 0) {
      res.status(200).json(listausuarios);
    } else {
      res.status(200).json("Nenhum usuario na base de dados");
    }
  }

  static async insertUsuario(req, res) {
    try {
      await prisma.usuario.create({
        data: {
          nome: req.body.nome,
          email: req.body.email,
        },
      });

      res
        .status(201)
        .json(`O usuario ${req.body.nome} foi cadastrado com sucesso`);
    } catch (erro) {
      if (erro.code === "P2002" && erro.meta?.target.includes("email")) {
        res
          .status(400)
          .json(
            `Ocorreu um erro ao cadastrar o usuário: Este endereço de e-mail já está em uso.`
          );
      } else {
        res
          .status(500)
          .json(`Ocorreu um erro ao cadastrar o usuário: ${erro.message}`);
      }
    }
  }

  static async updateUsuario(req, res) {
    try {
      await prisma.usuario.update({
        where: {
          id: req.params.id,
        },
        data: {
          nome: req.body.nome,
          email: req.body.email,
        },
      });

      res.status(201).json(`O usuario foi atualizado com sucesso`);
    } catch (erro) {
      if (erro.code === "P2002" && erro.meta?.target.includes("email")) {
        res
          .status(400)
          .json(
            `Ocorreu um erro ao atualizar o usuário: Este endereço de e-mail já está em uso.`
          );
      } else {
        res
          .status(500)
          .json(`Ocorreu um erro ao atualizar o usuário: ${erro.message}`);
      }
    }
  }

  static async deleteUsuario(req, res) {
    try {
      await prisma.usuario.delete({
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json(`O usuario foi deletado com sucesso`);
    } catch (erro) {
      if (
        erro.code === "P2025" &&
        erro.meta?.relationName === "PostagemToUsuario"
      ) {
        res
          .status(400)
          .json(
            "Ocorreu um erro ao excluir o usuário: Existem postagens associadas a este usuário. Por favor, exclua as postagens primeiro."
          );
      } else {
        res
          .status(500)
          .json(`Ocorreu um erro ao excluir o usuário: ${erro.message}`);
      }
    }
  }
}

export default UsuarioController;
