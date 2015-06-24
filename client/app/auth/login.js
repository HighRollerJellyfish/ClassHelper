// Implementing the login modal based on this resource:
// http://brewhouse.io/blog/2014/12/09/authentication-made-simple-in-single-page-angularjs-applications.html

angular.module('classroom.login', [])
.controller('LoginController', ['$scope', '$rootScope', '$state', 'Auth', function ($scope, $rootScope, $state, Auth) {
  $scope.cancel = function(){console.log('cancel')};

  $scope.submit = function (username, password) {
    console.log(username, password);
    // Use the Auth factory to login a user.
    // Auth.login makes an HTTP request to our api. Right now
    // It's getting back either a string as an error message or an
    // object with a data property. In the future, we should probably
    // have our api always return an object with a success/fail property
    // or something.
    Auth.login(username, password, function(res) {
      // We should have an if statement in here
      // If res.data.token
        // User is logged in, set localStorage, redirect, etc...
      // else
        // Flash why the login didn't work. No user found? Bad password?
      if (res.data.token) {
        $state.go('syllabus');
      } else {
        console.log('Error logging in.');
      }
    });
  };
}]);
