import UserModel from "../models/user.model";
import { decodeResp } from "./jwt.helper";
import { execute } from "./sql.helper";
import { UserHelper } from "./user.helper";

const uh : UserHelper = new UserHelper();

class SessionHelper extends UserHelper {

    public getAccess(access: string): Promise<{ status: boolean, user: UserModel }> {
        return new Promise<{ status: boolean, user: UserModel }>(async (resolve) => {
            try {
                const AccessKey: any = await decodeResp(access);
                const end: Date = new Date(AccessKey.end);
                const userQuery = `SELECT * FROM tbUsers WHERE user_id = '${AccessKey.user}'`;
                const user = await uh.getUser(userQuery);

                if (user[0].user_enabled && (new Date().getTime() < end.getTime())) {
                    const userQuery2 = `UPDATE tbUsers SET user_last_session = '${new Date().toISOString()}' WHERE user_id = '${user[0].user_id}'`;
                    await execute(userQuery2);
                    resolve({ status: true, user: user[0] });
                } else {
                    resolve({ status: false, user: user[0] });
                };
            } catch (error) {
                console.log("SessionHelper: getAccess ha caido en un error!");
            };
        });
    };

};

export default SessionHelper;