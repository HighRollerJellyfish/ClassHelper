/**
This controller module is associated with the grades view and deals with grades data.
@class classroom.grades
*/

angular.module('classroom.grades', [])
.controller('GradesController', ['$rootScope', '$scope', 'Grades', 'Classes', function ($rootScope, $scope, Grades, Classes) {

  /**
  This method tests if the user has the role 'teacher'.
  @method isTeacher
  @return {Boolean}
  */
  $scope.isTeacher = function () {
    return $rootScope.currentUser.role === 'teacher';
  }
  /**
  This method checks that the user is a teacher and adds gradeData to the server.
  @method addGrade
  @param {Object} gradeData Entered grade data.
  */
  $scope.addGrade = function (gradeData) {
    Grades.add(gradeData);
  }

  // Clear the grades div
  var gradesDiv = document.getElementsByClassName('grades')[0];
  $scope.clear = function (){
    while (gradesDiv.hasChildNodes()) {
      gradesDiv.removeChild(gradesDiv.lastChild);
    };
  }

  // Averages student grade by assignment
  var averageData = function (dataObj){
    var result = {};
    var solution = [];
    // Assign all student scores to assignment by ID
    dataObj.forEach(function(data){
      result[data.assignment_id] = result[data.assignment_id] || [data.assignment_title];
      result[data.assignment_id].push( data.grade );
    });
    // Average all student scores at ID
    Object.keys(result).forEach(function(key){
      var title = result[key].shift();
      var total = result[key].reduce(function(memo, score){
        return memo += score;
      });
      result[key] = [title, Math.round( total / result[key].length )];
    });  
    // Convert result from object with array properties to solution array with object properties
    Object.keys(result).forEach(function(key){
      var obj = {};
      obj.assignment_id = parseInt(key, 10);
      obj.assignment_title = result[key][0];
      obj.grade = result[key][1];
      solution.push(obj);
    })
    return solution;
  };

  // Create color pallette for legend
  var createPallete = function (dataObj){
    var possibilities = ["#4541A4", "#DCE845", "#AA52C7", "#D46C1D", "#2B918A", "#D4A81D", "#76C11A", "#CA3C75"];
    var result = {};
    dataObj.forEach(function(obj){
      if ( !result[obj.class_title] ){
        result[obj.class_title] = [obj.class_title, possibilities.shift()];
      }
    });
    return result;
  };

  var gradesInformation;

  if ($scope.isTeacher()) { //TEACHER: Show class average on assignments

    Classes.getUserClasses($rootScope.currentUser.id).then(function(data) {
      $scope.classList = data.data;
    })
    .then(function(){
      // Auto-draw the first class on list
      $scope.makeChart($scope.classList[0].class_id);
      $scope.selection = $scope.classList[0];
    });
      
    $scope.makeChart = function(classID){
      console.log(classID)
      Grades.getClassGrades(classID).then(function(data) {
        var gradesData = data.data;
        gradesData = averageData(gradesData);
        console.log('gradesData: ', gradesData);
        return gradesData;
      }).then(function(gradesData){
        // Create new svg and chart
        chart = null;
        var svg = dimple.newSvg(".grades", "100%", "100%");
        var classChart = new dimple.chart(svg, gradesData);
        classChart.setBounds( "5%", "7%", "93%", "85%");

        // Define x-axis
        var x = classChart.addCategoryAxis("x", "assignment_title");
        x.fontSize = "auto";

        // Define y-axis
        var y = classChart.addMeasureAxis("y", "grade");
        y.fontSize = "auto";

        // Define z-axis
        var z = classChart.addMeasureAxis("z", "assignment_id");

        classChart.addSeries(null, dimple.plot.bubble);
        chart = classChart;
      }).then( function(){
        // Create the chart
        chart.draw();
        console.log('drawing')
        // Format data point
        d3.selectAll("circle")
          .attr("r", 7);
        // chart.axes[0].titleShape[0][0].innerHTML("Assignment");
      });
    };

    var chart;
    window.onresize = function () {
      chart.draw(0, true);
      d3.selectAll("circle")
        .attr("r", 7);
    };

  } else { // STUDENT: Show grades over time

    Grades.getStudentGrades($rootScope.currentUser.id).then(function(data) {
      var gradesData = angular.fromJson(data.data);

      gradesData.forEach(function(obj){
        obj.assignment_date = moment(obj.createdAt).format('L');
      });

      console.log('gradesData: ', gradesData);
      return gradesData;
    }).then(function(gradesData){
      // Create new svg and chart
      var svg = dimple.newSvg(".grades", "100%", "100%");
      var progressChart = new dimple.chart(svg, gradesData);
      progressChart.setBounds( "5%", "5%", "80%", "80%");

      // Define x-axis
      var x = progressChart.addCategoryAxis("x", "assignment_date");
      x.fontSize = "auto";

      // Define y-axis
      var y = progressChart.addMeasureAxis("y", "grade");
      y.overrideMax = 100;
      y.fontSize = "auto";

      // Define z-axis
      var z = progressChart.addSeries(["assignment_date", "grade", "class_title"], dimple.plot.bubble);

      // For each class type, assign a color
      var pallette = createPallete(gradesData);
      Object.keys(pallette).forEach( function(key){
        progressChart.assignColor(pallette[key][0], pallette[key][1]);
      });

      // Define legend
      var l = progressChart.addLegend("85%", "5%", "10%", "80%", "right");
      l.fontSize = "auto";

      chart = progressChart;
    }).then(function(){
      // Create the chart
      chart.draw();

      // Format datapoint
      d3.selectAll("circle")
        .attr("r", 7);
    });

    var chart;

    window.onresize = function () {
      chart.draw(0, true);
      d3.selectAll("circle")
        .attr("r", 7);
    };
  
  }

  /**************************************************************************/

  /******* SHOW ALL STUDENTS AVG GRADES (LINE CHART) ***********************/

  /**************************************************************************/

  // Grades.getForUser($rootScope.currentUser.username).then(function(user){
  //   var student = user.data[0].student;

  //   Grades.getAll().then(function(data) {
  //     var gradesData = angular.fromJson(data.data);
  //     console.log(gradesData)
  //     gradesData = averageData(gradesData);
  //     console.log('averaged: ', gradesData)

  //     // Data to be edited for chart creation
  //     var numAtScore = [
  //       {rank: 10, num: 0}, {rank: 20, num: 0}, {rank: 30, num: 0}, {rank: 40, num: 0}, {rank: 50, num: 0},
  //       {rank: 60, num: 0}, {rank: 70, num: 0}, {rank: 80, num: 0}, {rank: 90, num: 0}, {rank: 100, num: 0}
  //     ];

  //     // Modify info from gradesData and input into numAtScore for chart creation
  //     var max = 0; // used for y axis
  //     gradesData.forEach(function(record){
  //       var range = 10;
  //       while (record.avg > range){
  //         range += 10;
  //       }

  //       var index = range > 99 ? range.toString().slice(0,2)-1 : range.toString().slice(0,1)-1;

  //       if (record.student === student){
  //         numAtScore[index].student = student;
  //       }
  //       numAtScore[index].num += 1;
  //       // store max number of students in a range to determine y axis
  //       if (numAtScore[index].num > max) { max = numAtScore[index].num; }
  //       console.log(range, index, numAtScore[index], record.student)
  //     });

  //     // Create chart
  //     var svg = dimple.newSvg(".grades", 700, 500);
  //     var myChart = new dimple.chart(svg, numAtScore);
  //     var x = myChart.addCategoryAxis("x", "rank");
  //     var y1 = myChart.addMeasureAxis("y", "num");
  //     y1.overrideMax = max + 1;
  //     var s1 = myChart.addSeries(null, dimple.plot.line, [x, y1]);
  //     s1.interpolation = "cardinal";
  //     myChart.draw();
  //   });
  // });
}]);
