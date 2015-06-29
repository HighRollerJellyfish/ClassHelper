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
      $scope.grades = angular.fromJson(data.data);
    });
  } else { // The user is a student, so only show that student's grades
    GetGrades.gradesForUser($rootScope.currentUser.username).then(function(data) {
      $scope.grades = angular.fromJson(data.data);
    });
  }
}]);