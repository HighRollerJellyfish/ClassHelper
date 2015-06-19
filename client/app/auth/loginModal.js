angular.module('classroom.loginModal', [])
.controller('LoginModalController', ['$scope', 'Auth', function ($scope, Auth) {
  this.cancel = $scope.$dismiss;

  this.submit = function (username, password) {
    Auth.login(username, password)
      .then(function (user) {
        $scope.$close(user);
      });
  };
})];