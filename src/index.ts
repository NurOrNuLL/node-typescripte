import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';

import { AppRouter } from './AppRouter';
import './controllers/HomeController';
import './controllers/LoginController';

export class Server {
  private readonly app: express.Express = express();

  constructor() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieSession({ keys: ['user'] }));
    this.app.use(AppRouter.getInstance());
  }

  start(): void {
    this.app.listen(3000, () => {
      console.log('Started on port 3000');
    });
  }
}

const server = new Server();
server.start();
