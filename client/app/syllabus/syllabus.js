angular.module('classroom.syllabus', ['classroom.services'])

.controller('SyllabusController', ['$rootScope', '$scope', '$state', 'GetSyllabus', function ($rootScope, $scope, $state, GetSyllabus) {
  $scope.isCollapsed = false;
  GetSyllabus.lessons().then(function(data) {
    $scope.lessons = angular.fromJson(data.data);
  });
}]);
