angular.module('classroom.AuthFactory', [])

.factory('Auth', ['$http', '$rootScope', function ($http, $rootScope) {

  /**
  This service function posts a username and password, setting the $rootScope.currentUser and then executes the callback.
  @method login
  @param username
  @param password
  @param callback
  */
  var login = function (username, password, cb) {
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
      $rootScope.currentUser = {
        username: res.data.username,
        role: res.data.role,
      }
      // The res sent to callback is what is returned by our /users/login api
      // It is an object which contains a token, username,
      // and role (for now. we'll update this later).
      // Right now, the callback is storing the user info in localStorage
      // but perhaps that logic would be better placed here.
      cb(res);
    });
  };
  
  /**
  This service function posts a new user's data, calls login() with userData and then executes the callback.
  @method signup
  @param userData
  @param callback
  */
  var signup = function (userData, cb) {
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

  /**
  This service function resets the $rootScope.currentUser from the auth token when there is a refresh and then executes the callback.
  @method refreshUser
  @param callback This callback is expected to be sending the user to the page the user was trying to get to.
  */
  var refreshUser = function (cb) {
    console.log('refreshuser in auth', window.localStorage.jwtToken);
    return $http({
      method: 'GET',
      url: '/users/refresh',
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    })
    .then(function (res) {
      //set rootscope userdata
      $rootScope.currentUser = {username: res.data.username, name: res.data.name, role: res.data.role};
      cb();
    })
    .catch(function (err) {
      console.log('ERROR: Unable to refresh user credentials.');
    });
  };

  return {
    login: login,
    signup: signup,
    refreshUser: refreshUser
  };
}]);
