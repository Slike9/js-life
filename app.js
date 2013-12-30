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

function render(){
  var table = $('#table');
  for(var i=0; i < N; ++i){
    for(var j = 0; j < N; ++j){

    }
  }
}

function life(){
}

$(function (){
  initScreen();
  //initLife();
  //render();
});

