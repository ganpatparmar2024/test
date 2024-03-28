import { con } from "../config/config.js";
export const renderTableData = async (req, res) => {
  var { limit } = req.pagination;
  var pid = req.query.page;
  var order = req.query.order;
  var field = req.query.field;

  if (pid == undefined) {
    pid = 1;
  }
  if ((order && field) == undefined) {
    order = "asc";
    field = "id";
  }

  const { startIndex, endIndex } = req.pagination;
  

  con.query(
    `SELECT * FROM Student_Master order by ${field} ${order} limit ${startIndex},${10}`,
    function (err, result, fields) {
      if (err) throw err;
      res.render("table_with_orderby.ejs", {
        fields: fields,
        result: result,
        pid: pid,
        order: order,
        field: field,
      });
    }
  );
};
