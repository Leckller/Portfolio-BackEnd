import { app } from "./app";

const serverPort = process.env.PORT || 7771;

app.listen(serverPort, () => {
  console.log(`Server ON na porta ${serverPort}`)
})