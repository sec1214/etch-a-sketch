const container = document.getElementById("container");
let clear_btn = document.getElementById("clear-btn");
let black_btn = document.getElementById("black-btn");
let rainbow_btn = document.getElementById("rainbow-btn");
let cellColor = "rgb(255, 255, 255)";

function makeRows(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-columns", cols);

  for (i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    cell.innerText = i + 1;
    cell.style.backgroundColor = "rgb(255, 255, 255)";
    container.appendChild(cell).className = "grid-item";
    cellColor = cell.style.backgroundColor;

    cell.addEventListener("mouseover", function () {
      cell.style.backgroundColor = "rgb(0, 0, 0)";
      cellColor = cell.style.backgroundColor;
    });

    rainbow_btn.addEventListener("click", function () {
      let HSLVar = "";

      cell.addEventListener("mouseover", function () {
        if (
          cell.style.backgroundColor == "rgb(0, 0, 0)" ||
          cell.style.backgroundColor == "rgb(255, 255, 255)"
        ) {
          clear_btn.addEventListener("mousedown", function () {
            HSLVar = 50;
            cell.style.background = get_random_hsl();
          });

          HSLVar = 50;

          cell.style.backgroundColor = get_random_hsl();

          cellColor = cell.style.backgroundColor.slice(4, -1).split(",");
          RGBToHSL(cellColor[0], cellColor[1], HSLVar);
          cellColor = RGBToHSL(cellColor[0], cellColor[1], cellColor[2]);
          console.log("HSLVar " + HSLVar);
          cellColor = cell.style.backgroundColor;
        } else if (cell.style.backgroundColor != "rgb(0, 0, 0)" || cell.style.backgroundColor != "rgb(255, 255, 255)");
        {
          cell.addEventListener("mouseover", function () {
            console.log("rainbow_btn cell.addEventListener else if ");
            console.log("HSLVar " + HSLVar);
            clear_btn.addEventListener("mousedown", function () {
              console.log("HSLVar " + HSLVar);
              console.log("onmousedown event occurred.");

              HSLVar = 50;
              cell.style.background = get_random_hsl();
              console.log("HSLVar " + HSLVar);
              //cellColor = "purple";
              console.log("mouseover " + cellColor);
              console.log("HSLVar " + HSLVar);
            });
            cellColor = cell.style.backgroundColor.slice(4, -1).split(",");
            console.log(
              " cellColor = cell.style.backgroundColor.slice(4, -1).split(",
              ");" + cellColor
            );
            console.log("HSLVar " + HSLVar);
            cellColor = RGBToHSL(cellColor[0], cellColor[1], cellColor[2]);
            console.log("HSLVar " + HSLVar);
            cellColor = cellColor.slice(4, -1).split(",");
            console.log("HSLVar " + HSLVar);

            if (HSLVar < 0) {
              HSLVar = 0;
            }
            cellColor =
              "hsl(" +
              cellColor[0] +
              ", " +
              cellColor[1] +
              ", " +
              HSLVar +
              "%)";
            cell.style.backgroundColor = cellColor;
            console.log(
              "cellColor = RGBToHSL(cellColor[0], cellColor[1], cellColor[2]);" +
                cellColor
            );
            console.log("HSLVar " + HSLVar);
            HSLVar -= 5;
            console.log("HSLVar " + HSLVar);
          });
        }
      });
    });
    //problem if rainbow_btn pushed black does not stay black
    black_btn.addEventListener("click", function () {
      console.log("black_btn.addEventListener " + cellColor);
      cell.addEventListener("mouseover", function () {
        cell.style.backgroundColor = "rgb(0, 0, 0)";
        if (cell.style.backgroundColor != "rgb(0, 0, 0)") {
          cell.style.backgroundColor = "rgb(0, 0, 0)";
        }
      });
    });
  }
}

// clear_btn.addEventListener("mousedown", function () {
//   console.log("onmousedown event occurred.");
//   HSLVar = 50;
// });

/*clear does not reset the HSLVar
clear_btn.addEventListener("click", function () {
  console.log("clear_btn.addEventListener ");
  //HSLVar = 50;
  let elements = document.getElementsByClassName("grid-item");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = "rgb(255, 255, 255)";
    //cellColor = elements[i].style.backgroundColor;
    elements[i].style.color = "black";
    //console.log("clear btn " + cellColor);
    //console.log("clear btn " + HSLVar);
  }
});*/

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

makeRows(2, 2);
