angular.module('classroom', [
  'classroom.attendance',
  'classroom.auth',
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
      templateUrl: './syllabus/syllabus.html',
      data: {
        requireLogin: true
      }
    })
    .state('grades', {
      url: '/grades',
      templateUrl: './grades/grades.html',
      data: {
        requireLogin: true
      }
    })
    .state('attendance', {
      url: '/attendance',
      templateUrl: './attendance/attendance.html',
      data: {
        requireLogin: true
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: './auth/login.html',
      data: {
        requireLogin: false
      }
    })
})

.run(function ($rootScope, $state, LoginModal) {
  console.log('running');


LoginModal()
      .then(function () {
        return $state.go(toState.name, toParams);
      })
      .catch(function () {
        return $state.go('login');
      }); 

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