angular.module('classroom.signup', [])
.controller('SignupController', ['$scope', 'Auth', function ($scope, Auth) {
  $scope.cancel = function(){console.log('cancel')};

  $scope.submit = function (username, password) {
    console.log(username, password);
    Auth.signup(username, password)
      .then(function (user) {
        $scope.$close(user);
      });
  };
}]);