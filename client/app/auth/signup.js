angular.module('classroom.signup', [])
.controller('SignupController', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {
  $scope.cancel = function(){console.log('cancel')};

  $scope.submit = function (userData) {
    console.log(userData);
    Auth.signup(userData, function(user) {
      console.log("User signed in: ", user);
      $state.go('syllabus');
    });
  };
}]);
