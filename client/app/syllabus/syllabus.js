angular.module('classroom.syllabus', ['classroom.services'])
.controller('SyllabusController', ['$scope', 'GetSyllabus', function ($scope, GetSyllabus) {
  console.log(GetSyllabus);
  GetSyllabus.lessons().then(function(data) {
    $scope.lessons = data;
  });
}]);
