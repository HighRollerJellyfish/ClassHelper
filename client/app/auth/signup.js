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

  // Set initial field values to avoid validation errors
  $scope.fields = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  };
  $scope.passwordConfirm = "";

  $scope.submit = function (userData) {
    Auth.signup(userData, function(user) {
      $state.go('syllabus');
    });
  };

    $scope.formValidation = function() {
      // Check for valid first and last name
      if ($scope.fields.first_name === "" || $scope.fields.last_name === "") {
        return "Please enter valid name";
      }
      // Check for valid email
      else if ( !(($scope.fields.email || "").match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i))){
        return "Please enter a valid email address";
      }

      // Check for valid password of at least 4 characters
      else if ($scope.fields.password === "" || $scope.fields.password.length < 4) {
        return "Please enter a valid password of at least 4 characters";
      }

      // Check for password confirmation
      else if ($scope.passwordConfirm === "") {
        return "Please confirm password";
      }

      else if ($scope.fields.password !== $scope.passwordConfirm) {
        return "Please make sure passwords match";
      }

      return "";
    };
}]);
