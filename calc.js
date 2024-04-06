let calcscreen = document.querySelector(".screen");
let buttons = document.querySelector(".buttons");

calcscreen.addEventListener("keydown", (e) => e.preventDefault());
calcscreen.addEventListener("mousedown", (e) => e.preventDefault());
buttons.addEventListener("mousedown", keypadFunc);
document.addEventListener("keydown", keyboardFunc);

function keypadFunc(e) {
  //Prevent keypad from reacting to Enter key
  if (e.pointerId == -1) return;
  //Numbers validate
  if (!e.target.className && (calcscreen.value == "0" || calcscreen.value == "NaN" || calcscreen.value == "Infinity")) calcscreen.value = e.target.value; //If the value is 0 and user types 0, then the value becomes 0 again
  else if (!e.target.className && calcscreen.value.match(/(?=[+-x/])[\d.]*/g)[calcscreen.value.split("").filter(e => e == "+" || e == "-" || e == "/" || e == "x").length * 2] == "0") calcscreen.value = calcscreen.value.substring(0, calcscreen.value.length - 1) + e.target.className;
  else if (!e.target.className) calcscreen.value += e.target.value;

  //Deletion functionality
  else if (e.target.value == "RESET") calcscreen.value = "0";
  else if (e.target.value == "DEL") {
    if (calcscreen.value.length == 1) {
      calcscreen.value = "0";
      return;
    }
    calcscreen.value = calcscreen.value.substring(0, calcscreen.value.length - 1);
  }
  //Operations validate
  let operations = "+-x/"
  if (operations.indexOf(calcscreen.value[calcscreen.value.length - 1]) != -1  && operations.indexOf(e.target.value) != -1)
    calcscreen.value = calcscreen.value.substring(0, calcscreen.value.length - 1) + e.target.value;
  else if (operations.indexOf(e.target.value) != -1) {
    calcscreen.value += e.target.value;
  }

  //Floating point validate
  if (calcscreen.value.match(/(?=[+-x/])[\d.]*/g)[calcscreen.value.split("").filter(e => e == "+" || e == "-" || e == "/" || e == "x").length * 2].split("").filter(el => el == ".").length < 1 && e.target.value == ".") {
    calcscreen.value += e.target.value;
  }

  //Equal
  if (e.target.value == "=") calcscreen.value = result();
}

function keyboardFunc(e) {
  //Numbers validate
  let chars = "1234567890";
  if (chars.indexOf(e.key) != -1 && (calcscreen.value == "0" || calcscreen.value == "NaN" || calcscreen.value == "Infinity")) calcscreen.value = e.key; //If the value is 0 and user types 0, then the value becomes 0 again
  else if (chars.indexOf(e.key) != -1 && calcscreen.value.match(/(?=[+-x/])[\d.]*/g)[calcscreen.value.split("").filter(e => e == "+" || e == "-" || e == "/" || e == "x").length * 2] == "0") calcscreen.value = calcscreen.value.substring(0, calcscreen.value.length - 1) + e.key;
  else if (chars.indexOf(e.key) != -1) calcscreen.value += e.key;

  //Deletion functionality
  if (e.key == "Backspace") {
    if (calcscreen.value.length == 1) {
      calcscreen.value = "0";
      return;
    }
    calcscreen.value = calcscreen.value.substring(0, calcscreen.value.length - 1);
  }
  else if (e.key == "Delete") calcscreen.value = "0";

  //Operations validate
  let operations = "+-*/"
  if ((operations.indexOf(calcscreen.value[calcscreen.value.length - 1]) != -1 || calcscreen.value[calcscreen.value.length - 1] == 'x')  && operations.indexOf(e.key) != -1) {
    if (e.key == "*") calcscreen.value = calcscreen.value.substring(0, calcscreen.value.length - 1) + "x";
    else calcscreen.value = calcscreen.value.substring(0, calcscreen.value.length - 1) + e.key;
  }
  else if (operations.indexOf(e.key) != -1) {
    if (e.key == "*") calcscreen.value += "x";
    else calcscreen.value += e.key;
  }

  //Floating point validate
  if (calcscreen.value.match(/(?=[+-x/])[\d.]*/g)[calcscreen.value.split("").filter(e => e == "+" || e == "-" || e == "/" || e == "x").length * 2].split("").filter(el => el == ".").length < 1 && e.key == ".") {
    calcscreen.value += e.key;
  }

  //Equal
  if (e.key == "=" || e.key == "Enter") calcscreen.value = result();
}

function result() {
  return new Function(`return ${calcscreen.value.replaceAll("x", "*")}`)();
}
