class PostagemController{
    static listarPostagens(req, res) {
        res.status(200).json("rota postagens");
    }
}

export default PostagemController