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
  This method adds gradeData to the server.
  @method addGrade
  @param gradeData
  */
  $scope.addGrade = function (gradeData) {
    console.log(gradeData);
    AddGrades.add(gradeData);
  }

  if ($rootScope.currentUser.role === 'teacher') {
    GetGrades.allGrades().then(function(data) {
      $scope.grades = angular.fromJson(data.data);
    });
  } else {
    GetGrades.gradesForUser($rootScope.currentUser.username).then(function(data) {
      $scope.grades = angular.fromJson(data.data);
    });
  }
}]);