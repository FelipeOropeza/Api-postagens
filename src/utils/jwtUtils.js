import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const secret = process.env.SECRET;

  try {
    const token = jwt.sign(
      {
        id: userId,
      },
      secret
    );

    return token;
  } catch (erro) {
    throw new Error(erro);
  }
}

export const verifyToken = (token) => {
  const secret = process.env.SECRET;

  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error("Token Inválido");
  }
}