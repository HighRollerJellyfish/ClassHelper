angular.module('classroom.services', [])

.service('GetSyllabus', function($http, $rootScope) {
  this.lessons = function() {
    return $http({
      url: 'http://localhost:3000/lessons',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.jwtToken
      }
    });
  }
})

.factory('Auth', function ($http, $rootScope) {

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
      console.log(res.data.token);
      window.localStorage['jwtToken'] = res.data.token;
      window.localStorage['user'] = JSON.stringify({
        username: res.data.username,
        role: res.data.role,
        token: res.data.token
      });
      $rootScope.currentUser = {
        username: res.data.username,
        role: res.data.role,
        token: res.data.token
      }
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
    .then(function (res) {
      //TODO: instead of calling login() to send a second request to the server, have the server
      //      create a new token when we call signup and respond with the token.
      login(userData.username, userData.password, cb);
    })
    .catch(function (err) {
      console.log('ERROR: User already exists.');
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
