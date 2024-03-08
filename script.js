require('dotenv').config();

const inputCode = document.getElementById("input-code");
const enableBtn = document.getElementById("enable-btn");

enableBtn.addEventListener("click", () => {
  
  console.log("clicked", inputCode.value, process.env.SECRET_CODE)
})