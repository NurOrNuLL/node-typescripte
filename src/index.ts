import express from "express";
import { router } from "./routes/loginRoutes";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

class Server {
	private readonly app: express.Express = express();

	constructor() {
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(cookieSession({ keys: ['user'] }));
		this.app.use(router);
	}

	start(): void {
		this.app.listen(3000, () => {
			console.log("Started on port 3000");
		});
	}
}

const server = new Server();
server.start();
