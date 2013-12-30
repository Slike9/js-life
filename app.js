var N = 50;
var area = [];

var rowTemplate = _.template("<tr id='row<%=i%>'></tr>");
var cellTemplate = _.template("<td id='<%=i%>_<%=j%>'></td>");

function initLife(){
  for(var i = 0; i < N; ++i){
    area[i] = [];
  }

  var center = Math.floor(N / 2);
  area[center][center] = true;
  area[center][center + 1] = true;
  area[center][center + 2] = true;
  area[center - 1][center + 2] = true;
  area[center - 2][center + 1] = true;
}

function resizeArea(){
    var $table = $('#table');
    $table.html('');
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

function initScreen(){
  $('#start').click(start);
  $('#stop').click(stop);
  $('#N').change(function(){
    N = $(this).val();
    resizeArea();
    initLife();
  });
  $('#next').click(next);

  resizeArea();

  $('#table').on('click', 'td', function(){
    var coord = $(this).attr('id').split('_');
    var y = coord[0];
    var x = coord[1];
    area[y][x] = !area[y][x];
    render();
  });
}

var action;

function start(){
  action = setInterval(next, $('#interval').val());
  console.log($('#interval').val());
}

function stop(){
  clearInterval(action);
}

function next(){
    life();
    render();
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
      if (i == x && j == y){
        continue;
      }
      if (area[(i+N)%N][(j+N)%N]){
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

