var N = 50;
var area = [];

var rowTemplate = _.template("<tr id='row<%=i%>'></tr>");
var cellTemplate = _.template("<td id='<%=i%>_<%=j%>'></td>");

function initLife(){
  for(var i = 0; i < N; ++i){
    area[i] = [];
  }

  var center = N / 2;
  area[center][center] = true;
  area[center][center + 1] = true;
  area[center][center + 2] = true;
  area[center - 1][center + 2] = true;
  area[center - 2][center + 1] = true;
}

function initScreen(){
  $('#start').click(start);
  $('#stop').click(stop);

    var $table = $('#table');
    for (var i = 0; i < N; i++) {
        row_html = rowTemplate({i: i});
        $table.append(row_html);
        var $row = $table.find('tr#row' + i);
        console.log($row);

        for (var j = 0; j < N; j++) {
            cell_html = cellTemplate({i: i, j: j});
            $row.append(cell_html);
        }
    }
}

var action;

function start(){
  action = setInterval(function(){
    life();
    render();
  }, $('#interval').val());
  console.log($('#interval').val());
}

function stop(){
  clearInterval(action);
}

function render(){
  var table = $('#table');
  table.find('td').removeClass('life');
  for(var i=0; i < N; ++i){
    for(var j = 0; j < N; ++j){
      td = $('td#' + i + '_' + j);
      if (area[i][j]){
        td.addClass('life');
      }
    }
  }
}

function life(){
  var newArea = []
  for (var i = 0; i < N; i++){
    newArea[i] = []
    for (var j = 0; j < N; j++){
      lifeCount = getLifeCount(i, j);
      if (lifeCount == 3){
        newArea[i][j] = true;
      } else if (lifeCount == 2){
        newArea[i][j] = area[i][j]
      } else {
        newArea[i][j] = false;
      }
    }
  }
  area = newArea;
}

function getLifeCount(x,y) {
  var counter = 0
  for(i=x-1; i <= x+1; i++){
    for(j=y-1; j<=y+1; j++){
      if ((i == x && j == y) || (i < 0) || (j < 0) || (i >= N) || (j >= N)){
        continue;
      }
      if (area[i][j]){
        ++counter;
      }
    }
  }

  return counter;
}

$(function (){
  initScreen();
  initLife();
  render();
  start();
});

