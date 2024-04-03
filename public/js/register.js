

// fuunction to send registerd data
async function submitData() {
  if (checkInputs("name")&&checkInputs("lName")&&checkEmail("username")) {
    const data = test();
    
    try {
      let response = await fetch("/api/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
        redirect:"follow"
      });
      if (!response.ok) {
        alert("User alredy Exist please try with other Username")
        window.location.replace('http://localhost:3000/api/register')
      }
      // console.log(response);
      
      if (response.status == 200) {
        var responsejson= await response.json();
      console.log(responsejson);
        window.location.replace('http://localhost:3000/api/thanks?randCode='+responsejson.randCode+'&id='+responsejson.uid)
      } 
      


      if (response.status == 201) {
        var responsejson= await response.json();
      console.log(responsejson);
        alert("user is not active")
        document.getElementById("inactive").hidden = false
        document.getElementById("inactive").setAttribute("href",'http://localhost:3000/api/thanks?randCode='+responsejson.randCodee+'&id='+responsejson.id)
      }
      
      // if (response[0].statusCode == 200) {
      //   window.location.replace('http://localhost:3000/thanks?statuscode='+response[0].randCode)
      // }

      // if (response.redirected){  
          
      //     window.location.replace('http://localhost:3000/secrets');
      //     return;
      //   }
    } catch (error) {
      console.log(error);
    }
  } else {
    return
  }
    
  }

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
