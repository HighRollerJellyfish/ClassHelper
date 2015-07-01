/**
This controller module is associated with the grades view and deals with grades data.
@class classroom.grades
*/

angular.module('classroom.grades', [])
.controller('GradesController', ['$rootScope', '$scope', 'Grades', function ($rootScope, $scope, Grades) {
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

  // Show all grades if the user is a teacher or else it only displays the grades
  // of the user if the user is not a teacher.

  //To display grades data for teachers and individual users, D3 and Dimple.js
  //was used.  Refer to dimplejs.org for documentation on how to use dimple.
  if ($scope.isTeacher()) {
    Grades.getAll().then(function(data) {
      var svg = dimple.newSvg(".grades", 1000, 800);
      var gradesData = angular.fromJson(data.data);
      console.dir(gradesData);
      var myChart = new dimple.chart(svg, gradesData);

      var x = myChart.addCategoryAxis("x", "lesson_title");
      x.addOrderRule("lesson_title");
      myChart.addCategoryAxis("y", "student");
      myChart.addMeasureAxis("z", "score");
      myChart.addColorAxis("score",["#FF0000","#0000FF"]);
      myChart.addSeries(null, dimple.plot.bubble);
      myChart.draw();
    });
    
  } else { // The user is a student, so only show that student's grades
    Grades.getAll().then(function(data) {
      var gradesData = angular.fromJson(data.data);

      // Data to be edited for chart creation
      var numAtScore = [
        {rank: 10, num: 0}, {rank: 20, num: 0}, {rank: 30, num: 0}, {rank: 40, num: 0}, {rank: 50, num: 0},
        {rank: 60, num: 0}, {rank: 70, num: 0}, {rank: 80, num: 0}, {rank: 90, num: 0}, {rank: 100, num: 0}
      ];

      // Modify info from gradesData and input into numAtScore for chart creation
      gradesData.forEach(function(obj){
        var range = 10;
        while (obj.score > range){
          range += 10;
        }
        numAtScore[ range.toString().slice(0,1)-1 ].num += 1;
      });

      // Create chart
      var svg = dimple.newSvg(".grades", 700, 500);
      var myChart = new dimple.chart(svg, numAtScore);
      var x = myChart.addCategoryAxis("x", "rank");
      myChart.addMeasureAxis("y", "num");
      var s = myChart.addSeries(null, dimple.plot.line);
      s.interpolation = "cardinal";
      myChart.addLegend(60, 10, 500, 20, "right");
      myChart.draw();
    });

  }

  // if ($scope.isTeacher()) {
  //   Grades.getAll().then(function(data) {
  //     var svg = dimple.newSvg(".grades", 1000, 800);
  //     var gradesData = angular.fromJson(data.data);
  //     console.dir(gradesData);
  //     var myChart = new dimple.chart(svg, gradesData);

  //     var x = myChart.addCategoryAxis("x", "lesson_title");
  //     x.addOrderRule("lesson_title");
  //     myChart.addCategoryAxis("y", "student");
  //     myChart.addMeasureAxis("z", "score");
  //     myChart.addColorAxis("score",["#FF0000","#0000FF"]);
  //     myChart.addSeries(null, dimple.plot.bubble);
  //     myChart.draw();
  //   });
  // } else { // The user is a student, so only show that student's grades
  //   Grades.getForUser($rootScope.currentUser.username).then(function(data) {
  //     var svg = dimple.newSvg(".grades", 1000, 800);
  //     var gradesData = angular.fromJson(data.data);
  //     var myChart = new dimple.chart(svg, gradesData);

  //     var x = myChart.addCategoryAxis("x", "lesson_title");
  //     x.addOrderRule("lesson_title");
  //     myChart.addMeasureAxis("y", "score");
  //     myChart.addColorAxis("score",["#FF0000","#0000FF"]);
  //     myChart.addSeries(null, dimple.plot.bar);
  //     myChart.draw();
  //   });
  // }
}]);