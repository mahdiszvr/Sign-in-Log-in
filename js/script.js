// Show password
let show = document.getElementById("show");
show.addEventListener("click", function () {
  let x = document.getElementById("pwrd");
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

// Create account (Sign in)
document.getElementById("create").addEventListener("click", create);

function create() {
  let fullName = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("pwrd").value;
  let input = document.getElementById("text").value;

  if (fullName == "" || email == "" || password == "") {
    alert("Complete the form!");
  } else if (Number(input) == random) {
    let emailList = [];
    fetch("http://localhost:3004/posts")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((elem) => {
          emailList.push(elem.email);
        });
        console.log(emailList);

        if (emailList.includes(email)) {
          alert("There is an account with this email.");
        } else {
          fetch("http://localhost:3004/posts", {
            method: "POST",
            body: JSON.stringify({
              name: fullName,
              email: email,
              password: password,
            }),
            headers: {
              "content-type": "application/json",
            },
          }).then((res) => res.json());

          alert("Successful! Now you can log in.");
        }
      });
  } else if (Number(input) != random) {
    alert("Wrong captcha!");
  }
}
