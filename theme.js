document.body.className = localStorage.getItem("theme");

if(document.body.className != "th1" || document.body.className != "th2" || document.body.className != "th3") {
  document.body.className = "th1";
}

let toggle = document.querySelector(".toggle");
toggle.addEventListener("click", () => {
  switch(document.body.className) {
    case "th1":
      document.body.className = "th2"; break;
    case "th2":
      document.body.className = "th3"; break;
    case "th3":
      document.body.className = "th1"; break;
  }
});

window.addEventListener("beforeunload", () => {localStorage.setItem("theme", document.body.className)});