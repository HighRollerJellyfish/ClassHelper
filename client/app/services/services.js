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

// We need some way to store user data after login. The token returned
// by the server won't have any user information. It can only be decrypted
// by the server.
// http://stackoverflow.com/questions/14206492/how-do-i-store-a-current-user-context-in-angular
  var currentUser = {};

  function login (username, password, cb) {
    $http({
      method: 'POST',
      url: '/users/login',
      data: {
        username: username,
        password: password
      }
    }).then(function(res) {
      // The res sent to callback is what is returned by our /users/login api
      // It is an object which contains a token, username,
      // and role (for now. we'll update this later).
      // Right now, the callback is storing the user info in localStorage
      // but perhaps that logic would be better placed here.
      cb(res);
    });
  };

  function signup (userData, cb) {
    return $http({
      method: 'POST',
      url: '/users/signup',
      data: userData
    })
    .then(function (user) {
      cb(user);
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
