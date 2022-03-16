import initApplication from "./app"
import http from "http"

async function start() {
    const app = await initApplication();
    const server = http.createServer(app)
    const port = Number.parseInt(process.env.PORT || "8088");

    server.listen(port, () => console.log(`Server running on port: ${port}`));
}

start()
    .then(() => console.log("Server started!"))
    .catch(console.error);