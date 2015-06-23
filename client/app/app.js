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
.config(function ($stateProvider, $urlRouterProvider) {
  // $urlRouterProvider.otherwise('/syllabus');
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

.run(function ($rootScope, $state) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    console.log('user', $rootScope.currentUser);
    var requireLogin = toState.data.requireLogin;
    if (requireLogin && !$rootScope.currentUser) {
      console.log("User must be logged in to view");
      $state.go('landing.login');
    }
  });

});
