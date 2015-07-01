/**
This is the controller module associated with the login page.
@class classroom.login
*/

angular.module('classroom.login', [])
.controller('LoginController', ['$scope', '$rootScope', '$state', 'Auth', function ($scope, $rootScope, $state, Auth) {
  /**
  This method uses the services function of Auth.log to allow a user to login to the classroom sylabus.
  @method submit
  @param {String} username Username to be entered into the database.
  @param {String} password Password associated with the Username to be added into the database.
  */

  $scope.email = "";
  $scope.password = "";

  $scope.submit = function (email, password) {

    // Use the Auth factory to login a user.
    // Auth.login makes an HTTP request to our api. Right now
    // It's getting back either a string as an error message or an
    // object with a data property. In the future, we should probably
    // have our api always return an object with a success/fail property
    // or something.
    Auth.login(email, password, function(res) {
      if (res.data.token) {
        $state.go('syllabus');
      } else {
        //TODO: Display error message to user.
        console.log('Error logging in.');
      }
    });
  };


  $scope.formValidation = function() {
    // Check for valid email
    if ( !(($scope.email || "").match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i))){
      return "Please enter a valid email address";
    }

    // Check for valid password of at least 4 characters
    else if ($scope.password === "" || $scope.password.length < 4) {
      return "Please enter a valid password of at least 4 characters";
    }

    return "";
  };
}]);
