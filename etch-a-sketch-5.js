const container = document.getElementById("container");
let clear_btn = document.getElementById("clear-btn");
let black_btn = document.getElementById("black-btn");
let rainbow_btn = document.getElementById("rainbow-btn");
let elements = document.getElementsByClassName("grid-item");
let luminosity = "";

clear_btn.addEventListener("click", resetParameters);
rainbow_btn.addEventListener("click", rainbowDiv);
black_btn.addEventListener("click", setDivToBlack);

function setDivToBlack() {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mouseover", function () {
      elements[i].style.backgroundColor = "black";
      //elements[i].innerHTML = luminosity;
    });
  }
}

function startProgram() {
  makeRows(16, 16);

  for (let i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = "white";
    elements[i].addEventListener("mouseover", function () {
      if (elements[i].style.backgroundColor == "white") {
        elements[i].style.backgroundColor = "black";
        elements[i].style.color = "white";
      } else if (elements[i].style.backgroundColor != "black") {
        elements[i].innerHTML -= 5;
      }
    });
  }
}

function makeRows(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-columns", cols);
  for (let i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    cell.innerText = i + 1;
    cell.innerHTML = 55;
    luminosity = cell.innerHTML;
    cell.style.backgroundcolor = "white";
    container.appendChild(cell).className = "grid-item";
  }
}

startProgram();

function resetParameters() {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = "white";
    elements[i].style.color = "black";
    elements[i].innerHTML = 55;
  }
}

function rainbowDiv() {
  console.log("test");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mouseover", function () {
      elements[i].style.backgroundColor = get_random_hsl();
      divColor = elements[i].style.backgroundColor;
      if (
        elements[i].style.backgroundColor != "white" ||
        elements[i].style.backgroundColor != "black"
      ) {
        luminosity = elements[i].innerHTML;
        elements[i].style.backgroundColor = divColor;
        divColor = elements[i].style.backgroundColor.slice(4, -1).split(",");
        divColor = RGBToHSL(divColor[0], divColor[1], divColor[2]);
        divColor = divColor.slice(4, -1).split(",");
        divColor =
          "hsl(" + divColor[0] + ", " + divColor[1] + ", " + luminosity + "%)";

        elements[i].style.backgroundColor = divColor;
      }
      if (elements[i].innerHTML < 0) {
        elements[i].innerHTML = 0;
      }
    });
  }
}

function get_random_hsl() {
  var h = Math.floor(Math.random() * 361);
  var s = 100;
  //(SATURATION)Math.floor(Math.random() * 101);
  var l = 50;

  // white hsl(0,0%, 100%)
  // black (0, 0%,0%)

  //(LUMINOSITY)Math.floor(Math.random() * 101);

  let currentColor = "hsl(" + h + ", " + s + "%, " + l + "%)";

  console.log("current color from function get_random_hsl()" + currentColor);
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mouseover", function () {
      if (
        elements[i].style.backgroundColor != "white" ||
        elements[i].style.backgroundColor != "black"
      ) {
        console.log("get random hsl  not black or white " + luminosity);
      }
    });
  }

  return currentColor;
  //"hsl(" + h + ", " + s + "%, " + l + "%)"; // hsl(263, 11%, 90%)
}

function RGBToHSL(r, g, b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  // console.log("hsl(" + h + "," + s + "%," + l + "%)");

  return "hsl(" + h + "," + s + "%," + l + "%)";
}
