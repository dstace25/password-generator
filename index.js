const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const special = [
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

const passwordLenght = 15;
let password1 = "";
let password2 = "";
let includeNumbers = true;
let includeSpecial = true;

const passwordOneEl = document.getElementById("passwordOne");
const passwordTwoEl = document.getElementById("passwordTwo");

const resetEl = document.getElementById("reset");

setPasswordBtnDisabled(true);
disableReset(true);

function setPasswordBtnDisabled(change) {
  passwordOneEl.disabled = change;
  passwordTwoEl.disabled = change;
}

function updateIncludeNumbers() {
  includeNumbers = !includeNumbers;
}

function updateIncludeSpecial() {
  includeSpecial = !includeSpecial;
}

function reset() {
  passwordOneEl.innerHTML = "";
  passwordTwoEl.innerHTML = "";
  password1 = "";
  password2 = "";
  setPasswordBtnDisabled(true);
  disableReset(true);
}

function generatePasswords() {
  password1 = "";
  password2 = "";
  for (let i = 0; i < passwordLenght; i++) {
    const randomIndex1 = Math.floor(Math.random() * characters.length);
    const randomIndex2 = Math.floor(Math.random() * characters.length);
    if (includeNumbers && randomIndex1 % 2 === 0) {
      const randomIndex3 = Math.floor(Math.random() * numbers.length);
      const randomIndex4 = Math.floor(Math.random() * special.length);
      password1 += numbers[randomIndex3];
      password2 += numbers[randomIndex4];
    }
    if (includeSpecial && randomIndex2 % 2 !== 0) {
      const randomIndex3 = Math.floor(Math.random() * numbers.length);
      const randomIndex4 = Math.floor(Math.random() * special.length);
      password1 += special[randomIndex3];
      password2 += special[randomIndex4];
    }
    password1 += characters[randomIndex1];
    password2 += characters[randomIndex2];
  }
  password1 = password1
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("")
    .slice(0, passwordLenght);
  password2 = password2
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("")
    .slice(0, passwordLenght);
  console.log("passwords", password1, password2);
  passwordOneEl.innerHTML = password1;
  passwordTwoEl.innerHTML = password2;
  if (password1.length > 0 && password2.length > 0) {
    setPasswordBtnDisabled(false);
  }
  disableReset(false);
  return password1, password2;
}

function copyToClipboard(num) {
  if (num === 1) {
    navigator.clipboard
      .writeText(password1)
      .then(() => {
        displayPopup();
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }
  if (num === 2) {
    navigator.clipboard
      .writeText(password2)
      .then(() => {
        displayPopup();
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }
}

function disableReset(change) {
  resetEl.disabled = change;
}

function displayPopup() {
  document.getElementById("popup").style.display = "block";
  setTimeout(() => {
    document.getElementById("popup").style.display = "none";
  }, 2000); // Hide after 2 seconds
}
