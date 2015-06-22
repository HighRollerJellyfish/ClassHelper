angular.module('classroom.services', [])
.service('LoginModal', function ($modal, $rootScope) {
  function assignCurrentUser (user) { 
    $rootScope.currentUser = user;
    return user;
  }

  return function() {
    var instance = $modal.open({
      templateUrl: './index.html',
      controller: 'LoginModalController',
      controllerAs: 'LoginModalController'
    })

    return instance.result.then(assignCurrentUser);
  };
})

.service('GetSyllabus', function($http) {
  this.lessons = function() {
    return $http({
      url: 'http://localhost:3000/lessons',
      method: 'GET'
    });
  }
})

.factory('Auth', function ($http) {
  function login (username, password) {
    return $http({
      method: 'POST',
      url: '/users/login',
      data: {
        username: username,
        password: password
      }
    })
    .then(function (res) {
      return res.data.token;
    });
  };

  function signup (username, password) {
    return $http({
      method: 'POST',
      url: '/users/signup',
      data: {
        username: username,
        password: password
      }
    })
    .then(function (res) {
      return res.data.token;
    });
  };

  function logout (username) {

  };

  return {
    login: login,
    logout: logout,
    signup: signup
  };
});
