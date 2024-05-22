
import { ResultSetHeader,RowDataPacket } from "mysql2";
import { con } from "../config/config";


const insert =async (sql:string,list:string[]) => {
  const [result] = await con.execute<ResultSetHeader>(sql,list);
  return result.insertId
}

// const insert = <T>(sql:string,list:string[]):Promise<T> => {
//   return new Promise((resolve, reject) => {
//     con.execute(sql, list, (error:MysqlError, results:PromiseLike<T>) => {
//       if (error) {
//         return reject(error);
//       }
//       return resolve(results.insertId);
//     });
//   });
// };


// new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;




// const select = <T>(sql:string,list:string[]):Promise<T> => {
//   return new Promise((resolve, reject) => {
//     con.execute(sql, list, (error:MysqlError, results:T) => {
//       if (error) {
//         return reject(error);
//       }
//       return resolve(results);
//     });
//   });
// };



const select = async (sql:string,list:string[])=>{
  const [result] = await con.query<RowDataPacket[]>(sql,list);
  // console.log(result);
  
  return result.length>0?result[0]:null;
}




export { insert,select };
