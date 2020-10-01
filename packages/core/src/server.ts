import app from "./app";
import configs from "./configs";

const server = app.listen(configs.app.port, () => {
  console.log( " App is running at http://localhost:%d in %s mode", configs.app.port, configs.app.env );
  console.log(" Press CTRL-C to stop\n");
});

export default server;