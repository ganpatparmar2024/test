
import { ResultSetHeader,RowDataPacket } from "mysql2";
import { con } from "../config/config";


const insert =async (sql:string,list:string[]) => {
  const [result] = await con.execute<ResultSetHeader>(sql,list);
  return result.insertId
}




const select = async (sql:string,list:string[])=>{
  const [result] = await con.query<RowDataPacket[]>(sql,list);
  // console.log(result);
  
  return result.length>0?result[0]:null;
}




export { insert,select };
