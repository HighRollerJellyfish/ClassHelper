/**
This module controls the states that are rendered on the main page.
@class classroom
*/

angular.module('classroom', [
  'classroom.calendar',
  'classroom.attendance',
  'classroom.login',
  'classroom.signup',
  'classroom.grades',
  'classroom.gradebook',
  'classroom.calendar',
  'classroom.AuthFactory',
  'classroom.LessonService',
  'classroom.GradeService',
  'classroom.ClassService',
  'classroom.AssignmentService',
  'classroom.EventService',
  'classroom.AttendanceService',
  'classroom.syllabus',
  'ui.router',
  'ui.bootstrap',
  'textAngular'
])

// .controller('MenuCtrl', ['$scope', '$rootScope', 'ClassService', function($scope, $rootScope, ClassService) {
//   $scope.classes = Classes.getUserClasses(1);
// }])

.controller('MenuCtrl', ['$scope', '$rootScope', 'Classes', 'Events', 'Assignments', function($scope, $rootScope, Classes, Events, Assignments) {
  $scope.classes={};

  $rootScope.$watch('currentUser', function() {

    if($rootScope.currentUser) {
      var classes = Classes.getUserClasses($rootScope.currentUser.id);
      classes.success(function(data) {
        console.log("List of returned user classes:", data);
        $scope.classes = data;
      })
      .error(function(data) {
        console.error("Error getting data:", data);
      });

      var events = Events.getUserEvents($rootScope.currentUser.id);
      events.success(function(data) {
        sessionStorage.setItem("eventsData", JSON.stringify(data));
      })
      .error(function(data) {
        console.error("Error getting data:", data);
      });

      var assignments = Assignments.getUserAssignments($rootScope.currentUser.id);
      assignments.success(function(data){
        sessionStorage.setItem("assignmentsData", JSON.stringify(data));
      })
      .error(function(data){
        console.error("Error getting data:", data)
      });
    }

  });

  // if($rootScope.currentUser) {
    // setTimeout(function() {
      // console.log("Current User defined, running classes query");
      // var classes = Classes.getUserClasses($rootScope.currentUser.id);
      // classes.success(function(data) {
      //   console.log("List of returned user classes:", data);
      //   $scope.classes = data;
      // })
      // .error(function(data) {
      //   console.error("Error getting data:", data);
      // });
    // }.bind($scope), 500);

    // console.log("Current User defined, running classes query");
    // var classes = Classes.getUserClasses($rootScope.currentUser.id);
    // classes.success(function(data) {
    //   console.log("List of returned user classes:", data);
    //   $scope.classes = data;
    // })
    // .error(function(data) {
    //   console.error("Error getting data:", data);
    // });


  // }
  // else {
  //   console.log("Current User not defined, not running classes query");
  // }

}])

.controller('LogoutController', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {

  /**
  This function logs out the currentUser by deleting their info and jwtToken from the browser.
  @method logout
  */

  $scope.logout = function () {
    delete $rootScope.currentUser;
    delete localStorage.jwtToken;
    //$state.go('login');
    window.location.reload('#/login');
  };
}])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/grades');
  $stateProvider

    .state('syllabus', {
      url: '/syllabus/:class_id',
      // params: ['class_id'],
      templateUrl: 'app/syllabus/syllabus.html',
      controller: 'SyllabusController',
      data: {
        requireLogin: true
      }
    })

    .state('grades', {
      url: '/grades',
      templateUrl: 'app/grades/grades.html',
      controller: 'GradesController',
      data: {
        requireLogin: true
      }
    })
    .state('attendance', {
      url: '/attendance',
      templateUrl: 'app/attendance/attendance.html',
      controller: 'AttendanceController',
      data: {
        requireLogin: true
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/auth/login.html',
      controller: 'LoginController',
      data: {
        requireLogin: false
      }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'SignupController',
      data: {
        requireLogin: false
      }
    })
    .state('calendar', {
      url: '/calendar',
      templateUrl: 'app/calendar/calendar.html',
      controller: 'CalendarController',
      data: {
        requireLogin: true
      }
    })
    .state('gradebook', {
      url: '/gradebook',
      templateUrl: 'app/gradebook/gradebook.html',
      controller: 'GradebookController',
      data: {
        requireLogin: true
      }
    })
}])

.controller('ModalDemoCtrl', function ($scope, $modal, $log, Lessons) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.assignment = {};

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        },
        assignment: function() {
          return $scope.assignment;
        },
        lessons: function() {
          return Lessons.getClassLessons(1)
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

})

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, lessons, Assignments, Lessons) {

  $scope.items = items;
  $scope.selected = null;
  $scope.lessons = lessons.data;
  $scope.assignment = {};
  $scope.form = {};

  $scope.ok = function () {
    //$modalInstance.close($scope.selected.item);
    var assignment = $scope.assignment;
    console.dir(assignment);
    assignment.class_id = Lessons.getCurrentClassID();
    console.log("Assignment class ID:", assignment.class_id);
    assignment.due_date = moment($scope.form.due_date_input).format("YYYY-MM-DD HH:mm:ss");
    console.log(assignment.due_date);
    Assignments.saveAssignment(assignment)
      .success(function(data) {
        console.log("Success saving assignment:", data);
        $modalInstance.close(data);
      })
      .error(function(data) {
        console.error("ERROR SAVING ASIGNMENT!");
      });
    //Assignments.saveAssignment()
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})

.run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {

  $rootScope.checkStateRoute = function(state) {
    if($state.is(state)) {
      return true;
    }
    return false;
  };

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    // check if user is logged in
    if (requireLogin && !$rootScope.currentUser) {
      // if the user refreshes, $rootScope is cleared, but localStorage persists, so check if
      // they still have a token in localStorage
      if (localStorage.jwtToken) {
        // retrieve user info associated with this token and reset $rootScope.currentUser
        Auth.refreshUser(function () {
          // continue to destination
          $state.go(toState);
        });
      } else {
        // there is no token in local storage, so this was not a refresh.
        // the user is not logged in, so send them to the login page
        event.preventDefault();
        console.log("User must be logged in to view this page");
        //$state.go('login');
        window.location.replace('#/login');
        location.reload();
      }
    }
  });

}]);
