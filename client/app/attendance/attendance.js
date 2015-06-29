/**
This module contains the controller for the attendance page and deals with the logic on how to display attendance data.
@class classroom.attendance
*/

angular.module('classroom.attendance', [])
.controller('AttendanceController', ['$rootScope', '$scope', '$state', 'Attendance', function ($rootScope, $scope, $state, Attendance) {

/**
This method tests if a user has the role teacher.
@method isTeacher
@return {Boolean}
*/
  $scope.isTeacher = function () {
    return $rootScope.currentUser.role === 'teacher';
  };
/**
This method adds attendance data to the database.
@method addAttendance
@param {Object} attendanceData  data to be added to database.
*/
  $scope.addAttendance = function (attendanceData) {
    Attendance.add(attendanceData);
  };
  
  //checks if the user has the role teacher and returns all the attendance
  //records.  If the user's role is not teacher, then it returns just the
  //attendance of the user.

  //To display attendance data for teachers and individual users, D3 and Dimple.js
  //was used.  Refer to dimplejs.org for documentation on how to use dimple.
  if ($rootScope.currentUser.role === 'teacher') {
    Attendance.getAll().then(function(data) {
      var svg = dimple.newSvg(".attendance", 1000, 800);
      var attendanceData = angular.fromJson(data.data);
      var myChart = new dimple.chart(svg, attendanceData);

      var x = myChart.addCategoryAxis("x", "date");
      x.addOrderRule("date");
      myChart.addCategoryAxis("y", "student");
      myChart.addColorAxis("presence",["#FF0000","#0000FF"]);
      myChart.addSeries(null, dimple.plot.bubble);
      myChart.draw();
    });
  } else {
    Attendance.getForUser($rootScope.currentUser.username).then(function(data) {
      var svg = dimple.newSvg(".attendance", 1000, 800);
      var attendanceData = angular.fromJson(data.data);
      var myChart = new dimple.chart(svg, attendanceData);

      var x = myChart.addCategoryAxis("x", "date");
      x.addOrderRule("date");
      myChart.addCategoryAxis("y", "student");
      myChart.addColorAxis("presence",["#FF0000","#0000FF"]);
      myChart.addSeries(null, dimple.plot.bubble);
      myChart.draw();
    });
  }
}]);