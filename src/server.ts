import { app } from "./app";

const serverPort = process.env.SERVER_PORT || 7771;

app.listen(serverPort, () => {
  console.log(`Server ON na porta ${serverPort}`)
})