/**
@module classroom.services
*/

angular.module('classroom.services', [])

.service('GetSyllabus', ['$http', '$rootScope', function ($http, $rootScope) {
  /**
  This service function gets the lessons from the server.
  @method lessons
  @return function Returns a $http() Get promise.
  */
  this.lessons = function() {
    return $http({
      url: '/lessons',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.jwtToken
      }
    });
  }
}])

.service('GetGrades', ['$http', '$rootScope', function ($http, $rootScope) {
  /**
  This service function gets all the grades data from the server.
  @method allGrades
  @return function Returns a $http() Get promise.
  */
  this.allGrades = function () {
    return $http({
      url: '/grades',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.jwtToken
      }
    });
  };
  /**
  This service function gets a user's grades from the server.
  @method gradesForUser
  @param username
  @return function Returns a $http() Get promise.
  */
  this.gradesForUser = function (username) {
    return $http({
      url: '/grades?student=' + username,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.jwtToken
      }
    });
  };
}])

.service('AddGrades', ['$http', '$rootScope', function ($http, $rootScope) {
  /**
  This service function posts grade data to the server.
  @method add
  @param gradeData
  @return function Returns a $http() Post promise.
  */
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
}])

.service('GetAttendance', ['$http', '$rootScope', function ($http, $rootScope) {
  /**
  This service function gets all attendance records from the server.
  @method allAttendance
  @return function Returns a $http() Get promise. 
  */
  this.allAttendance = function () {
    return $http({
      url: '/attendance',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.jwtToken
      }
    });
  };
  /**
  This service function gets an individual user's attendance from the server.
  @method attendanceForUser
  @param username 
  @return function Returns a $http() Get promise.
  */
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
}])

.service('AddAttendance', ['$http', '$rootScope', function ($http, $rootScope) {
  /**
  This method is a service function that posts attendance data to the server.
  @method add
  @param attendanceData
  @return function Returns $http() Post promise.
  */
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
}])

.service('Auth', ['$http', '$rootScope', function ($http, $rootScope) {

  /**
  This service function posts a username and password, setting the $rootScope.currentUser and then executes the callback.
  @method login
  @param username
  @param password
  @param callback
  */
  this.login = function (username, password, cb) {
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
  var AuthService = this;
  this.signup = function (userData, cb) {
    return $http({
      method: 'POST',
      url: '/users/signup',
      data: userData
    })
    .then(function (res) {
      //TODO: instead of calling login() to send a second request to the server, have the server
      //      create a new token when we call signup and respond with the token.
      AuthService.login(userData.username, userData.password, cb);
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
  this.refreshUser = function (cb) {
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
  };
}]);
