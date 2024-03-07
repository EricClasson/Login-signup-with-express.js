const toggle = document.querySelector(".hidden");
const signin = document.querySelectorAll(".signin");
const loginForm = document.querySelector(".login");
const signupFrom = document.querySelector(".signup");
const signUp = document.querySelector(".sign-up");
const logIn = document.querySelector(".log-in");
const main = document.querySelector(".main");

const passwordCont = document.querySelector(".password-cont");

const usernameLogin = document.querySelector("#username-login");
const passwordLogin = document.querySelector("#password-login");
const usernameSignup = document.querySelector("#username-signup");
const emailSignup = document.querySelector("#email-signup");
const passwordSingup = document.querySelector("#password-signup");

const urlsignup = "http://localhost:3000/signup";
const urllogin = "http://localhost:3000/login";

signin.forEach((e) => {
  e.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.toggle("hidden");
    signupFrom.classList.toggle("hidden");
  });
});

signUp.addEventListener("click", (e) => {
  e.preventDefault();
  const usernameSignupValue = usernameSignup.value;
  const emailSignupValue = emailSignup.value;
  const passwordSingupValue = passwordSingup.value;
  console.log(usernameSignupValue);
  console.log(emailSignupValue);
  console.log(passwordSingupValue);

  const existingfaileduserTxt = document.querySelector(".faileduser");
  if (existingfaileduserTxt) {
    existingfaileduserTxt.remove();
  }

  fetch(urlsignup, {
    method: "POST",
    body: JSON.stringify({
      username: usernameSignupValue,
      email: emailSignupValue,
      password: passwordSingupValue,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.success === false) {
        const faileduser = document.createElement("p");
        faileduser.textContent = "User already exist.. Try again!!";
        faileduser.classList.add("faileduser");
        signupFrom.appendChild(faileduser);
      } else {
        singUpSuccess();
      }
    });
});

logIn.addEventListener("click", (e) => {
  e.preventDefault();
  const usernameLoginValue = usernameLogin.value;
  const passwordLoginValue = passwordLogin.value;

  const existingFailedTxt = document.querySelector(".failedTxt");
  if (existingFailedTxt) {
    existingFailedTxt.remove();
  }

  fetch(urllogin, {
    method: "POST",
    body: JSON.stringify({
      username: usernameLoginValue,
      password: passwordLoginValue,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.success === true) {
        loginSuccess();
      } else {
        const failedTxt = document.createElement("p");
        failedTxt.classList.add("failedTxt");
        failedTxt.textContent = "Login in failed.. Try again!!";
        loginForm.appendChild(failedTxt);
      }
    });
});

const loginSuccess = () => {
  document.body.innerHTML = "";
  const h1 = document.createElement("h1");
  h1.textContent = "Logged in!";
  document.body.appendChild(h1);
};

const singUpSuccess = () => {
  document.body.innerHTML = "";
  const h1 = document.createElement("h1");
  h1.textContent = "You are signed up!";
  document.body.appendChild(h1);
};
