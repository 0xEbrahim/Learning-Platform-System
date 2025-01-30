import app from "./app";
import { connectDB } from "./config/db";
import config from "./config/env";
import swaggeDocs from "./utils/swagger";

const server = app.listen(config.PORT, () => {
  console.log("Server started on port " + config.PORT);
  connectDB();
});
