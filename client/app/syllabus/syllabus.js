angular.module('classroom.syllabus', ['textAngular'])

.controller('SyllabusController', ['$rootScope', '$scope', '$state', 'Lessons', function ($rootScope, $scope, $state, Lessons) {

  $scope.isCollapsed = false;

  $scope.isTeacher = function () {
   return $rootScope.currentUser.role === 'teacher'; 
  }

  $scope.removeQuotes = function (content) {
    content = content.replace(/^"(.*)"$/, '$1');
    console.log(content);
    return content;

  }

  Lessons.getAll().then(function(data) {
    $scope.lessons = angular.fromJson(data.data);
  });
}])


.controller('textController', function($rootScope, $scope, $state, Lessons) { 
  $scope.html = '<h3> Add and Edit Lessons here !</h3>';
  $scope.htmlcontent = $scope.orightml;

  $scope.addLesson = function(lessonData) {
    console.log(lessonData);
    Lessons.add(lessonData);
  }

});
