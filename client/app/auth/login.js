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
  $scope.submit = function (username, password) {

    // Use the Auth factory to login a user.
    // Auth.login makes an HTTP request to our api. Right now
    // It's getting back either a string as an error message or an
    // object with a data property. In the future, we should probably
    // have our api always return an object with a success/fail property
    // or something.
    Auth.login(username, password, function(res) {
      if (res.data.token) {
        $state.go('syllabus');
      } else {
        //TODO: Display error message to user.
        console.log('Error logging in.');
      }
    });
  };
}]);
