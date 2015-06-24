angular.module('classroom.grades', [])
.controller('GradesController', function ($rootScope, $scope, $state, GetGrades) {
  $scope.isCollapsed = false;
  if ($rootScope.currentUser.role === 'teacher') {
    GetGrades.allGrades().then(function(data) {
      $scope.grades = angular.fromJson(data.data);
    });
  } else {
    GetGrades.gradesForUser($rootScope.currentUser.username).then(function(data) {
      $scope.grades = angular.fromJson(data.data);
    });
  }
});