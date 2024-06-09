import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
  static async listarUsers(req, res) {
    const users = await prisma.user.findMany({
        include: {
          posts: {
            include: {
              comments: true
            }
          }
        }
      });
      
      res.status(200).json(users);
      
  }
}

export default UserController;
