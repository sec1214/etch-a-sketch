const container = document.getElementById("container");
let eraseTrailBtn = document.getElementById("eraseTrailBtn");
let eraseAllCellsBtn = document.getElementById("eraseAllCellsBtn");
let createNewGridBtn = document.getElementById("createNewGridBtn");
let slider = document.getElementById("slider");

function makeRows(rows, cols) {
  //setting the style for the rows and the columns
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);

  //creating the rows and the columns through for loop
  for (c = 0; c < rows * cols; c++) {
    let cell = document.createElement("div");
    cell.innerText = c + 1;
    container.appendChild(cell).className = "grid-item";

    //trail function attached to cell element
    cell.addEventListener("mouseover", function (event) {
      event.target.style.backgroundColor = "black";
      event.target.style.color = "white";
    });
  }
}

//function to erase trail
eraseTrailBtn.addEventListener("click", function () {
  var elements = document.getElementsByClassName("grid-item");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = "white";
    elements[i].style.color = "black";
  }
});

function changeRowColNum(val) {
  var elements = document.getElementsByClassName("grid-items");
  container.replaceChildren();
  let rowNum = val;
  let cellNum = val;
  makeRows(rowNum, cellNum);
}

slider.addEventListener("click", function () {
  let rowNum = val;
  let cellNum = val;
  makeRows(rowNum, cellNum);
});

makeRows(16, 16);
