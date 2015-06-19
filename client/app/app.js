angular.module('classroom', [
  'classroom.attendance',
  'classroom.loginModal',
  'classroom.grades',
  'classroom.services',
  'classroom.syllabus',
  'ui.router',
  'ui.bootstrap'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/syllabus');
  $stateProvider
    .state('syllabus', {
      url: '/syllabus',
      templateUrl: 'app/syllabus/syllabus.html',
      data: {
        requireLogin: false // set this to true once auth is set up
      }
    })
    .state('grades', {
      url: '/grades',
      templateUrl: 'app/grades/grades.html',
      data: {
        requireLogin: false // set this to true once auth is set up
      }
    })
    .state('attendance', {
      url: '/attendance',
      templateUrl: 'app/attendance/attendance.html',
      data: {
        requireLogin: false // set this to true once auth is set up
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/auth/login.html',
      data: {
        requireLogin: false
      }
    })
})

.run(function ($rootScope, $state, LoginModal) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
      event.preventDefault();
      LoginModal()
      .then(function () {
        return $state.go(toState.name, toParams);
      })
      .catch(function () {
        return $state.go('login');
      }); 
    }
  });

});