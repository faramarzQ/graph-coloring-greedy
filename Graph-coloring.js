function first() {

  var nodes = document.getElementById('nodes').value;
  var graph = document.getElementById('graph').value;
  var colors = document.getElementById('colors').value;

  nodes = nodes.split(" ");
  graph = graph.split(" ");
  colors = colors.split(" ");
  var colored_nodes = [];
  var error;

  for(i=0; i<nodes.length; i++) {

    var available_colors = Object.assign({}, colors);

    for(j=0; j<i; j++) {

      if( graph.includes(String(nodes[i]) + ',' + nodes[j])
       || graph.includes(String(nodes[j]) + ',' + nodes[i]) ) {

         for(var key in available_colors) {
           if(available_colors[key] == colored_nodes[nodes[j]]) {
             delete available_colors[key];
           }
         }
      }
    }

    if(Object.keys(available_colors).length == 0) {
      error = " not enough number of colors!";
    } else {
      for (var first_color in available_colors) {
        break
      }
      colored_nodes[nodes[i]] =  available_colors[first_color];
    }
  }

  if(error) {
    document.getElementById('error').innerHTML = error;
    document.getElementById('error-alert').classList.remove('d-none');
  } else {
    document.getElementById('error').innerHTML = "";
    document.getElementById('error-alert').classList.add('d-none');
  }

  document.getElementById('result-alert').classList.remove('d-none');
  result = "";

  for(var i in colored_nodes) {
    var result = result + i + " : " + colored_nodes[i] + "<br>";
    document.getElementById('result').innerHTML = result;
  }
}


//second algorithm

function indexOfMax(arr) {
    var max = 0;
    var maxIndex = 0;

    for (var key in arr) {
        if (arr[key] >= max) {
            maxIndex = key;
            max = arr[key];
        }
    }
    return maxIndex;
}


function second() {
  var nodes = document.getElementById('nodes').value;
  var graph = document.getElementById('graph').value;
  var colors = document.getElementById('colors').value;

  nodes = nodes.split(" ");
  graph = graph.split(" ");
  colors = colors.split(" ");
  var degree = [];
  var colored_nodes = [];
  var error;

  //colculates every node's degree
  for(k=0; k<nodes.length; k++) {
    var value = 0;
    for(j=0; j<graph.length; j++) {
      if(graph[j].includes(nodes[k])) {
        value++;
      }
    }
    degree[nodes[k]] = value;
  }


  for(i=0; i<nodes.length; i++) {

    //refresh the available colors
    available_colors = colors.slice();

    //gets index of the first max number
    var maxNodeDegree = indexOfMax(degree);

    for(var key in colored_nodes) {
      if((graph.includes(String(maxNodeDegree + ',' + key))
       || graph.includes(String(key + ',' + maxNodeDegree))) ){
         //here they are neighbours

         available_colors.splice( available_colors.indexOf(colored_nodes[key]), 1 );
       }
    }

    //finds the first color
    for (var first_color in available_colors) {
      break;
    }
    colored_nodes[maxNodeDegree] = available_colors[first_color];

    delete degree[maxNodeDegree]

  }

  //biding html
  for(var key in colored_nodes) {
    if(colored_nodes[key] == undefined) {
      error = " not enough number of colors!"
    }
  }

  if(error) {
    document.getElementById('error').innerHTML = error;
    document.getElementById('error-alert').classList.remove('d-none');
  } else {
    document.getElementById('error').innerHTML = "";
    document.getElementById('error-alert').classList.add('d-none');
  }

  document.getElementById('result-alert').classList.remove('d-none');
  result = "";

  for(var i in colored_nodes) {
    var result = result + i + " : " + colored_nodes[i] + "<br>";
    document.getElementById('result').innerHTML = result;
  }

}
