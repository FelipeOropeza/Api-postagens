import {
  deletePostagem,
  getPostagem,
  slugPostagem,
  myPostagens,
  postPostagem,
  putPostagem,
} from "../services/postagemService.js";

class PostagemController {
  static async listarPostagens(req, res) {
    const listapostagens = await getPostagem();

    if (listapostagens.length > 0) {
      res.status(200).json(listapostagens);
    } else {
      res.status(200).json("Nenhuma postagem na base de dados");
    }
  }

  static async getByPostagem(req, res) {
    const postagem = await slugPostagem(req.params.slug);

    if (postagem) {
      res.status(200).json(postagem);
    } else {
      res.status(400).json("Nenhuma postagem com esse slug na base de dados");
    }
  }

  static async getMyPosts(req, res) {
    const listamyposts = await myPostagens(req.params.id);

    if (listamyposts) {
      res.status(200).json(listamyposts);
    } else {
      res.status(400).json("Nenhuma postagem do usuario encontrada");
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

  static async updatePostagem(req, res) {
    try {
      await putPostagem(req.params.id, req.body);

      res.status(201).json(`A postagem foi atualizada com sucesso`);
    } catch (erro) {
      if (erro.code === "P2002" && erro.meta?.target.includes("slug")) {
        res
          .status(400)
          .json(
            `Ocorreu um erro ao atualizar a postagem: Este slug já está em uso. Por favor, escolha outro slug.`
          );
      } else {
        res
          .status(500)
          .json(`Ocorreu um erro ao atualizar a postagem: ${erro.message}`);
      }
    }
  }

  static async deletarPostagem(req, res) {
    try {
      await deletePostagem(req.params.id);

      res.status(200).json(`A postagem foi deletada com sucesso`);
    } catch (erro) {
      res
        .status(500)
        .json(`Ocorreu um erro ao excluir a postagem: ${erro.message}`);
    }
  }
}

export default PostagemController;
