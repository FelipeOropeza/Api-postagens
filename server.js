import cors from "cors";
import app from "./src/app.js";
import "dotenv/config";

app.use(cors());

app.listen(process.env.PORT, () => {
  console.log("Servidor ok");
});