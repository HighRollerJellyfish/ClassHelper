angular.module('classroom.syllabus', ['classroom.services'])
.controller('SyllabusController', function ($scope, GetSyllabus) {
  GetSyllabus.lessons().then(function(data) {
    $scope.lessons = data;
  });


});