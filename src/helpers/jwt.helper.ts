import jwt from "jwt-simple";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../../.env") });

export function encodeResp(obj: any) {
    return jwt.encode(obj, process.env.ETK!, "HS256");
};

export async function decodeResp(tk: string) {
    return jwt.decode(tk, process.env.ETK!, false, "HS256");
};

export function encodeModel(obj: any) {
    return jwt.encode(obj, process.env.TK!);
};

export async function decodeModel(tk: string) {
    return jwt.decode(tk, process.env.TK!);
};

export function getTimeString(dt: Date) {
    const m = dt.getMonth() + 1;
    const d = dt.getDate();
    const h = dt.getHours();
    const min = dt.getMinutes();
    const sec = dt.getSeconds();
    const msec = dt.getMilliseconds();

    var m2: string = m.toString();
    var d2: string = d.toString();
    var h2: string = h.toString();
    var min2: string = min.toString();
    var sec2: string = sec.toString();
    var msec2: string = msec.toString();

    if (m < 10) {
        m2 = "0" + m;
    };
    if (d < 10) {
        d2 = "0" + d;
    };
    if (h < 10) {
        h2 = "0" + h;
    };
    if (min < 10) {
        min2 = "0" + min;
    };
    if (sec < 10) {
        sec2 = "0" + sec;
    };
    if (msec < 10) {
        msec2 = "0" + msec;
    };

    const dt1 = dt.getFullYear() + "-" + m2 + "-" + d2 + "T" + h2 + ":" + min2 + ":" + sec2 + "." + msec2 + "Z"
    return dt1;
};

export function getStyleTimeString(dt: Date) {
    const m = dt.getMonth() + 1;
    const d = dt.getDate();
    const h = dt.getHours();
    const min = dt.getMinutes();
    const sec = dt.getSeconds();
    const msec = dt.getMilliseconds();

    var m2: string = m.toString();
    var d2: string = d.toString();
    var h2: string = h.toString();
    var min2: string = min.toString();
    var sec2: string = sec.toString();
    var msec2: string = msec.toString();

    if (m < 10) {
        m2 = "0" + m;
    };
    if (d < 10) {
        d2 = "0" + d;
    };
    if (h < 10) {
        h2 = "0" + h;
    };
    if (min < 10) {
        min2 = "0" + min;
    };
    if (sec < 10) {
        sec2 = "0" + sec;
    };
    if (msec < 10) {
        msec2 = "0" + msec;
    };

    const dt1 = dt.getFullYear() + "/" + m2 + "/" + d2 + " " + h2 + ":" + min2 + ":" + sec2
    return dt1;
};

export function getAlId(tabla: string): Promise<string> {
    return new Promise<string>(async (resolve) => {
        var i: number = 0;
        var id: string = "";
        const c1 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        const sql = require("mssql");
        const request = new sql.Request();

        while (i < 26) {
            const a1 = Math.floor(Math.random() * 26);
            id = id + c1[a1];
            i++;
        };

        const a2 = Math.floor(Math.random() * 1000000000000000);
        id = id + a2.toString();

        var select = `SELECT * FROM ${tabla} WHERE id = '${id}'`;
        if(tabla === "tbComentario"){
            select = `SELECT * FROM ${tabla} WHERE id_commentario = '${id}'`
        }

        await request.query(select,async (err: Error, recordset: any) => {
            if (err) {
                console.log(err.message);
            } else {
                if (recordset.recordset.length === 0) {
                    resolve(id);
                }else{
                    resolve(await getAlId(tabla));
                }
            };
        });
    });
}