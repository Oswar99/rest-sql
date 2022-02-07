
export function executeQuery(query:string) : Promise<any[]> {
    return new Promise<any[]>(async(resolve) => {
        try {
            const sql = require("mssql");
            const request = new sql.Request();
    
            await request.query(query, async (err: Error, rec: any) => {
                if (!err) {
                    resolve(rec.recordset);
                } else {
                    console.log(err.message);
                    resolve([]);
                };
            });
        } catch (error:any) {
            console.log(error.message);
            resolve([]);
        };
    });
};

export function execute(query:string) : Promise<any|boolean> {
    return new Promise<any|boolean>(async(resolve) => {
        try {
            const sql = require("mssql");
            const request = new sql.Request();
    
            await request.query(query, (err: Error, rec: any) => {
                if (!err) {
                    resolve(rec);
                } else {
                    console.log(err.message);
                    resolve(false);
                };
            });
        } catch (error:any) {
            console.log(error.message);
            resolve(false);
        };
    });
};
