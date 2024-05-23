import { Request, Response } from "express";
import { select } from "../Services/registerService";
import { con } from "../config/config";
import { chekbox } from "../common";
import moment from "moment";
import mysql, { QueryResult, RowDataPacket } from "mysql2/promise";
import { BasicDetails, FormData } from "../custom/custom";
import { MysqlError } from "mysql";
export const submitData = (req: Request, res: Response):void => {
  var data: FormData = req.body;
  console.log(data);
  var education: string[][] = [
    data.education1,
    data.education2,
    data.education3,
    data.education4,
  ];
  var company: string[][] = [
    data.companyName1,
    data.companyName2,
    data.companyName3,
  ];
  var refrences: string[][] = [data.person1, data.person2, data.person3];
  var language: string[][] = [data.Language1, data.Language2, data.Language3];
  var ability: string[][] = [data.ability1, data.ability2, data.ability3];
  var technology: string[][] = [
    data.technology1,
    data.technology2,
    data.technology3,
  ];
  var level: string[][] = [data.level1, data.level2, data.level3];
  var prefrences: string[][] = [
    data.location,
    data.department,
    data.noticePerid,
    data.currentCtc,
    data.expectedCtc,
  ];

  const queryPromise1 = async ():Promise<number> => {
    var sql: string = `insert into BasicDetails (name, lastName, designation, email, city, state, contactNo, gender, birthday, relationshipStatus, zipcode,address1,address2) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    var basic: string[] = [
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
    try {
      const [result] = await con.query(sql, basic);
      const insertId: number = (result as mysql.ResultSetHeader).insertId;
      return insertId;
    } catch (error) {
      console.log("error in executing query", error);
    }
  };
  const queryPromise2 = (insertid?: number):void => {
    education.forEach((ele: string[]) => {
      if (ele[0] != "") {
        var sql: string = `insert into School(fkEmp, board, passingYear, percentage) values (${insertid},'${ele[0]}','${ele[1]}',${ele[2]});`;
        con
          .query(sql)
          .then(() => {
            console.log("education data inserted");
          })
          .catch((error: MysqlError) => {
            throw error;
          });
      }
    });
  };
  const queryPromise3 = (insertid?: number):void => {
    company.forEach((ele: string[]) => {
      if (ele[0] != "") {
        var sql: string = `insert into WorkExperience(fkEmp, companyName, designation, fromDate, toDate) values (${insertid},'${ele[0]}','${ele[1]}','${ele[2]}','${ele[3]}')`;
        con
          .query(sql)
          .then(() => {
            console.log("Work experinece inserted");
          })
          .catch((error: MysqlError) => {
            throw error;
          });
      }
    });
  };
  const queryPromise4 = (insertid?: number):void => {
    var lang: (string | number)[][] = chekbox(language, ability);
    try {
      for (let i: number = 0; i < lang.length; i++) {
        con.query(
          `insert into Language(empid, name, reading, writing, speaking) values (${insertid},?,?,?,?);`,
          [lang[i][0], lang[i][1], lang[i][2], lang[i][3]]
        );
      }
      console.log("language data inserted");
    } catch (error) {
      console.log("error in executing language data", error);
    }
  };
  const queryPromise5 = (insertid?: number):void => {
    let i: number = 0;
    technology.forEach((ele: string[]) => {
      if (ele != undefined) {
        con
          .query(
            `insert into Technology (fkEmp, name, level) values (${insertid},'${ele[0]}','${level[i]}')`
          )
          .then(() => {
            console.log("tecnology data inserted");
          })
          .catch((error: MysqlError) => {
            throw error;
          });
      }
      i++;
    });
  };
  const queryPromise6 = (insertid?: number):void => {
    refrences.forEach((ele: string[]) => {
      if (ele[0] != "") {
        try {
          con.query(
            `insert into RefrenceContact (fkEmp, person, contactNumber, relation) values (${insertid},?,?,?)`,
            [ele[0], ele[1], ele[2]]
          );
          console.log("inserted refrence contact");
        } catch (error) {
          console.log("problem in inseting refrences");
        }
      }
    });
  };
  const queryPromise7 = (insertid?: number):void => {
    var prefrences1: string[][] = prefrences.map((x) =>
      x.length === 0 ? (x = null) : (x = x)
    );
    try {
      con.query(
        `insert into Prefrences (fkEmp, location, department, noticePeriod, currentCtc, expectedCtc) values (${insertid},?,?,?,?,?);`,
        [
          prefrences1[0],
          prefrences1[1],
          prefrences1[2],
          prefrences1[3],
          prefrences1[4],
        ]
      );
      console.log("inserted prefrences properly");
    } catch (error) {
      console.log("prefrences data not inserted", error);
    }
  };
  async function sequentialQueries(): Promise<void> {
    try {
      var insertid:number = await queryPromise1();
      queryPromise2(insertid);
      queryPromise3(insertid);
      queryPromise4(insertid);
      queryPromise5(insertid);
      queryPromise6(insertid);
      queryPromise7(insertid);
      // console.log(edu, work, lang, tech, ref, pref);
    } catch (error) {
      console.log(error);
    }
  }
  sequentialQueries();
};
export const getData = (req: Request, res: Response):void => {
  var id: string = req.query.id as string;

  const basicDetail:() => Promise<QueryResult> = async ():Promise<QueryResult> => {
    var sql: string =
      "select  name, lastName, designation, email, city, state, contactNo, gender, birthday, relationshipStatus, zipcode,address1,address2 from BasicDetails where id =?;";
    try {
      const [result] = await con.query(sql, [id]);
      return result;
    } catch (error) {
      console.log("error in getting basic details", error);
    }
  };
  const educationDetails:() => Promise<QueryResult> = async ():Promise<QueryResult> => {
    var sql: string =
      "select board, passingYear, percentage from School where fkEmp =?;";
    try {
      const [result] = await con.query(sql, [id]);
      return result;
    } catch (error) {
      console.log("error in selecting education details", error);
    }
  };
  const workExperienceDetails :() => Promise<QueryResult> = async ():Promise<QueryResult> => {
    var sql: string =
      "select companyName, designation, fromDate, toDate from WorkExperience where fkEmp =?;";
    try {
      var [result] = await con.query(sql, [id]);
      return result;
    } catch (error) {
      console.log("error in getting work experience ", error);
    }
  };
  const languageKnown:() => Promise<QueryResult> = async ():Promise<QueryResult> => {
    var sql: string =
      "select name, reading, writing, speaking from Language where empid =?;";
    try {
      var [result] = await con.query(sql, [id]);
      return result;
    } catch (error) {
      console.log("error in getting language known");
    }
  };
  const technologyKnown:() => Promise<QueryResult> = async ():Promise<QueryResult> => {
    var sql: string = "select name, level from Technology where fkEmp =?;";

    try {
      var [result] = await con.query(sql, [id]);
      return result;
    } catch (error) {
      console.log("error in getting technology known");
    }
  };
  const refrences:() => Promise<QueryResult> = async ():Promise<QueryResult> => {
    var sql: string =
      "select person, contactNumber, relation from RefrenceContact where fkEmp =?;";
    try {
      var [result] = await con.query(sql, [id]);
      return result;
    } catch (error) {
      console.log("error in getting refrences", error);
    }
  };
  const prefrences:() => Promise<QueryResult> = async ():Promise<QueryResult> => {
    var sql: string =
      "select location, department, noticePeriod, currentCtc, expectedCtc from Prefrences where fkEmp =?;";
    try {
      var [result] = await con.query(sql, [id]);
      return result;
    } catch (error) {
      console.log("error in getting prefrences details", error);
    }
  };
  async function sequentialQueries():Promise<void> {
    try {
      const basicdetails: QueryResult = await basicDetail();
      const educationdetails: QueryResult = await educationDetails();
      const workexpdetails: QueryResult = await workExperienceDetails();
      const languageknown: QueryResult = await languageKnown();
      const technologknown: QueryResult = await technologyKnown();
      const refrencesdetails: QueryResult = await refrences();
      const prefrencesdetails: QueryResult = await prefrences();
      // console.log(basicdetails,educationdetails,workexpdetails,languageknown,technologknown,refrencesdetails,prefrencesdetails);

      // let date = moment(basicdetails[0][0].dob).utc().format("YYYY-MM-DD");
      if (basicdetails && prefrencesdetails !== undefined) {
        res.send({
          result: basicdetails,
          educationdetails: educationdetails,
          workexpdetails: workexpdetails,
          languageknown: languageknown,
          technologknown: technologknown,
          refrencesdetails: refrencesdetails,
          prefrencesdetails: prefrencesdetails,
          id: id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  sequentialQueries();
};

export const renderUpdate = (req: Request, res: Response):void => {
  res.render("job_Application_Form.ejs");
};

export const updateData = (req: Request, res: Response):void => {
  var data: FormData = req.body.data;
  // console.log(req.query);
  console.log(data);
  var basic: string[] = [
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
  var education: string[][] = [
    data.education1,
    data.education2,
    data.education3,
    data.education4,
  ];
  var company: string[][] = [
    data.companyName1,
    data.companyName2,
    data.companyName3,
  ];
  var refrences: string[][] = [data.person1, data.person2, data.person3];
  var language: string[][] = [data.Language1, data.Language2, data.Language3];
  var ability: string[][] = [data.ability1, data.ability2, data.ability3];
  var technology: string[][] = [
    data.technology1,
    data.technology2,
    data.technology3,
  ];
  var level: string[][] = [data.level1, data.level2, data.level3];
  var prefrences: string[][] = [
    data.location,
    data.department,
    data.noticePerid,
    data.currentCtc,
    data.expectedCtc,
  ];
  const BasicDetails:() => Promise<void> = async () => {
    var sql: string = `update BasicDetails set name=?, lastName=?, designation=?, email=?, city=?,state=?, contactNo=?, gender=?, birthday=?, relationshipStatus=?, zipcode=? where id = ?;`;
    try {
      await con.query(sql, basic);
      console.log("basic details updated");
    } catch (error) {
      console.log("error in updating basic details", error);
    }
  };

  const getId:() => Promise<QueryResult> = async () => {
    var sql1: string = `select id from School where fkEmp = ${req.body.id};
    select id from WorkExperience where fkEmp = ${req.body.id};
    select id from Language where empid = ${req.body.id};select id from Technology where fkEmp = ${req.body.id};
    select id from RefrenceContact where fkEmp = ${req.body.id};select id from Prefrences where fkEmp = ${req.body.id};`;
    try {
      var [result] = await con.query(sql1);

      return result;
    } catch (error) {
      console.log("could not get all the id's", error);
    }
  };

  async function sequentialQueries():Promise<void> {
    try {
      await BasicDetails();
      interface ItemId {
        id: number;
      }
      const empid: Array<Array<ItemId>> = (await getId()) as Array<Array<ItemId>>;

      // console.log(empid);
      // console.log(empid[0][0].id);
      let i = 0;
      // update education data
      education.forEach(async (ele:string[]) => {
        if (ele[0] != "") {
         
          if (empid[0][i] == undefined) {
            var sql:string =
              "insert into School (fkEmp,board,passingYear,percentage) values(?,?,?,?)";
            var school:string[] = [req.body.id, ele[0], ele[1], ele[2]];
            try {
              await con.query(sql, school);
            } catch (error) {
              console.log("could not able to insert into school table", error);
            }
          } else {
            var sql:string = `update School set board = ?, passingYear = ?, percentage = ? where fkEmp = ? and id = ?;`;
            var school:string[] = [ele[0], ele[1], ele[2], req.body.id, empid[0][i].id];
            try {
              await con.query(sql, school);
            } catch (error) {
              console.log("could not update school data", error);
            }
          }
        }
        i++;
      });

      // update workexperinece data
      i = 0;
      company.forEach(async (ele:string[]) => {
        if (ele[0] != "") {
          if (empid[1][i] == undefined) {
            var sql:string =
              "insert into WorkExperience (fkEmp, companyName, designation, fromDate, toDate) values (?,?,?,?,?)";
            var from:string = moment(ele[2]).utc().format("YYYY-MM-DD");
            var to:string = moment(ele[2]).utc().format("YYYY-MM-DD");
            var company:string[] = [req.body.id, ele[0], ele[1], from, to];
            try {
              await con.query(sql, company);
            } catch (error) {
              console.log("could not insert company data", error);
            }
          } else {
            var sql = `update WorkExperience set companyName = ?, designation = ?, fromDate = ?, toDate = ? where fkEmp = ? and id = ?;`;
            var from = moment(ele[2]).utc().format("YYYY-MM-DD");
            var to = moment(ele[2]).utc().format("YYYY-MM-DD");
            var company:string[] = [
              ele[0],
              ele[1],
              from,
              to,
              req.body.id,
              empid[1][i].id,
            ];
            try {
              await con.query(sql, company);
            } catch (error) {
              console.log("could not update work experience", error);
            }
          }
        }

        i++;
      });

      // update language data to the database
      var lang:(string|number)[][] = chekbox(language, ability);

      for (let i:number = 0; i < lang.length; i++) {
        if (empid[2][i] != undefined) {
          try {
            await con.query(
              `update  Language set name = ?, reading = ?, writing = ?, speaking =? where empid = ? and id = ?;`,
              [
                lang[i][0],
                lang[i][1],
                lang[i][2],
                lang[i][3],
                req.body.id,
                empid[2][i].id,
              ]
            );
            console.log("language data updates successfully");
          } catch (error) {
            console.log("could not update language data", error);
          }
        } else {
          try {
            await con.query(
              `insert into  Language (empid, name, reading, writing, speaking) values(?,?,?,?,?)`,
              [req.body.id, lang[i][0], lang[i][1], lang[i][2], lang[i][3]]
            );
          } catch (error) {
            console.log("could not update language data", error);
          }
        }
      }

      // updating technology data
      i = 0;
      technology.forEach(async (ele:string[]) => {
        if (ele != undefined) {
          if (empid[3][i] != undefined) {
            try {
              await con.query(
                `update Technology set name = ?, level =? where fkEmp = ? and id = ?;`,
                [ele, level[i], req.body.id, empid[3][i].id]
              );
            } catch (error) {
              console.log("cloud not update technology data", error);
            }
          } else {
            try {
              await con.query(
                `insert into Technology (fkEmp, name, level) values(?,?,?);`,
                [req.body.id, ele, level[i]]
              );
            } catch (error) {
              console.log("could not update technology data", error);
            }
          }
        }
        i++;
      });

      // updating refrences contact data
      i = 0;
      refrences.forEach(async (ele:string[]) => {
        if (ele[0] != "") {
          if (empid[4][i] != null) {
            try {
              await con.query(
                `update  RefrenceContact set  person = ?, contactNumber =?, relation =? where fkEmp = ? and id = ?;`,
                [ele[0], ele[1], ele[2], req.body.id, empid[4][i].id]
              );
            } catch (error) {
              console.log("could not update refrence data", error);
            }
          } else {
            try {
              await con.query(
                `insert into   RefrenceContact (fkEmp, person, contactNumber, relation) values(?,?,?,?)`,
                [req.body.id, ele[0], ele[1], ele[2]]
              );
            } catch (error) {
              console.log("could not update refrence data", error);
            }
          }
        }
        i++;
      });

      // updating prefrences data
      var prefrences1 = prefrences.map((x) => (x.length === 0 ? (x = null) : (x = x)));
      if (empid[5][0] != null) {
        try {
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
            ]
          );
        } catch (error) {
          console.log("could not update prefrences", error);
        }
      } else {
        try {
          await con.query(
            `insert into  Prefrences (fkEmp, location, department, noticePeriod, currentCtc, expectedCtc) values (?,?,?,?,?,?)`,
            [
              req.body.id,
              prefrences1[0],
              prefrences1[1],
              prefrences1[2],
              prefrences1[3],
              prefrences1[4],
            ]
          );
        } catch (error) {
          console.log("could not update prefrences", error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  sequentialQueries();
};

export const thanks = (req: Request, res: Response) => {
  res.send("thanks for your response");
};

export const listOfEmployees = async (req: Request, res: Response) => {
  var result:RowDataPacket = await select(
    "select id as Serial_No, name as Name, lastName as Last_Name, designation as Designation, email as Email, city as City, contactNo as Contact_Number, gender Gender, birthday as Date_Of_Birth, relationshipStatus as Relationship_Status, address1 as Permanent_Address from BasicDetails",
    []
  );
  // console.log(result);
  res.render("list_of_employee.ejs", { result: result });
};
