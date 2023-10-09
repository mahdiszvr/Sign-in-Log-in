//Show password
let show = document.getElementById("showL");
show.addEventListener("click", function () {
  let x = document.getElementById("pwrdL");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }

  show.classList.toggle("fa-eye");
  show.classList.toggle("fa-eye-slash");
});

// Captcha
var random = Math.floor(Math.random() * 1000);
let captcha = document.getElementById("num");
captcha.innerHTML = random;

// Refresh captcha
document.querySelector("button#refresh").addEventListener("click", function () {
  random = Math.floor(Math.random() * 1000);
  let captcha = document.getElementById("num");
  captcha.innerHTML = random;
});

//Log in
document.getElementById("Log-in").addEventListener("click", logIn);

function logIn() {
  let email = document.getElementById("emailL").value;
  let password = document.getElementById("pwrdL").value;
  let input = document.getElementById("text").value;
  let emailList = [];
  let passList = [];
  nameList = [];

  if (email == "" || password == "" || input == "") {
    alert("Complete the form!");
  } else {
    fetch("http://localhost:3004/posts")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((elem) => {
          emailList.push(elem.email);
          passList.push(elem.password);
          nameList.push(elem.name);
        });

        if (emailList.includes(email)) {
          eIndex = emailList.indexOf(email);
          if (passList[eIndex] == password && Number(input) == random) {
            alert(`Welcome ${nameList[eIndex]}`);
          } else if (passList[eIndex] != password) {
            alert("Wrong Password or Email!!");
          } else if (Number(input) != random) {
            alert("Wrong Captcha!");
          }
        } else {
          alert("Wrong password or Email!");
        }
      });
  }
}
