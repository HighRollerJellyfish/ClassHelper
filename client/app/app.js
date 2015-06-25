angular.module('classroom', [
  'classroom.attendance',
  'classroom.login',
  'classroom.signup',
  'classroom.grades',
  'classroom.services',
  'classroom.syllabus',
  'classroom.landingPage',
  'ui.router',
  'ui.bootstrap'
])
.controller('LogoutController', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {
  $scope.logout = function () {
    delete $rootScope.currentUser;
    delete localStorage.jwtToken;
    $state.go('landing.login');
  };
}])

.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/syllabus');
  $stateProvider
    .state('syllabus', {
      url: '/syllabus',
      templateUrl: 'app/syllabus/syllabus.html',
      controller: 'SyllabusController',
      data: {
        requireLogin: true // set this to true once auth is set up
      }
    })
    .state('grades', {
      url: '/grades',
      templateUrl: 'app/grades/grades.html',
      controller: 'GradesController',
      data: {
        requireLogin: true // set this to true once auth is set up
      }
    })
    .state('attendance', {
      url: '/attendance',
      templateUrl: 'app/attendance/attendance.html',
      controller: 'AttendanceController',
      data: {
        requireLogin: true // set this to true once auth is set up
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
      controller: 'LoginController',
      data: {
        requireLogin: false
      }
    })
    .state('landing.signup', {
      url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'SignupController',
      data: {
        requireLogin: false
      }
    })
})

.run(function ($rootScope, $state, Auth) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    if (requireLogin && !$rootScope.currentUser) {
      // if the user refreshes, $rootScope is cleared, but localStorage is not, so check if
      // they still have a token in localStorage
      if (localStorage.jwtToken) {
        // retrieve user info associated with this token and reset $rootScope.currentUser
        Auth.refreshUser(function () {
          $state.go(toState);
        });
      } else {
        event.preventDefault();
        console.log("User must be logged in to view");
        $state.go('landing.login');
      }
    }
  });

});
