angular.module('classroom.syllabus', ['classroom.services'])

.controller('SyllabusController', function ($scope, GetSyllabus) {
  $scope.isCollapsed = false;
  GetSyllabus.lessons().then(function(data) {
    $scope.lessons = angular.fromJson(data.data);
  });
});

