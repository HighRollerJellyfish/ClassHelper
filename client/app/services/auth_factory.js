/**
This factor module has the functions to deal with user authorization.  This is a factory instead of
a service to allow for easier client side integration.
@class classroom.AuthFactory
*/

angular.module('classroom.AuthFactory', [])

.factory('Auth', function ($http, $rootScope) {

  /**
  This service function posts a username and password, setting the $rootScope.currentUser and then executes the callback.
  @method login
  @param {String} username  User entered name.
  @param {String} password User entered password
  @param {Function} callback Function to be executred with the response
  */
  var login = function (username, password, cb) {
    $http({
      method: 'POST',
      url: '/users/login',
      data: {
        email: username,
        password: password
      }
    }).then(function(res) {
      window.localStorage['jwtToken'] = res.data.token;
      $rootScope.currentUser = {
        name: res.data.name,
        role: res.data.role,
        id: res.data.id
      };

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
  @param {Object} userData Entered user data.
  @param {Function} callback Callback to be executed after logging in.
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
  @param {Function} callback This callback is expected to be sending the user to the page the user was trying to get to.
  */
  var refreshUser = function (cb) {
    return $http({
      method: 'GET',
      url: '/users/refresh',
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    })
    .then(function (res) {
      //set rootscope userdata
      $rootScope.currentUser = {name: res.data.name, role: res.data.role, id: res.data.id};
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
});
