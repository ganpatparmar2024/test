

// fuunction to send registerd data
async function submitData() {
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
        window.location.replace('http://localhost:3000/register')
      }
      // console.log(response);
      
      if (response.status == 200) {
        var responsejson= await response.json();
      console.log(responsejson);
        window.location.replace('http://localhost:3000/thanks?randCode='+responsejson.randCode+'&id='+responsejson.uid)
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