/**
@module classroom.signup
*/

angular.module('classroom.signup', [])
.controller('SignupController', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {
  
  /**
  This method allows a user to cancel submitting a new user data and console logs 'cancel'.
  @method cancel
  */
  $scope.cancel = function(){console.log('cancel')};

  /**
  This method uses the service function Auth.signup and allows for a user to send data to the server.
  @method submit
  @param userData
  */
  $scope.submit = function (userData) {
    Auth.signup(userData, function(user) {
      console.log("User signed in: ", user);
      $state.go('syllabus');
    });
  };
}]);
