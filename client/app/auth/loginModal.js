// Implementing the login modal based on this resource:
// http://brewhouse.io/blog/2014/12/09/authentication-made-simple-in-single-page-angularjs-applications.html

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