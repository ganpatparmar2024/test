import { con } from "../config/config.js";
const insert = (sql,list) => {
  return new Promise((resolve, reject) => {
    con.execute(sql, list, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results.insertId);
    });
  });
};

const select = (sql,list) => {
  return new Promise((resolve, reject) => {
    con.execute(sql, list, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};


export { insert,select };
