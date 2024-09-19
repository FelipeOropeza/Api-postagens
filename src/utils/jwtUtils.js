import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const secret = process.env.SECRET;

  if (!secret) {
    throw new Error("A chave secreta não está definida");
  }

  try {
    const token = jwt.sign(
      {
        id: userId,
      },
      secret
    );

    return token;
  } catch (erro) {
    throw new Error(`Erro ao gerar o token: ${erro.message}`);
  }
}

export const verifyToken = (token) => {
  const secret = process.env.SECRET;

  if (!secret) {
    throw new Error("A chave secreta não está definida");
  }

  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error("Token Inválido");
  }
}