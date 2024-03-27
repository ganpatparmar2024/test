async function submitData() {
    const data = test();
  
    try {
      let response = await fetch("/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // response = await response.json();
      // console.log(response[0].statusCode);
  
      // if (response[0].statusCode == 404) {
      //   alert("user Could not found");
      //   //   window.location.replace("http://localhost:3000/register");
      // }
  
      // if (response[0].statusCode == 200) {
      //   alert("you have successfully login urself");
      //     window.location.replace("http://localhost:3000/secrets");
      // }
  
      // if (response[0].statusCode == 401) {
      //   alert("Your credentials are wrong");
      // }
  
      // if (response.redirected) {
      //   window.location.replace("http://localhost:3000/secrets");
      //   return;
      // }
    } catch (error) {
      console.log(error);
    }
  }
  
  function test() {
    const form = document.getElementById("form");
    const submitter = document.querySelector("#submitbtn");
    const formData = new FormData(form);
    const searilizedata = {};
  
    searilizedata["username"] = document.getElementById("username").value
    searilizedata["password"] = document.getElementById("password").value
    // console.log(searilizedata);
    // for (const [key, value] of formData.entries()) {
    //   const fieldname = key.replace("[]", "");
    //   if (!searilizedata[fieldname]) {
    //     searilizedata[fieldname] = [];
    //   }
    //   searilizedata[fieldname].push(value);
    // }
    return searilizedata;
  }
  