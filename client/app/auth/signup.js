angular.module('classroom.signup', [])
.controller('SignupController', ['$scope', 'Auth', function ($scope, Auth) {
  $scope.cancel = function(){console.log('cancel')};

  $scope.submit = function (userData) {
    console.log(userData);
    Auth.signup(userData, function(user) {
      console.log("User signed in: ", user);
      $scope.$close(user); // Not sure what this line does but it was here before...
    });
  };
}]);
