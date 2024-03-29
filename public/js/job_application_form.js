
      var id;
      document.addEventListener("load", displayFirst());
      var currentsection = document.getElementById("0");
      var pageid = parseInt(document.getElementById("0").id);
      var next = document.getElementById("next");
      next.addEventListener("click", (event) => {
        switch (pageid) {
          case 0:
            if (checkBasicDetails() == false) {
              return;
            }
            break;
          case 1:
            if (checkEducationDetails() == false) {
              return;
            }
            break;

          case 2:
            if (checkWorkExperienceDetails() == false) {
              return;
            }
            break;
          case 3:
            if (checkLanguageKnown() == false) {
              return;
            }
            break;
          case 4:
            if (checkTechnologyKnown() == false) {
              return;
            }
            break;
          case 5:
            if (checkRefrences() == false) {
              return;
            }
            break;
          default:
            break;
        }
        pageid++;
        if (pageid == 6) {
          next.classList.add("disabled");
        }
        previous.classList.remove("disabled");
        changeSection(document.getElementById(pageid));
      });
      var previous = document.getElementById("previous");
      previous.addEventListener("click", () => {
        pageid--;
        if (pageid == 0) {
          previous.classList.add("disabled");
        }
        next.classList.remove("disabled");
        changeSection(document.getElementById(pageid));
      });
      function test() {
        const form = document.getElementById("form");
        const submitter = document.querySelector("#submitbtn");
        const formData = new FormData(form);
        const searilizedata = {};

        for (const [key, value] of formData.entries()) {
          const fieldname = key.replace("[]", "");
          if (!searilizedata[fieldname]) {
            searilizedata[fieldname] = [];
          }
          searilizedata[fieldname].push(value);
        }
        return searilizedata;
      }
      var url = new URL(window.location);
      if (url.href.includes("update")) {
        var params = new URLSearchParams(document.location.search);
        id = params.get("id");

        document.getElementById("submitbtn").hidden = true;
        document.getElementById("updatebtn").hidden = false;

        var d = getData(id);
      } else {
        document.getElementById("submitbtn").hidden = false;
        document.getElementById("updatebtn").hidden = true;
      }

      function displayFirst() {
        var firstsection = document.getElementById("0");
        var sections = document.querySelectorAll(".form-section");
        let i = 0;
        sections.forEach((element) => {
          element.style.display = "none";
          document.getElementById(i).classList.remove("active");
          i++;
        });
        sections[firstsection.id].style.display = "block";
        firstsection.classList.add("active");
        document.getElementById("previous").classList.add("disabled");
      }

      function changeSection(currentsection) {
        console.log(currentsection);
        var sections = document.querySelectorAll(".form-section");
        console.log(currentsection.id);
        console.log(sections[currentsection.id]);
        let i = 0;
        sections.forEach((element) => {
          element.style.display = "none";
          document.getElementById(i).classList.remove("active");
          i++;
        });
        sections[currentsection.id].style.display = "block";
        currentsection.classList.add("active");
      }
      function checkBasicDetails() {
        var flag;
        var basicdetails = [
          "name",
          "lastName",
          "designation",
          "contactNo",
          "city",
          "email",
          "relationshipStatus",
          "state",
          "zipcode",
          "address",
          "birthday",
        ];
        basicdetails.forEach((element) => {
          if (checkInputs(element) == false) {
            flag = false;
          }
        });

        if (
          checkRadio("gender", ["other", "male", "female"]) == false ||
          flag == false
        ) {
          return false;
        } else {
          return true;
        }
      }
      function checkEducationDetails() {
        if (
          groupCheck("education1", ["passingyear1", "percentage1"]) == false ||
          groupCheck("education2", ["passingyear2", "percentage2"]) == false ||
          groupCheck("education3", ["passingyear3", "percentage3"]) == false ||
          groupCheck("education4", ["passingyear4", "percentage4"]) == false
        ) {
          return false;
        }
      }
      function checkWorkExperienceDetails() {
        if (
          groupCheck("companyName1", [
            "designation1",
            "fromDate1",
            "toDate1",
          ]) == false ||
          groupCheck("companyName2", [
            "designation2",
            "fromDate2",
            "toDate2",
          ]) == false ||
          groupCheck("companyName3", [
            "designation3",
            "fromDate3",
            "toDate3",
          ]) == false
        ) {
          return false;
        }
      }
      function checkLanguageKnown() {
        if (
          checkSelectRadio("Language1", "ability1", [
            "abilityH1",
            "abilityH2",
            "abilityH3",
          ]) == false ||
          checkSelectRadio("Language2", "ability2", [
            "abilityE1",
            "abilityE2",
            "abilityE3",
          ]) == false ||
          checkSelectRadio("Language3", "ability3", [
            "abilityG1",
            "abilityG2",
            "abilityG3",
          ]) == false
        ) {
          return false;
        }
      }
      function checkTechnologyKnown() {
        if (
          checkSelectRadio("technology1", "level1", [
            "level11",
            "level12",
            "level13",
          ]) == false ||
          checkSelectRadio("technology2", "level2", [
            "level21",
            "level22",
            "level23",
          ]) == false ||
          checkSelectRadio("technology3", "level3", [
            "level31",
            "level32",
            "level33",
          ]) == false
        ) {
          return false;
        }
      }
      function checkRefrences() {
        if (
          groupCheck("person1", ["contactNumber1", "relation1"]) == false ||
          groupCheck("person2", ["contactNumber2", "relation2"]) == false ||
          groupCheck("person3", ["contactNumber3", "relation3"]) == false
        ) {
          return false;
        }
      }
      function checkSelect(element) {
        if (document.querySelector("#" + element).checked) {
          return true;
        }
        return false;
      }
      function checkSelectRadio(element, element2, list) {
        var eClass = "." + element2;
        if (checkSelect(element)) {
          return checkRadio(element2, list);
        } else {
          list.forEach((ele) => {
            document.querySelector("#" + ele).checked = false;
          });
          if (document.getElementById("span" + element2)) {
            removeDiv(eClass);
          }
          return true;
        }
      }
      // function to check if anyone of the element is selected or not
      function checkRadio(element, list) {
        var eClass = "." + element;
        var flag = false;
        list.forEach((radio) => {
          if (document.querySelector("#" + radio).checked) {
            if (document.getElementById("span" + element) != null) {
              removeDiv(eClass);
            }
            flag = true;
            // return true;
          }
        });
        if (flag == false) {
          if (document.getElementById("span" + element) == null) {
            createDiv(element);
          }

          return false;
        }
        return true;
      }
      // function to create an element
      function createDiv(element) {
        var eClass = "." + element;
        var eid = "#" + element;
        var name = document.querySelector(eid);
        var div = document.createElement("span");
        var text = document.createTextNode("Please provide a valid " + element);
        div.appendChild(text);
        div.style.color = "red";
        div.setAttribute("id", "span" + element);

        document.querySelector(eClass).appendChild(div);
      }
      // function to remove an element
      function removeDiv(eClass) {
        var element = document.querySelector(eClass);
        element.removeChild(element.lastChild);
      }
      // function to check for the required input
      function checkInputs(element) {
        var eClass = "." + element;
        var eid = "#" + element;
        var name = document.querySelector(eid);
        if (name.value == "") {
          if (document.getElementById("span" + element) == null) {
            createDiv(element);
          }

          return false;
        } else {
          if (document.getElementById("span" + element) != null) {
            removeDiv(eClass);
          }
          return true;
        }
      }

      function checkContactNumber(element) {
        var eClass = "." + element;
        var eid = "#" + element;
        var name = document.querySelector(eid);
        if (checkInputs(element)) {
          if (name.value.length != 10) {
            if (document.getElementById("span" + element) == null) {
              createDiv(element);
            }
            return false;
          } else {
            if (document.getElementById("span" + element)) {
              removeDiv(eClass);
            }
            return true;
          }
        }
      }
      function checkEmail(element) {
        var eClass = "." + element;
        var eid = "#" + element;
        var name = document.querySelector(eid);
        function validateEmail(email) {
          var re = /\S+@\S+\.\S+/;
          return re.test(email);
        }
        if (checkInputs(element)) {
          if (validateEmail(name.value) == false) {
            if (document.querySelector(eClass).childNodes.length == 5) {
              createDiv(element);
            }
            return false;
          } else {
            if (document.querySelector(eClass).childNodes.length == 6) {
              removeDiv(eClass);
            }
            return true;
          }
        }
      }
      function checkDate(element) {
        var eClass = "." + element;
        var eid = "#" + element;
        var name = document.querySelector(eid);
        var date = document.querySelector(eid).value;
        date = date.trim().split("-");
        if (checkInputs(element)) {
          if (date.length < 3) {
            if (document.getElementById("span" + element) == null) {
              createDiv(element);
            }
            return false;
          } else {
            var day = date[0] >= 1 && date[0] <= 31 ? true : false;
            var month = date[1] >= 1 && date[1] <= 12 ? true : false;
            var year = date[2].length == 4 ? true : false;

            if (day && month && year) {
              if (document.getElementById("span" + element)) {
                removeDiv(eClass);
              }
              return true;
            } else {
              if (document.getElementById("span" + element) == null) {
                createDiv(element);
              }
              return false;
            }
          }
        }
      }
      function groupCheck(element, list) {
        var flag = false;
        var inp = new Array(list.length);
        var inp2 = new Array(list.length);
        if (checkInputs(element) == false) {
          let i = 0;
          list.forEach((ele) => {
            if (checkInputs(ele)) {
              if (document.getElementById("span" + element) == null) {
                createDiv(element);
              }

              inp.push(false);
            } else {
              inp.push(true);
              //     if (document.getElementById("span" + element) != null) {
              //   removeDiv("."+element);
              // }
              if (document.getElementById("span" + ele) != null) {
                removeDiv("." + ele);
              }
            }
          });
        } else {
          list.forEach((ele) => {
            if (checkInputs(ele) == false) {
              if (document.getElementById("span" + ele) == null) {
                createDiv(element);
              }
              inp2.push(false);
            } else {
              inp2.push(true);
              if (document.getElementById("span" + element) != null) {
                removeDiv("." + element);
              }
              if (document.getElementById("span" + ele) != null) {
                removeDiv("." + ele);
              }
            }
          });
        }
        if (inp.includes(false) || inp2.includes(false)) {
          return false;
        } else {
          if (document.getElementById("span" + element) != null) {
            removeDiv("." + element);
          }
          return true;
        }
      }
      function populateResult(result) {
        Object.keys(result).forEach(function (prop) {
          if (prop == "gender") {
            document.getElementById(result[prop]).checked = true;
          } else if (prop == "state") {
            document.getElementById("state").value = result[prop];
          } else if (prop == "relationshipStatus") {
            document.getElementById("relationshipStatus").value = result[prop];
          } else if (prop == "birthday") {
            var date = result[prop].split("T")
            document.getElementById("birthday").value = date[0];
          } 
          else {
            document.getElementById(prop).setAttribute("value", result[prop]);
          }
        });
      }
      function populateEducation(educationdetails) {
        let i = 1;
        educationdetails.forEach((ele) => {
          Object.keys(ele).forEach(function (prop) {
            if (prop == "board") {
              document.getElementById("education" + i).value = ele[prop];
            } else if (prop == "passingYear") {
              document
                .getElementById("passingyear" + i)
                .setAttribute("value", ele[prop]);
            } else {
              document
                .getElementById(prop + i)
                .setAttribute("value", ele[prop]);
            }
          });
          i++;
        });
      }
      function populateWork(workexpdetails) {
        let j = 1;
        workexpdetails.forEach((ele) => {
          let q = 1
          Object.keys(ele).forEach(function (prop) {
            if (q == 3 || q == 4) {
              var date = ele[prop].split("T")
              document
                .getElementById(prop + j)
                .setAttribute("value", date[0]);
            } else {
              document
                .getElementById(prop + j)
                .setAttribute("value", ele[prop]);
            }
            q++
          });
          j++;
        });
      }
      function populateLanguage(languageknown) {
        let k = 0;
        let p = 1;
        let a = ["H", "E", "G"];
        let lang = ["Hindi", "English", "Gujarati"];
        console.log(languageknown);
        languageknown.forEach((ele) => {
          i = 0;
          Object.keys(ele).forEach(function (prop) {
            if (ele[prop] == 1) {
              document.getElementById("Language" + p).checked = true;
              document.getElementById("ability" + a[k] + i).checked = true;
            }

            i++;
          });
          p++;
          k++;
        });
      }
      function populateTechnology(technologknown) {
        i = 1;
        technologknown.forEach((ele) => {
          document.getElementById("technology" + i).checked = true;
          Object.keys(ele).forEach(function (prop) {
            if (ele["level"] == "expert") {
              document.getElementById("level" + i + 3).checked = true;
            } else if (ele["level"] == "mediator") {
              document.getElementById("level" + i + 2).checked = true;
            } else {
              document.getElementById("level" + i + 1).checked = true;
            }
          });
          i++;
        });
      }
      function populateRefrences(refrencesdetails) {
        j = 1;
        refrencesdetails.forEach((ele) => {
          Object.keys(ele).forEach(function (prop) {
            document.getElementById(prop + j).setAttribute("value", ele[prop]);
          });
          j++;
        });
      }
      function populatePrefrences(prefrencesdetails) {
        Object.keys(prefrencesdetails).forEach(function (prop) {
          if (prop == "location" && prefrencesdetails[prop] != null) {
            document.getElementById("location").value = prefrencesdetails[prop];
          } else if (prop == "department" && prefrencesdetails[prop] != null) {
            document.getElementById("department").value =
              prefrencesdetails[prop];
          } else {
            if (prefrencesdetails[prop] != null) {
              document
                .getElementById(prop)
                .setAttribute("value", prefrencesdetails[prop]);
            }
          }
        });
      }
      function getData(id) {
        fetch("http://localhost:3000/api/jobapplication/getdata?id=" + id)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            var result = data.result;
            var educationdetails = data.educationdetails;
            var workexpdetails = data.workexpdetails;
            var languageknown = data.languageknown;
            var technologknown = data.technologknown;
            var refrencesdetails = data.refrencesdetails;
            var prefrencesdetails = data.prefrencesdetails;
            populateResult(result);
            populateEducation(educationdetails);
            populateWork(workexpdetails);
            populateLanguage(languageknown);
            populateTechnology(technologknown);
            populateRefrences(refrencesdetails);
            populatePrefrences(prefrencesdetails);
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });
      }
      async function submitData() {
        const data = test();
        try {
          const response = await fetch("/api/jobapplication/submit", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data),
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.log(error);
        }
      }
      async function updateData() {
        const data = test();
        try {
          const response = await fetch("/api/jobapplication/updatedata", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({ data, id }),
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.log(error);
        }
      }
