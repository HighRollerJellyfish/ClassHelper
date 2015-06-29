angular.module('classroom.syllabus', ['classroom.services','textAngular'])

.controller('SyllabusController', ['$rootScope', '$scope', '$state', 'GetSyllabus', 'AddLesson', function ($rootScope, $scope, $state, GetSyllabus, AddLesson) {

  $scope.isCollapsed = false;

  $scope.isTeacher = function () {
   return $rootScope.currentUser.role === 'teacher'; 
  }

  $scope.removeQuotes = function (content) {
    content = content.replace(/^"(.*)"$/, '$1');
    console.log(content);
    return content;

  }

  GetSyllabus.lessons().then(function(data) {
    $scope.lessons = angular.fromJson(data.data);
  });
}])


.controller('textController', function($rootScope, $scope, $state, GetSyllabus, AddLesson) { 
  $scope.html = '<h3> Add and Edit Lessons here !</h3>';
  $scope.htmlcontent = $scope.orightml;

  $scope.addLesson = function(lessonData) {
    console.log(lessonData);
    AddLesson.add(lessonData);
  }

});
