function checkpass() {
    var pass1 = document.getElementById("password").value;
    var pass2 = document.getElementById("conformpassword").value;
    if (pass1 == pass2) {
      return true;
    } else {
      alert("New Password and Conform Password Does not Match");
      return false;
    }
  }
  
  async function submitData() {
    if (checkpass()) {
      try {
        var data = test();
  
        let response = await fetch("/api/password", {
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
        if (response.status == 201) {
          alert("You are successfully registerd")
          window.location = "http://localhost:3000/api/register"
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  }
  
  function test() {
    const form = document.getElementById("form");
    const formData = new FormData(form);
    const searilizedata = {};
    var params = new URLSearchParams(document.location.search);
    var code = params.get("id");
  
    for (const [key, value] of formData.entries()) {
      const fieldname = key.replace("[]", "");
      if (!searilizedata[fieldname]) {
        searilizedata[fieldname] = [];
      }
      searilizedata[fieldname].push(value);
    }
    searilizedata["id"] = code
    return searilizedata;
  }
  