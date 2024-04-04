import { select } from "../Services/registerService.js";
import { con } from "../config/config.js";
import { chekbox } from "../public/js/common.js";
import moment from "moment";
export const submitData = (req, res) => {
  var data = req.body;
  console.log(data);
  var education = [
    data.education1,
    data.education2,
    data.education3,
    data.education4,
  ];
  var company = [data.companyName1, data.companyName2, data.companyName3];
  var refrences = [data.person1, data.person2, data.person3];
  var language = [data.Language1, data.Language2, data.Language3];
  var ability = [data.ability1, data.ability2, data.ability3];
  var technology = [data.technology1, data.technology2, data.technology3];
  var level = [data.level1, data.level2, data.level3];
  var prefrences = [
    data.location,
    data.department,
    data.noticePerid,
    data.currentCtc,
    data.expectedCtc,
  ];

  const queryPromise1 = () => {
    return new Promise((resolve, reject) => {
      var sql = `insert into BasicDetails (name, lastName, designation, email, city, state, contactNo, gender, birthday, relationshipStatus, zipcode,address1,address2) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      var basic = [
        data.name[0],
        data.lastName[0],
        data.designation[0],
        data.email[0],
        data.city[0],
        data.state[0],
        data.contactNo[0],
        data.gender[0],
        data.birthday[0],
        data.relationshipStatus[0],
        data.zipcode[0],
        data.address1[0],
        data.address2[0],
      ];
      con.query(sql, basic, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results.insertId);
      });
    });
  };
  const queryPromise2 = (insertid) => {
    return new Promise((resolve, reject) => {
      education.forEach((ele) => {
        if (ele[0] != "") {
          var sql = `insert into School(fkEmp, board, passingYear, percentage) values (${insertid},'${ele[0]}','${ele[1]}',${ele[2]});`;
          con.query(sql, (err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve("education data inserted");
          });
        }
      });
    });
  };
  const queryPromise3 = (insertid) => {
    return new Promise((resolve, reject) => {
      company.forEach((ele) => {
        if (ele[0] != "") {
          var sql = `insert into WorkExperience(fkEmp, companyName, designation, fromDate, toDate) values (${insertid},'${ele[0]}','${ele[1]}','${ele[2]}','${ele[3]}')`;
          con.query(sql, (err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve("workexperience data inserted");
          });
        }
      });
    });
  };
  const queryPromise4 = (insertid) => {
    return new Promise((resolve, reject) => {
      var lang = chekbox(language, ability);
      for (let i = 0; i < lang.length; i++) {
        con.query(
          `insert into Language(empid, name, reading, writing, speaking) values (${insertid},?,?,?,?);`,
          [lang[i][0], lang[i][1], lang[i][2], lang[i][3]],
          (err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve("language data inserted");
          }
        );
      }
    });
  };
  const queryPromise5 = (insertid) => {
    return new Promise((resolve, reject) => {
      let i = 0;
      technology.forEach((ele) => {
        if (ele != undefined) {
          con.query(
            `insert into Technology (fkEmp, name, level) values (${insertid},'${ele[0]}','${level[i]}')`,
            (err, result) => {
              if (err) {
                return reject(err);
              }
              return resolve("language data inserted");
            }
          );
        }
        i++;
      });
    });
  };
  const queryPromise6 = (insertid) => {
    return new Promise((resolve, reject) => {
      refrences.forEach((ele) => {
        if (ele[0] != "") {
          con.query(
            `insert into RefrenceContact (fkEmp, person, contactNumber, relation) values (${insertid},?,?,?)`,
            [ele[0], ele[1], ele[2]],
            (err, result) => {
              if (err) {
                return reject(err);
              }
              return resolve("language data inserted");
            }
          );
        }
      });
    });
  };
  const queryPromise7 = (insertid) => {
    return new Promise((resolve, reject) => {
      var prefrences1 = prefrences.map((x) => (x == "" ? (x = null) : (x = x)));

      con.query(
        `insert into Prefrences (fkEmp, location, department, noticePeriod, currentCtc, expectedCtc) values (${insertid},?,?,?,?,?);`,
        [
          prefrences1[0],
          prefrences1[1],
          prefrences1[2],
          prefrences1[3],
          prefrences1[4],
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("data inserted properly");
          }
        }
      );
    });
  };
  async function sequentialQueries() {
    try {
      var insertid = await queryPromise1();
      var edu = await queryPromise2(insertid);
      var work = await queryPromise3(insertid);
      var lang = await queryPromise4(insertid);
      var tech = await queryPromise5(insertid);
      var ref = await queryPromise6(insertid);
      var pref = await queryPromise7(insertid);
      console.log(edu, work, lang, tech, ref, pref);
    } catch (error) {
      console.log(error);
    }
  }
  sequentialQueries();
};
export const getData = (req, res) => {
  var id = req.query.id;

  const basicDetail = () => {
    var sql =
      "select  name, lastName, designation, email, city, state, contactNo, gender, birthday, relationshipStatus, zipcode,address1,address2 from BasicDetails where id =?;";
    return new Promise((resolve, reject) => {
      con.query(sql, [id], (error, result, field) => {
        if (error) {
          return reject(error);
        }
        return resolve([result, field]);
      });
    });
  };
  const educationDetails = () => {
    var sql =
      "select board, passingYear, percentage from School where fkEmp =?;";
    return new Promise((resolve, reject) => {
      con.query(sql, [id], (error, result, field) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  };
  const workExperienceDetails = () => {
    var sql =
      "select companyName, designation, fromDate, toDate from WorkExperience where fkEmp =?;";
    return new Promise((resolve, reject) => {
      con.query(sql, [id], (error, result, field) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  };
  const languageKnown = () => {
    var sql =
      "select name, reading, writing, speaking from Language where empid =?;";
    return new Promise((resolve, reject) => {
      con.query(sql, [id], (error, result, field) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  };
  const technologyKnown = () => {
    var sql = "select name, level from Technology where fkEmp =?;";
    return new Promise((resolve, reject) => {
      con.query(sql, [id], (error, result, field) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  };
  const refrences = () => {
    var sql =
      "select person, contactNumber, relation from RefrenceContact where fkEmp =?;";
    return new Promise((resolve, reject) => {
      con.query(sql, [id], (error, result, field) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  };
  const prefrences = () => {
    var sql =
      "select location, department, noticePeriod, currentCtc, expectedCtc from Prefrences where fkEmp =?;";
    return new Promise((resolve, reject) => {
      con.query(sql, [id], (error, result, field) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  };
  async function sequentialQueries() {
    try {
      var basicdetails = await basicDetail();
      var educationdetails = await educationDetails();
      var workexpdetails = await workExperienceDetails();
      var languageknown = await languageKnown();
      var technologknown = await technologyKnown();
      var refrencesdetails = await refrences();
      var prefrencesdetails = await prefrences();
      console.log(prefrencesdetails);

      // let date = moment(basicdetails[0][0].dob).utc().format("YYYY-MM-DD");

      res.send({
        result: basicdetails[0][0],
        educationdetails: educationdetails,
        workexpdetails: workexpdetails,
        languageknown: languageknown,
        technologknown: technologknown,
        refrencesdetails: refrencesdetails,
        prefrencesdetails: prefrencesdetails[0],
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  }
  sequentialQueries();
};

export const renderUpdate = (req, res) => {
  res.render("job_Application_Form.ejs");
};

export const updateData = (req, res) => {
  var data = req.body.data;
  // console.log(req.query);
  console.log(data);
  var basic = [
    data.name,
    data.lastName,
    data.designation,
    data.email,
    data.city,
    data.state,
    data.contactNo,
    data.gender,
    moment(data.birthday).utc().format("YYYY-MM-DD"),
    data.relationshipStatus,
    data.zipcode,
    req.body.id,
  ];
  console.log(basic);
  var education = [
    data.education1,
    data.education2,
    data.education3,
    data.education4,
  ];
  var company = [data.companyName1, data.companyName2, data.companyName3];
  var refrences = [data.person1, data.person2, data.person3];
  var language = [data.Language1, data.Language2, data.Language3];
  var ability = [data.ability1, data.ability2, data.ability3];
  var technology = [data.technology1, data.technology2, data.technology3];
  var level = [data.level1, data.level2, data.level3];
  var prefrences = [
    data.location,
    data.department,
    data.noticePerid,
    data.currentCtc,
    data.expectedCtc,
  ];
  const BasicDetails = () => {
    var sql = `update BasicDetails set name=?, lastName=?, designation=?, email=?, city=?,state=?, contactNo=?, gender=?, birthday=?, relationshipStatus=?, zipcode=? where id = ?;`;

    return new Promise((resolve, reject) => {
      con.query(sql, basic, (error, results) => {
        if (error) {
          return reject(error);
        }
        console.log("basic details updated");
        return resolve(true);
      });
    });
  };
  const getId = () => {
    var sql1 = `select id from School where fkEmp = ${req.body.id};select id from WorkExperience where fkEmp = ${req.body.id};select id from Language where empid = ${req.body.id};select id from Technology where fkEmp = ${req.body.id};select id from RefrenceContact where fkEmp = ${req.body.id};select id from Prefrences where fkEmp = ${req.body.id};`;

    return new Promise((resolve, reject) => {
      con.query(sql1, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  };

  async function sequentialQueries() {
    try {
      const basicdetails = await BasicDetails();
      const empid = await getId();
      // console.log(empid);
      // console.log(empid[0][0].id);
      let i = 0;
      // update education data
      education.forEach((ele) => {
        if (ele[0] != "") {
          if (empid[0][i] == undefined) {
            var sql =
              "insert into School (fkEmp,board,passingYear,percentage) values(?,?,?,?)";
            var school = [req.body.id, ele[0], ele[1], ele[2]];
            con.query(sql, school, (err, result) => {
              if (err) {
                console.log(err);
              }
            });
          } else {
            var sql = `update School set board = ?, passingYear = ?, percentage = ? where fkEmp = ? and id = ?;`;
            var school = [ele[0], ele[1], ele[2], req.body.id, empid[0][i].id];
            con.query(sql, school, (err, result) => {
              if (err) {
                console.log(err);
              }
            });
          }
        }
        i++;
      });

      // update workexperinece data
      i = 0;
      company.forEach((ele) => {
        if (ele[0] != "") {
          if (empid[1][i] == undefined) {
            var sql =
              "insert into WorkExperience (fkEmp, companyName, designation, fromDate, toDate) values (?,?,?,?,?)";
            var from = moment(ele[2]).utc().format("YYYY-MM-DD");
            var to = moment(ele[2]).utc().format("YYYY-MM-DD");
            var company = [req.body.id, ele[0], ele[1], from, to];
            con.query(sql, company, (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log("work exp data updated");
              }
            });
          } else {
            var sql = `update WorkExperience set companyName = ?, designation = ?, fromDate = ?, toDate = ? where fkEmp = ? and id = ?;`;
            var from = moment(ele[2]).utc().format("YYYY-MM-DD");
            var to = moment(ele[2]).utc().format("YYYY-MM-DD");
            var company = [
              ele[0],
              ele[1],
              from,
              to,
              req.body.id,
              empid[1][i].id,
            ];
            con.query(sql, company, (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log("work exp data updated");
              }
            });
          }
        }

        i++;
      });

      // update language data to the database
      var lang = chekbox(language, ability);
      for (let i = 0; i < lang.length; i++) {
        if (empid[2][i] != undefined) {
          con.query(
            `update  Language set name = ?, reading = ?, writing = ?, speaking =? where empid = ? and id = ?;`,
            [
              lang[i][0],
              lang[i][1],
              lang[i][2],
              lang[i][3],
              req.body.id,
              empid[2][i].id,
            ],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log("lang data updated");
              }
            }
          );
        } else {
          con.query(
            `insert into  Language (empid, name, reading, writing, speaking) values(?,?,?,?,?)`,
            [req.body.id, lang[i][0], lang[i][1], lang[i][2], lang[i][3]],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log("lang data inseteds");
              }
            }
          );
        }
      }

      // updating technology data
      i = 0;
      technology.forEach((ele) => {
        if (ele != undefined) {
          if (empid[3][i] != undefined) {
            con.query(
              `update Technology set name = ?, level =? where fkEmp = ? and id = ?;`,
              [ele, level[i], req.body.id, empid[3][i].id],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("tech data updated");
                }
              }
            );
          } else {
            con.query(
              `insert into Technology (fkEmp, name, level) values(?,?,?);`,
              [req.body.id, ele, level[i]],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("tech data inserted");
                }
              }
            );
          }
        }
        i++;
      });

      // updating refrences contact data
      i = 0;
      refrences.forEach((ele) => {
        if (ele[0] != "") {
          if (empid[4][i] != null) {
            con.query(
              `update  RefrenceContact set  person = ?, contactNumber =?, relation =? where fkEmp = ? and id = ?;`,
              [ele[0], ele[1], ele[2], req.body.id, empid[4][i].id],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("refrences data updated");
                }
              }
            );
          } else {
            con.query(
              `insert into   RefrenceContact (fkEmp, person, contactNumber, relation) values(?,?,?,?)`,
              [req.body.id, ele[0], ele[1], ele[2]],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("refrences data inserted");
                }
              }
            );
          }
        }
        i++;
      });

      // updating prefrences data
      var prefrences1 = prefrences.map((x) => (x == "" ? (x = null) : (x = x)));
      if (empid[5][0] != null) {
        con.query(
          `update  Prefrences  set  location = ?, department =?, noticePeriod =?, currentCtc =?, expectedCtc =? where fkEmp = ? and id = ?;`,
          [
            prefrences1[0],
            prefrences1[1],
            prefrences1[2],
            prefrences1[3],
            prefrences1[4],
            req.body.id,
            empid[5][0].id,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("prefrences updated properly");
            }
          }
        );
      } else {
        con.query(
          `insert into  Prefrences (fkEmp, location, department, noticePeriod, currentCtc, expectedCtc) values (?,?,?,?,?,?)`,
          [
            req.body.id,
            prefrences1[0],
            prefrences1[1],
            prefrences1[2],
            prefrences1[3],
            prefrences1[4],
          ],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("prefrences inserted properly");
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  sequentialQueries();
};

export const thanks = (req, res) => {
  res.send("thanks for your response");
};

export const listOfEmployees = async (req, res) => {
  var result = await select(
    "select id as Serial_No, name as Name, lastName as Last_Name, designation as Designation, email as Email, city as City, contactNo as Contact_Number, gender Gender, birthday as Date_Of_Birth, relationshipStatus as Relationship_Status, address1 as Permanent_Address from BasicDetails"
  );
  console.log(result);
  res.render("list_of_employee.ejs", { result: result });
};
