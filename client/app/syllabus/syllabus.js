/**
This controller module is associated with the data to deal with the syllabus view.
@class classroom.syllabus
*/

angular.module('classroom.syllabus', ['textAngular'])

.controller('SyllabusController', ['$rootScope', '$scope', '$state', 'Lessons', function ($rootScope, $scope, $state, Lessons) {

  $scope.isCollapsed = false;
  /**
  This function sets the current user as a teacher.
  @method isTeacher
  */
  $scope.isTeacher = function () {
   return $rootScope.currentUser.role === 'teacher'; 
  }

  /**
  This function removes quotes from the entered content.
  @method removeQuotes
  @param {String} content Entered content from user.
  @return {String} content Returned content with quotes removed.
  */
  $scope.removeQuotes = function (content) {
    content = content.replace(/^"(.*)"$/, '$1');
    return content;

  }

  Lessons.getAll().then(function(data) {
    $scope.lessons = angular.fromJson(data.data);
  });
}])


.controller('textController', function($rootScope, $scope, $state, Lessons) { 
  $scope.html = '<h3> Add and Edit Lessons here !</h3>';
  $scope.htmlcontent = $scope.orightml;
  /**
  This function adds user added lesson content.
  @method addLesson
  @param {String} lessonData Entered content from user.
  */

  $scope.addLesson = function(lessonData) {
    Lessons.add(lessonData);
  }

});
