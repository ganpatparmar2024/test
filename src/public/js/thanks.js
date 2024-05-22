
var params = new URLSearchParams(document.location.search);
var code = params.get("randCode");
var id = params.get("id")
console.log(id);
console.log(code);

document.getElementById("acivatelink").setAttribute("href","http://localhost:3000/api/activelink?randCode="+code+"&id="+id)
document.getElementById("acivatelink").innerText = "Click Here To Generate Password"