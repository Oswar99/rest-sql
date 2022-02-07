import {Application} from "express";
import SessionService from "../services/session.service";

export class SessionController{
    private ses_controller: SessionService;
    constructor(private app: Application){
        this.ses_controller = new SessionService();
        this.routes();
    };
    private routes(){           
        this.app.route("/login")
            .post(this.ses_controller.LogIn);
        this.app.route("/access/:id")
            .get(this.ses_controller.verifyAccess); 
    };
};