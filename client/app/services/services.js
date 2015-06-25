angular.module('classroom.services', [])

.service('GetSyllabus', function($http, $rootScope) {
  this.lessons = function() {
    return $http({
      url: '/lessons',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.jwtToken
      }
    });
  }
})

.service('GetGrades', function($http, $rootScope) {
  this.allGrades = function () {
    return $http({
      url: '/grades',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.jwtToken
      }
    });
  };

  this.gradesForUser = function (username) {
    return $http({
      //this gets grades for all users right now. it should be '/grades/' + username;
      url: '/grades?student=' + username,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.jwtToken
      }
    });
  };
})

.service('AddGrades', function($http, $rootScope) {
  this.add = function (gradeData) {
    return $http({
      method: 'POST',
      url: '/grades',
      data: gradeData,
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.jwtToken
      }
    });
  }
})

.service('GetAttendance', function($http, $rootScope) {
  this.allAttendance = function () {
    return $http({
      url: '/attendance',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.jwtToken
      }
    });
  };

  this.attendanceForUser = function (username) {
    return $http({
      //this gets grades for all users right now. it should be '/grades/' + username;
      url: '/attendance?student=' + username,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.jwtToken
      }
    });
  };
})

.service('AddAttendance', function($http, $rootScope) {
  this.add = function (attendanceData) {
    return $http({
      method: 'POST',
      url: '/attendance',
      data: attendanceData,
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

  function refreshUser (cb) {
    console.log('refreshuser in auth', window.localStorage.jwtToken);
    return $http({
      method: 'GET',
      url: '/users/refresh',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.jwtToken
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
  }

  return {
    login: login,
    signup: signup,
    refreshUser: refreshUser
  };
});
