/**
This controller module is associated with the grades view and deals with grades data.
@class classroom.grades
*/

angular.module('classroom.calendar', [])
.controller('CalendarController', ['$rootScope', '$scope', 'Grades', 'Events', 'Assignments', function ($rootScope, $scope, Grades, Events, Assignments) {
  $rootScope.$watch('currentUser', function(){    
    if ($rootScope.currentUser){
      Events.getUserEvents($rootScope.currentUser.id).then(function(data) {
        window.eventsData = data;
      });

      Assignments.getUserAssignments($rootScope.currentUser.id).then(function(data) {
        window.assignmentsData = data;
      });
    }
  })
}]);