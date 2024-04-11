import express, { Router } from 'express'
import router from './routes';
import cors from 'cors'

export default class App {
  private _app = express();

  constructor(router: Router) {
    this._app.use(cors({ origin: ['https://ruy-dev.vercel.app/', 'http://localhost:5173/'] }))
    this._app.use(express.json())
    this._app.use(router)
  }

  public get app() { return this._app }
}

export const { app } = new App(router);