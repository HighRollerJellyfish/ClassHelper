angular.module('classroom', [
  'classroom.attendance',
  'classroom.auth',
  'classroom.grades',
  'classroom.services',
  'classroom.syllabus',
  'ui.router'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/syllabus');
  $stateProvider
    .state('syllabus', {
      url: '/syllabus',
      templateUrl: './syllabus/syllabus.html'
    })
    .state('grades', {
      url: '/grades',
      templateUrl: './grades/grades.html'
    })
    .state('attendance', {
      url: '/attendance',
      templateUrl: './attendance/attendance.html'
    })
});
