import express, { Application, Request, Response } from "express";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";

import { resolve } from "path";
import { config } from "dotenv";

import { UsersController } from "./controllers/users.controller";
import { SessionController } from "./controllers/session.controller";


config({ path: resolve(__dirname, "../.env") });

class App {
    public app: Application;

    public user_cont: UsersController;
    public ses_cont: SessionController;

    constructor() {
        this.app = express();
        this.setConfig();
        this.setSqlConfig();

        this.user_cont = new UsersController(this.app);
        this.ses_cont = new SessionController(this.app);
        
    };

    private setConfig() {
        const corsOptions = {
            origin: [
                "https://app.lacaceriadellobo.com",
                "http://127.0.0.1:33002",
                "http://localhost:3000",
                "http://192.168.0.3:3000",
                "http:192.168.0.3:3002",
            ],
            credentials: true,
            exposedHeaders: ["set-cookie"],
        };

        this.app.use(fileUpload());
        this.app.use(compression());
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        this.app.use(cors());


        this.app.use(async (req: Request, res: Response, next) => {
            next();
            //try {
            //    const key:any = await decodeModel(req.headers.authorization!);
            //    const b: string[] = key.key.split(" ")!;
            //    const s:string = process.env.KEY!;
            //    if(b[1] === s){
            //    };
            //} catch (error) {
            //    console.log("SE HA BLOQUEADO UN ACCESO!");
            //    res.status(403).send("<h1><b>403 Forbidden</b></h1>")
            //}
        });
    };

    private setSqlConfig() {
        const sql = require("mssql");
        const config = {
            user: process.env.USER,
            password: process.env.PASS,
            server: process.env.SERVER,
            database: process.env.DB,
            "options": {
                "encrypt": false,
                "enableArithAbort": true
            }
        };

        sql.connect(config, (err: Error) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Conexion Exitosa!");
            };
        });
    };

};

export default new App().app