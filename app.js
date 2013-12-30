var rows = 100;
var cols = 100;

var tmr_id = 0;
var world = [];

$(document).ready(function() {
  initWorld();
});

function initWorld(){
  createField();
  createEmptyWorld();
  resetWorld();
}

function createEmptyWorld(){
  world = [];
  for (var i = 0; i < rows; ++i)
    world.push([]);
}

function resetWorld(){
  for (var i = 0; i < rows; ++i)
    for (var j = 0; j < cols; ++j)
      world[i][j] = false;
}

function createField(){
  for (var i = 0; i < rows; ++i){
    createRow(i, $("#field").append("<tr/>").find("tr").last());
  }
}

function createRow(row, tr){
  for (var i = 0; i < cols; ++i)
    tr.append("<td id='" + row + "-" + i + "'/>");
}
