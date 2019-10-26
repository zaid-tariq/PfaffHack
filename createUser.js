// function UserAction() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//          if (this.readyState == 4 && this.status == 200) {
//              alert(this.responseText);
//          }
//     };
//     xhttp.open("POST", "194.94.239.125:9000/publish", true);
//     xhttp.setRequestHeader("Content-type", "application/json");
//     var text = '{'+
// 	'"type": "created-user",'+
//     '"sender": "pm-user",'+
//     '"concernedUsers": ["1"],'+
//     '"payload": {'+
//         '"userId": "1",'+
//         '"username": "khashmi",'+
//         '"firstName": "khurram",'+
//         '"lastName": "hashmi"'+
// 	'},'+
// 	'"tags": ['+
//         '"user", "account" '+
//     	']'+
// 	'}'; 
//     xhttp.send(text);
// }

// <button type="submit" onclick="UserAction()">Search</button>
<!DOCTYPE html>
<html>
<head>
<title>JSON with JavaScript Object Creation </title>
<script language="javascript" >

  var JSONQury = { "item" : "pen", "manufactured"  : 2014 };
  document.write("<h1>JSON with JavaScript</h1>");
  document.write("<br/>");
  document.write("<p>Item Name="+JSONQury.item+"</p>");
  document.write("<p>Manufactured in="+JSONQury.manufactured+"</p>");

</script>
</head>
<body>
</body>
</html>