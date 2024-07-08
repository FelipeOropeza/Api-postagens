import {
  deleteComentario,
  getComentario,
  postComentario,
  putComentario,
} from "../services/comentarioService.js";
class ComentarioController {
  static async listarComentarios(req, res) {
    const listacomentarios = await getComentario();

    if (listacomentarios.length > 0) {
      res.status(200).json(listacomentarios);
    } else {
      res.status(200).json("Nenhum comentario na base de dados");
    }
  }

  static async insertComentario(req, res) {
    try {
      await postComentario(req.body);

      res.status(201).json(`Comentario publicado com sucesso!!`);
    } catch (erro) {
      res
        .status(500)
        .json(`Ocorreu um erro ao cadastrar o comentario: ${erro.message}`);
    }
  }

  static async updateComentario(req, res) {
    try {
      await putComentario(req.params.id, req.body);

      res.status(201).json(`O comentario foi atualizado com sucesso`);
    } catch (erro) {
      res
        .status(500)
        .json(`Ocorreu um erro ao atualizar o comentario: ${erro.message}`);
    }
  }

  static async deletarComentario(req, res) {
    try {
      await deleteComentario(req.params.id);

      res.status(200).json(`O comentario foi deletado com sucesso`);
    } catch (erro) {
      res
        .status(500)
        .json(`Ocorreu um erro ao excluir o comentario: ${erro.message}`);
    }
  }
}

export default ComentarioController;
