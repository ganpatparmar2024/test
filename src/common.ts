import {Request} from 'express';

declare global{
  namespace Express {
    interface Request {
      Pagination?:PaginationType;
    }
  }
}

interface PaginationType {
      page: number,
      limit: number,
      startIndex:number,
      endIndex:number,
}

function getRandomCode() {
    var randString = "abcdefghijklmnopqrstuvwxyz1234567890"
    var rand ="";
    for (let i = 0; i < 10; i++) {
        rand+=randString.charAt(Math.floor(Math.random() * randString.length))
        
    }
    return rand
}
 export function chekbox(language:string[][], ability:string[][]):(string|number)[][] {
  var hindi:{[key:string]:number }= {}
  var english:{[key:string]:number }= {}
  var gujarati:{[key:string]:number }= {}
    // var hindi = {};
    // var english = {};
    // var gujarati = {};
    let i = 0;
    language.forEach((ele) => {
      if (ele != undefined) {
        // console.log(ele);
        for (let j = 0; j < ability[i].length; j++) {
          if (i == 0) {
            switch (ability[i][j]) {
              case "Read":
                hindi["Read"] = 1;
                break;
              case "Write":
                hindi["Write"] = 1;
                break;
              case "Speak":
                hindi["Speak"] = 1;
                break;
  
              default:
                break;
            }
          } else if (i == 1) {
            switch (ability[i][j]) {
              case "Read":
                english["Read"] = 1;
                break;
              case "Write":
                english["Write"] = 1;
                break;
              case "Speak":
                english["Speak"] = 1;
                break;
  
              default:
                break;
            }
          } else {
            switch (ability[i][j]) {
              case "Read":
                gujarati["Read"] = 1;
                break;
              case "Write":
                gujarati["Write"] = 1;
                break;
              case "Speak":
                gujarati["Speak"] = 1;
                break;
  
              default:
                break;
            }
          }
        }
      }
      i++;
    });
    console.log(hindi, english, gujarati);
    var h = [];
    var e = [];
    var g = [];
    var ab = ["Read", "Write", "Speak"];
    if (Object.keys(hindi).length != 0) {
      h.push("Hindi");
      for (let i = 0; i < ab.length; i++) {
        if (hindi[ab[i]] == 1) {
          h.push(1);
        } else {
          h.push(0);
        }
      }
    } else {
      h.push("Hindi");
      for (let i = 0; i < ab.length; i++) {
        h.push(0);
      }
    }
    if (Object.keys(english).length != 0) {
      e.push("English");
      for (let i = 0; i < ab.length; i++) {
        if (english[ab[i]] == 1) {
          e.push(1);
        } else {
          e.push(0);
        }
      }
    } else {
      e.push("English");
      for (let i = 0; i < ab.length; i++) {
        e.push(0);
      }
    }
    if (Object.keys(gujarati).length != 0) {
      g.push("Gujarati");
      for (let i = 0; i < ab.length; i++) {
        if (gujarati[ab[i]] == 1) {
          g.push(1);
        } else {
          g.push(0);
        }
      }
    } else {
      g.push("Gujarati");
      for (let i = 0; i < ab.length; i++) {
        g.push(0);
      }
    }
    return [h, e, g];
  }
console.log(getRandomCode());
export{getRandomCode}