let regBox=document.querySelector(".reg-form");
let logInBox=document.querySelector(".login-form");
let registerLink=document.querySelector(".register-link");
let logInLink=document.querySelector(".log-link");

registerLink.addEventListener("click",()=>{
    regBox.classList.add("active");
    logInBox.classList.remove("active");
});
logInLink.addEventListener("click",()=>{
    logInBox.classList.add("active");
    regBox.classList.remove("active");
});
