/**
This module controls the states that are rendered on the main page.
@module classroom
@requires
*/

angular.module('classroom', [
  'classroom.attendance',
  'classroom.login',
  'classroom.signup',
  'classroom.grades',
  'classroom.AuthService',
  'classroom.LessonService',
  'classroom.GradeService',
  'classroom.AttendanceService',
  'classroom.syllabus',
  'classroom.landingPage',
  'ui.router',
  'ui.bootstrap',
  'textAngular'
])
.controller('LogoutController', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {
  $scope.logout = function () {
    delete $rootScope.currentUser;
    delete localStorage.jwtToken;
    $state.go('landing.login');
  };
}])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/syllabus');
  $stateProvider
    .state('syllabus', {
      url: '/syllabus',
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
    .state('landing', {
      url: '/landing',
      templateUrl: 'app/landing_page/landing_page.html',
      controller: 'LandingPageController',
      data: {
        requireLogin: false
      }
    })
    .state('landing.login', {
      url: '/login',
      templateUrl: 'app/auth/login.html',
      controller: 'LoginController'
    })
    .state('landing.signup', {
      url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'SignupController'
    })
}])

.run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {

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
        event.preventDefault();
        console.log("User must be logged in to view this page");
        $state.go('landing.login');
      }
    }
  });

}]);
