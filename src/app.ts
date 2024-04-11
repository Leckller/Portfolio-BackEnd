import express, { Router } from 'express'
import router from './routes';

export default class App {
  private _app = express();

  constructor(router: Router) {
    this._app.use(express.json())
    this._app.use(router)
  }

  public get app() { return this._app }
}

export const { app } = new App(router);