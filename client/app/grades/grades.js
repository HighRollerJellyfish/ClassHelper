/**
@module classroom.grades
*/

angular.module('classroom.grades', [])
.controller('GradesController', ['$rootScope', '$scope', 'GetGrades', 'AddGrades', function ($rootScope, $scope, GetGrades, AddGrades) {
  /**
  This method tests if the user has the role 'teacher'.
  @method isTeacher
  @return boolean
  */
  $scope.isTeacher = function () {
    return $rootScope.currentUser.role === 'teacher';
  }
  /**
  This method checks that the user is a teacher and adds gradeData to the server.
  @method addGrade
  @param gradeData
  */
  $scope.addGrade = function (gradeData) {
    console.log(gradeData);
    AddGrades.add(gradeData);
  }
  // Show all grades if the user is a teacher
  if ($scope.isTeacher()) {
    GetGrades.allGrades().then(function(data) {
      var svg = dimple.newSvg(".grades", 1000, 800);
      var gradesData = angular.fromJson(data.data);
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
    GetGrades.gradesForUser($rootScope.currentUser.username).then(function(data) {
      var svg = dimple.newSvg(".grades", 1000, 800);
      var gradesData = angular.fromJson(data.data);
      var myChart = new dimple.chart(svg, gradesData);

      var x = myChart.addCategoryAxis("x", "lesson_title");
      x.addOrderRule("lesson_title");
      myChart.addMeasureAxis("y", "score");
      myChart.addColorAxis("score",["#FF0000","#0000FF"]);
      myChart.addSeries(null, dimple.plot.bar);
      myChart.draw();

    });
  }
}]);