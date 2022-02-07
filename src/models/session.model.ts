import moment from "moment";
import { execute } from "../helpers/sql.helper";

class SessionModel {
    
    public session_user: any;
    public session_join: Date;
    public session_end: Date;
    
    constructor(user: any){
        this.session_user = user;
        this.session_join = new Date();
        this.session_end = moment().add(4,"hours").toDate();
    };

    public save(): Promise<boolean>{
        return new Promise<boolean>((resolve) => {
            const columns : string = "user_id, session_join, session_end";
            const values: string = `'${this.session_user}','${this.session_join.toISOString()}','${this.session_end.toISOString()}'`;
            const query: string = `INSERT INTO tbSessions(${columns}) VALUES(${values})`;
            execute(query).then(v=>{
                resolve(v);
            });
        });
    };

};

export default SessionModel;