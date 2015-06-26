angular.module('classroom.grades', [])
.controller('GradesController', ['$rootScope', '$scope', 'GetGrades', 'AddGrades', function ($rootScope, $scope, GetGrades, AddGrades) {
  $scope.isTeacher = function () {
    return $rootScope.currentUser.role === 'teacher';
  }

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