import { getPostagem, postPostagem } from "../services/postagemService.js";

class PostagemController {
  static async listarPostagens(req, res) {
    const listapostagens = await getPostagem();

    if (listapostagens.length > 0) {
      res.status(200).json(listapostagens);
    } else {
      res.status(200).json("Nenhuma postagem na base de dados");
    }
  }

  static async insertPostagem(req, res) {
    try {
      await postPostagem(req.body);

      res.status(201).json(`Postagem publicada com sucesso!!`);
    } catch (erro) {
      if (erro.code === "P2002" && erro.meta?.target.includes("slug")) {
        res
          .status(400)
          .json(
            "Ocorreu um erro ao cadastrar a postagem: Este slug já está em uso. Por favor, escolha outro slug."
          );
      } else {
        res
          .status(500)
          .json(`Ocorreu um erro ao cadastrar a postagem: ${erro.message}`);
      }
    }
  }
}

export default PostagemController;
