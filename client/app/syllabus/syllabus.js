/**
This controller module is associated with the data to deal with the syllabus view.
@class classroom.syllabus
*/

angular.module('classroom.syllabus', ['textAngular'])

.controller('SyllabusController', function ($rootScope, $scope, $state, Lessons, $stateParams, $modal, Assignments, Lessons) {

  console.log("$stateParams", $stateParams);
  $scope.isCollapsed = false;

  var class_id = $stateParams.class_id;
  $scope.class_id = class_id;

  Assignments.getClassAssignments(class_id).then(function(data){
    $scope.assignments = data.data;
  });

  setInterval(function() {
    Assignments.getClassAssignments(class_id).then(function(data){
      $scope.assignments = data.data;
    });
  }, 1000);

  Lessons.setCurrentClassID(class_id);

  //Filter function to convert a string into a date
  $scope.sortByAssignment = function(assignment) {
    var date = moment(assignment.start).toDate();
    return date;
  };

  /**
  This function sets the current user as a teacher.
  @method isTeacher
  */
  $scope.isTeacher = function () {
   return $rootScope.currentUser && $rootScope.currentUser.role === 'teacher';
 };

  /**
  This function removes quotes from the entered content.
  @method removeQuotes
  @param {String} content Entered content from user.
  @return {String} content Returned content with quotes removed.
  */
  $scope.removeQuotes = function (content) {
    content = content.replace(/^"(.*)"$/, '$1');
    return content;
  };

  Lessons.getClassLessons($stateParams.class_id)
    .success(function(data) {
      console.log("Lessons.getClassLessons(1):", data);
      $scope.lessons = data;
    })
    .error(function(data) {
      $scope.lessons = "ERROR:" + data;
    });

  setInterval(function() {
    Lessons.getClassLessons($stateParams.class_id)
      .success(function(data) {
        console.log("Lessons.getClassLessons(1):", data);
        $scope.lessons = data;
      })
      .error(function(data) {
        $scope.lessons = "ERROR:" + data;
      });
  },1000);
})

.controller('textController', function($rootScope, $scope, $state, Lessons) {
  $scope.html = '<h3> Add and Edit Lessons here !</h3>';
  $scope.htmlcontent = $scope.orightml;
  /**
  This function adds user added lesson content.
  @method addLesson
  @param {String} lessonData Entered content from user.
  */

  $scope.addLesson = function(lessonData, class_id) {
    lessonData.class_id = class_id;

    console.log("addLesson data:", lessonData);
    console.log("class_id:", class_id);

    Lessons.saveClassLesson(JSON.stringify(lessonData))
      .success(function(data) {
        console.log("Success:", data);
      })
      .error(function(data) {
        console.error("Error with:", data);
      })
  };
});
