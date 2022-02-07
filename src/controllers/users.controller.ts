import {Application} from "express";
import { UsersService } from "../services/users.service";

export class UsersController{
    private user_controller: UsersService;
    constructor(private app: Application){
        this.user_controller = new UsersService();
        this.routes();
    };
    private routes(){           
        //this.app.route("/admin")
        //    .get(this.user_controller.setAdmin);
    };
};