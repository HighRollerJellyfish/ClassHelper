angular.module('classroom.attendance', [])
.controller('AttendanceController', ['$rootScope', '$scope', '$state', 'GetAttendance', 'AddAttendance', function ($rootScope, $scope, $state, GetAttendance, AddAttendance) {
  $scope.isCollapsed = false;

  $scope.isTeacher = function () {
    return $rootScope.currentUser.role === 'teacher';
  }

  $scope.addAttendance = function (attendanceData) {
    console.log(attendanceData);
    AddAttendance.add(attendanceData);
  }

  if ($rootScope.currentUser.role === 'teacher') {
    GetAttendance.allAttendance().then(function(data) {
      $scope.attendance = angular.fromJson(data.data);
    });
  } else {
    GetAttendance.attendanceForUser($rootScope.currentUser.username).then(function(data) {
      $scope.attendance = angular.fromJson(data.data);
    });
  }
}]);