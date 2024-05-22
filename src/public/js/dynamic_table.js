function addRow() {
  rowLen = document.querySelectorAll(".row").length;
  colLen = document.querySelectorAll(".col1").length;
  const row = document.createElement("tr");
  for (let id = 1; id <= colLen; id++) {
    if (
      (id % 2 == 0 && (rowLen + 1) % 2 == 0) ||
      (id % 2 != 0 && (rowLen + 1) % 2 != 0)
    ) {
      const col = document.createElement("td");
      classNamecol =
        "col" + (rowLen + 1) + " " + "row" + (rowLen + 1) + "col" + id;
      col.className = classNamecol;
      const node = document.createTextNode("new");
      col.appendChild(node);
      col.style.backgroundColor = "blue";
      row.appendChild(col);
      row.className = "row" + " " + "row" + (rowLen + 1);
      console.log(col.className);
    } else {
      const col = document.createElement("td");
      classNamecol =
        "col" + (rowLen + 1) + " " + "row" + (rowLen + 1) + "col" + id;
      col.className = classNamecol;
      const node = document.createTextNode("new");
      col.appendChild(node);
      row.appendChild(col);
      row.className = "row" + " " + "row" + (rowLen + 1);
      console.log(col.className);
    }
  }

  document.querySelector("table").appendChild(row);
  console.log(row.className);
}

function addColumn() {
  rowLen = document.querySelectorAll(".row").length;
  colLen = document.querySelectorAll(".col1").length;

  for (let i = 1; i <= rowLen; i++) {
    if (
      (i % 2 == 0 && (colLen + 1) % 2 == 0) ||
      (i % 2 != 0 && (colLen + 1) % 2 != 0)
    ) {
      const col = document.createElement("td");
      let classNameCol = "col" + i + " " + "row" + i + "col" + colLen;
      col.className = classNameCol;
      const node = document.createTextNode("new");
      col.appendChild(node);
      col.style.backgroundColor = "blue";
      let rowName = "row row" + i;
      const row = document.getElementsByClassName(rowName)[0];
      row.appendChild(col);
    } else {
      const col = document.createElement("td");
      let classNameCol = "col" + i + " " + "row" + i + "col" + colLen;
      col.className = classNameCol;
      const node = document.createTextNode("new");
      col.appendChild(node);
      let rowName = "row row" + i;
      const row = document.getElementsByClassName(rowName)[0];
      row.appendChild(col);
    }
  }
}

function removeRow() {
  rowLen = document.querySelectorAll(".row").length;
  colLen = document.querySelectorAll(".col1").length;

  if (rowLen <= 2) {
    alert("you Can not delete further");
  } else {
    const rowName = "row" + " " + "row" + rowLen;
    document.getElementsByClassName(rowName)[0].remove();
  }
}

function removeColumn() {
  rowLen = document.querySelectorAll(".row").length;
  colLen = document.querySelectorAll(".col1").length;

  // col2 row2col1

  if (colLen <= 2) {
    alert("You can not delete further");
  } else {
    for (let i = 1; i <= rowLen; i++) {
      //  console.log(document.querySelectorAll(".row")[i-1].lastChild)
      var row = document.querySelectorAll(".row")[i - 1];
      var lchild = document.querySelectorAll(".row")[i - 1].lastChild;
      row.removeChild(lchild);
    }
  }
}
