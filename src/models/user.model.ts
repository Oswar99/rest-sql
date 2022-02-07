import { execute } from "../helpers/sql.helper";

class UserModel {

    public user_id: string;
    public user_name: string;
    public user_mail: string;
    public user_nick: string;
    public user_pass: string;
    public user_type: string;
    public user_enabled: boolean;
    public user_date: string;
    public user_last_session: string;

    constructor(user: any) {
        this.user_id = user.id? user.id : "";
        this.user_name = user.name? user.name : "";
        this.user_mail = user.mail? user.mail : "";
        this.user_nick = user.nick? user.nick : "";
        this.user_pass = user.pass? user.pass : "";
        this.user_type = user.type? user.type : "";
        this.user_enabled = true;
        this.user_date = new Date().toISOString();
        this.user_last_session = new Date().toISOString();
    };

    public save(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            const columns: string = "user_identidad, user_name, user_mail, user_nick, user_pass, user_type, user_enabled, user_date, user_last_session";
            const values: string = `'${this.user_id}', '${this.user_name}', '${this.user_mail}', '${this.user_nick}', '${this.user_pass}', '${this.user_type}', CONVERT(bit,'${this.user_enabled}'), '${this.user_date}', '${this.user_last_session}'`;
            const query: string = `INSERT INTO tbUsers(${columns}) VALUES(${values})`;
            execute(query).then(v => {
                resolve(v);
            });
        });
    };

    public disable(): Promise<boolean> { 
        return new Promise<boolean>((resolve)=>{
            const query: string = `UPDATE tbUsers SET user_enabled = CONVERT(bit,'${this.user_enabled}') WHERE user_id = '${this.user_id}'`;
            execute(query).then(v => {
                resolve(v);
            });
        });
    };

};

export default UserModel;