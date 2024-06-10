import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UsuarioController {
  static async listarUsuario(req, res) {
    const listausuarios = await prisma.usuario.findMany();

    res.status(200).json(listausuarios);
  }

  static async insertUsuario(req, res) {
    await prisma.usuario.create({
      data: {
        nome: req.body.nome,
        email: req.body.email
      }
    })

    res.status(201).json(`Usuario ${req.body.nome} foi cadastrado com sucesso`);
  }
}

export default UsuarioController;
