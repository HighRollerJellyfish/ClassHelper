/**
This controller module is associated with the grades view and deals with grades data.
@class classroom.grades
*/

angular.module('classroom.grades', [])
.controller('GradesController', ['$rootScope', '$scope', 'Grades', 'Classes', function ($rootScope, $scope, Grades, Classes) {
  
  Classes.getUserClasses($rootScope.currentUser.id).then(function(data) {
    console.log("User classes:");
    console.log(data);
  });


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

  // TEACHER: Sees all grades. STUDENT: Sees own grades

  // Averages all student data by name
  var averageData = function (dataObj, target, keyName){
    var result = [];
    dataObj.forEach(function(data){
      var pushed = false;
      for (var i=0; i<result.length; i++){
        if (result[i][target] === data[target]) {
          result[i].avg.push(data.score);
          pushed = true;
          break;
        }
      }
      if (!pushed){
        result.push( {keyName: data[target], avg: [data.score] } )// change to id later and add studentname property
      }
    });
    // Go through each result obj and avg the avg data
    result.forEach(function(data){
      var total = data.avg.reduce( function(memo, num){
        return memo = memo + num;
      });
      var average = total / data.avg.length;
      data.avg = average;
    })
    return result;
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

  // if ( $scope.isTeacher() ) { // TEACHER
  //   Grades.getAll().then(function(data) {

  //     var data = angular.fromJson(data.data); console.log(data);
  //     var averaged = averageData(data);
  //     averaged = averaged.forEach(function())

  // Show all grades if the user is a teacher or else it only displays the grades
  // of the user if the user is not a teacher.
  console.log($rootScope.currentUser);
  //To display grades data for teachers and individual users, D3 and Dimple.js
  //was used.  Refer to dimplejs.org for documentation on how to use dimple.

  //DUMMY VARIABLE
  var class_id = 1;

  if ($scope.isTeacher()) {
    Grades.getClassGrades(class_id).then(function(data) {
      console.log(data.data);
      return data.data;
    }).then(gradesData)
      var svg = dimple.newSvg(".grades", 1000, 800);
      var classChart = new dimple.chart(svg, gradesData);
      classChart.setBounds( "5%", "5%", "80%", "80%");
      var x = classChart.addCategoryAxis("x", assignment_date);
      x.fontSize = "auto";
      classChart.addMeasureAxis("y", /*averaged class grade*/);
      y.fontSize = "auto";
      classChart.addSeries(null, dimple.plot.bubble);
      classChart.addLegend("85%", "5%", "10%", "80%", "right");
      // classChart.draw();
      


      // var svg = dimple.newSvg(".grades", 1000, 800);
      // var gradesData = angular.fromJson(data.data);
      // console.dir(gradesData);
      // var myChart = new dimple.chart(svg, gradesData);

      // var x = myChart.addCategoryAxis("x", "lesson_title");
      // x.addOrderRule("lesson_title");
      // myChart.addCategoryAxis("y", "student");
      // myChart.addMeasureAxis("z", "score");
      // myChart.addColorAxis("score",["#FF0000","#0000FF"]);
      // myChart.addSeries(null, dimple.plot.bubble);
      // myChart.draw();
    });

  } else { // STUDENT: Show grades over time

    /*
    { assignment_date: "2015-07-02T06:01:17.000Z",
    assignment_id: 1,
    assignment_title: "Problem Set 1",
    class_id: 1,
    class_title: "Algorithms",
    grade: 95 }
    */
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