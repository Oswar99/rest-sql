import { Request, Response } from "express";
import { decodeModel, encodeModel, encodeResp } from "../helpers/jwt.helper";
import SessionHelper from "../helpers/session.helper";
import SessionModel from "../models/session.model";

class SessionService extends SessionHelper {

    public async LogIn(req: Request, res: Response){
        const body = await decodeModel(req.body.key);
        const userQuery = `SELECT * FROM tbUsers WHERE (user_mail = '${body.userLogin}' or user_nick = '${body.userLogin}') and user_pass = '${encodeModel(body.passLogin)}'`;
        const user = await super.getUser(userQuery);
        if(user.length > 0){
            const session : SessionModel = new SessionModel(user[0].user_id);
            const mSession = {
                user: session.session_user,
                join: session.session_join,
                end: session.session_end
            };
            await session.save().then(v=>{
                if(v){
                    res.status(200).json({ successed: true, key: encodeResp(mSession), user: encodeModel(user[0]) });
                }else{
                    res.status(200).json({ successed: false, message:"" });
                };
            });
        }else{
            res.status(200).json({ successed: false, message:"" });
        };
    };

    public async verifyAccess(req: Request, res: Response) {
        try {
            const body = await decodeModel(req.params.id);
            const access = await super.getAccess(body.key);
            
            if(access.status){
                res.status(200).json({ successed: true, message: "Autorizado!" });
            }else{
                res.status(404).json({ successed: false, message: "No Autorizado!" });
            };
            
        } catch (error) {
            console.log("Session.service: Ha ocurrido un error en verifyAccess");
            res.status(200).json({ successed: false, message: "Credenciales no validas!" });
        };
    };

};

export default SessionService;