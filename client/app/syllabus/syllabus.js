angular.module('classroom.syllabus', ['classroom.services','textAngular'])

.controller('SyllabusController', ['$rootScope', '$scope', '$state', 'GetSyllabus', function ($rootScope, $scope, $state, GetSyllabus) {
  $scope.isCollapsed = false;
  GetSyllabus.lessons().then(function(data) {
    $scope.lessons = angular.fromJson(data.data);
  });
}])


.controller('textController', function($rootScope, $scope, $state, GetSyllabus) {
  $scope.orightml = '<h3> Add and Edit Lessons here !</h3>';
  $scope.htmlcontent = $scope.orightml;
  $scope.disabled = false;
});
