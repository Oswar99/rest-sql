import { Request, Response } from "express";
import { decodeModel, encodeModel } from "../helpers/jwt.helper";
import SessionHelper from "../helpers/session.helper";
import UserModel from "../models/user.model";
import { addUser } from "../permission";

export class UsersService extends SessionHelper {

    public async setAdmin(req: Request, res: Response) {
        const nUser: UserModel = new UserModel({
            id: "0801199905422",
            name: "OSWAR MOISES CRUZ NUÑEZ",
            mail: "oswar.cruzn499@gmail.com",
            nick: "admin",
            pass: encodeModel("admin99*"),
            type: "ADMIN"
        });

        nUser.save().then(v => {
            if (v) {
                res.status(200).json({ successed: true });
            } else {
                res.status(200).json({ successed: false });
            };
        });
    };

    public async newUser(req: Request, res: Response) {

        const body = await decodeModel(req.body.key);
        const access = await super.getAccess(body.key);

        if (access.status && addUser.filter(v => { return v === access.user.user_type }).length > 0) {
            const data = body.data;
            const nUser: UserModel = new UserModel({
                id: data.id,
                name: data.name,
                mail: data.mail,
                nick: data.nick,
                pass: encodeModel(data.pass),
                type: data.type
            });

            nUser.save().then(v => {
                if (v) {
                    res.status(200).json({ successed: true })
                } else {
                    res.status(200).json({ successed: false })
                };
            });
        } else {
            res.status(200).json({ successed: false })
        };
    };

};