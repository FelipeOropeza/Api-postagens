import cors from "cors";
import app from "./src/app.js";
import "dotenv/config";

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.listen(process.env.PORT, () => {
  console.log("Servidor ok");
});