import app from "./src/app.js";
import "dotenv/config";

app.listen(process.env.PORT || 4000, () => {
  console.log("Servidor ok");
});