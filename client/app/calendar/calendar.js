/**
This controller module is associated with the grades view and deals with grades data.
@class classroom.grades
*/

angular.module('classroom.calendar', [])
.controller('CalendarController', ['$rootScope', '$scope', 'Grades', 'Events', 'Assignments', function ($rootScope, $scope, Grades, Events, Assignments) {
 
  $rootScope.$watch('currentUser', function() {
    if($rootScope.currentUser) {
      var events = Events.getUserEvents($rootScope.currentUser.id);
      events.success(function(data) {
        console.log("List of returned user events:", data);
        window.eventsData = data;
      })
      .error(function(data) {
        console.error("Error getting data:", data);
      });

      var assignments = Assignments.getUserAssignments($rootScope.currentUser.id);
      assignments.success(function(data){
        console.log("List of returned user assignments", data);
        window.assignmentsData = data;
      })
      .error(function(data){
        console.error("Error getting data:", data)
      });
    }

  });




  // $rootScope.$watch('currentUser', function(){    
  //   if ($rootScope.currentUser){
  //     Events.getUserEvents($rootScope.currentUser.id).then(function(data) {
  //       window.eventsData = data;
  //     });

  //     Assignments.getUserAssignments($rootScope.currentUser.id).then(function(data) {
  //       window.assignmentsData = data;
  //     });
  //   }
  // })


}]);