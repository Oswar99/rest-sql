import { executeQuery } from "./sql.helper"

export class UserHelper{

    public getUser(query:any): Promise<any[]>{
        return new Promise<any[]>(async (resolve)=>{
            const users = await executeQuery(query);
            resolve(users);
        });
    };

};