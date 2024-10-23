import { deleteImage, uploadImage } from "../services/imageService.js";
import {
  deletePostagem,
  getPostagem,
  idPostagem,
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

  static async getById(req, res) {
    const postagemId = await idPostagem(req.params.id);

    if (postagemId) {
      res.status(200).json(postagemId);
    } else {
      res.status(400).json("Nenhuma postagem com o id foi encontrada");
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
      let publicUrl = null;

      if (req.file) {
        publicUrl = await uploadImage(req.file);
      }
      const { titulo, body, autorId } = req.body;
      await postPostagem({ titulo, body, autorId }, publicUrl);

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

      return res
        .status(200)
        .json({ message: "A postagem foi atualizada com sucesso." });
    } catch (erro) {
      if (erro.code === "P2002" && erro.meta?.target.includes("slug")) {
        return res.status(400).json({
          error: true,
          message:
            "Ocorreu um erro ao atualizar a postagem: Este slug já está em uso. Por favor, escolha outro slug.",
        });
      } else {
        return res.status(500).json({
          error: true,
          message: `Ocorreu um erro ao atualizar a postagem: ${erro.message}`,
        });
      }
    }
  }

  static async deletarPostagem(req, res) {
    try {
      const postagem = await idPostagem(req.params.id); 
      const publicUrl = postagem.imageUrl;
      const fileName = publicUrl.split("/o/")[1].split("?alt=media")[0];
      await deleteImage(fileName)

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
