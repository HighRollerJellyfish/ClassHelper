/**
This controller module is associated with the grades view and deals with grades data.
@class classroom.grades
*/

angular.module('classroom.grades', [])
.controller('GradesController', ['$rootScope', '$scope', 'Grades', 'Classes', function ($rootScope, $scope, Grades, Classes) {

  // Check if user is a teacher
  $scope.isTeacher = function () {
    return $rootScope.currentUser.role === 'teacher';
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

  // Filter array for objects with ID that match targetID
  var filterAssignment = function (dataObj, targetID){
    targetID = parseInt(targetID, 10)
    for (var i=0; i<dataObj.length; i++){
      var obj = dataObj[i];
      obj['Student Name'] = obj.student_name;
      delete obj.student_name;
      obj.Grade = obj.grade;
      delete obj.grade;
      if (obj.assignment_id !== targetID){
        dataObj = dataObj.slice(0, i).concat( dataObj.slice(i+1, dataObj.length));
        i--;
      }
    };
    return dataObj;
  };

  // Filter array for specific class's assignments and corresponding IDs
  var makeLessonList = function(id){
    console.log('making lesson list', id, gradesInformation);
    console.log('classList', $scope.classList)
    var result = [];
    var ids = {};
    // Filter for objects matching class ID
    gradesInformation.forEach(function(obj){
      ids[obj.assignment_id] = obj.assignment_title;
    });
    // Convert for angular options
    Object.keys(ids).forEach(function(idKey){
      var newObj = {assignment_id: idKey, assignment_title: ids[idKey]};
      result.push(newObj);
    });
    $scope.lessonList = result;
  };

  // Create color pallette for student legend
  var createPallete = function (dataObj, key){
    var possibilities = ["#4541A4", "#DCE845", "#AA52C7", "#D46C1D", "#2B918A", "#D4A81D", "#76C11A", "#CA3C75", "#763C75", "#CAC11A"];
    var result = {};
    dataObj.forEach(function(obj){
      if ( !result[obj[key]] ){
        result[obj[key]] = [obj[key], possibilities.shift()];
      }
    });
    return result;
  };

  // Store teacher's classes' information
  var gradesInformation;

  //TEACHER: Show class average on assignments
  if ($scope.isTeacher()) { 
    // Get teacher's classes information
    Classes.getUserClasses($rootScope.currentUser.id).then(function(data) {
      $scope.classList = data.data;
    }).then(function(){
      // Auto-draw the first class on list
      $scope.makeChart($scope.classList[0].class_id);
      // Auto-select first of teacher's classes on droptable
      $scope.selection = $scope.classList[0];
    });
     
    // Create class averages table  
    $scope.makeChart = function(classID){
      // Get grades by class
      Grades.getClassGrades(classID).then(function(data) {
        var gradesData = data.data;
        gradesInformation = data.data;
        gradesData = averageData(gradesData);
        // Rename object properties for axis title
        gradesData.forEach(function(dataObj){
          dataObj.Grade = dataObj.grade;
          delete dataObj.grade;
          dataObj["Assignment Title"] = dataObj.assignment_title
          delete dataObj.assignment_title;
        });
        return gradesData;
      }).then(function(gradesData){ // Draw chart
        // Create new svg and chart
        chart = null;
        var svg = dimple.newSvg(".grades", "100%", "100%");
        var classChart = new dimple.chart(svg, gradesData);
        classChart.setBounds( "5%", "7%", "93%", "70%");

        // Define x-axis
        var x = classChart.addCategoryAxis("x", "Assignment Title");
        x.fontSize = "auto";

        // Define y-axis
        var y = classChart.addMeasureAxis("y", "Grade");
        y.fontSize = "auto";
        y.overrideMax = 100;

        classChart.addSeries(null, dimple.plot.bubble);
        // Assign accessible variable for window resizing
        chart = classChart;
        // Create the chart
        chart.draw();
        // Format data point
        d3.selectAll("circle")
          .attr("r", 7);
        // Create data for assignment selector
        makeLessonList(classID);
      });
    };

    $scope.lessonChart = function(classID, AssignmentID){
      // Get all grades for the class
      Grades.getClassGrades(classID).then(function(data) {
        var newData = data.data;
        // Filter grades by assignment
        var gradesData = filterAssignment(newData, AssignmentID);
        return gradesData;
      }).then(function(gradesData){ // Draw chart
        console.log('lessonChart gradesData', gradesData)
        // Create new svg and chart
        var svg = dimple.newSvg(".grades", "100%", "100%");
        var lessonChart = new dimple.chart(svg, gradesData);
        lessonChart.setBounds( "5%", "7%", "93%", "72%");

        // Define x-axis
        var x = lessonChart.addCategoryAxis("x", "Student Name");
        x.fontSize = "auto";

        // Define y-axis
        var y = lessonChart.addMeasureAxis("y", "Grade");
        y.fontSize = "auto";
        y.overrideMax = 100;

        var pallette = createPallete(gradesData, "Student Name");
        Object.keys(pallette).forEach( function(key){
          lessonChart.assignColor(pallette[key][0], pallette[key][1]);
        });

        z = lessonChart.addSeries(["Student Name", "Grade"], dimple.plot.bubble);
        chart = lessonChart;
      }).then( function(){
        // Create the chart
        chart.draw();
        // Format data point
        d3.selectAll("circle")
          .attr("r", 7);
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
        obj["Assignment Date"] = moment(obj.createdAt).format('L');
        delete obj.assignment_date;
        obj.Grade = obj.grade;
        delete obj.grade;
        obj.Class = obj.class_title;
        delete obj.class_title;
      });

      console.log('gradesData: ', gradesData);
      return gradesData;
    }).then(function(gradesData){
      // Create new svg and chart
      var svg = dimple.newSvg(".grades", "100%", "100%");
      var progressChart = new dimple.chart(svg, gradesData);
      progressChart.setBounds( "5%", "5%", "80%", "80%");

      // Define x-axis
      var x = progressChart.addCategoryAxis("x", "Assignment Date");
      x.fontSize = "auto";

      // Define y-axis
      var y = progressChart.addMeasureAxis("y", "Grade");
      y.overrideMax = 100;
      y.fontSize = "auto";

      // Define z-axis
      var z = progressChart.addSeries(["Assignment Date", "Grade", "Class"], dimple.plot.bubble);

      // For each class type, assign a color
      var pallette = createPallete(gradesData, "Class");
      Object.keys(pallette).forEach( function(key){
        progressChart.assignColor(pallette[key][0], pallette[key][1]);
      });

      // Define legend
      var l = progressChart.addLegend("90%", "5%", "10%", "80%", "right");
      l.fontSize = "auto";

      chart = progressChart;
    }).then(function(){
      // Create the chart
      chart.draw();

      // Format datapoint
      d3.selectAll("circle")
        .attr("r", 7);
    });

    var chart; // Allow chart access after construction

    // Resize chart on window size change
    window.onresize = function () {
      chart.draw(0, true);
      d3.selectAll("circle")
        .attr("r", 7);
    };
  
  }

}]);
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
