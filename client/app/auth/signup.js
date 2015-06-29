/**
This controller module is associated with the signup page.
@class classroom.signup
*/

angular.module('classroom.signup', [])
.controller('SignupController', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {
  /**
  This method uses the service function Auth.signup and allows for a user to send data to the server.
  @method submit
  @param {Object} userData UserData object with username and password.
  */
  $scope.submit = function (userData) {
    Auth.signup(userData, function(user) {
      $state.go('syllabus');
    });
  };
}]);
