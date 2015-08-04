/**
This service module has functions to deal with lesson data.
@class classroom.LessonService
*/


angular.module('classroom.LessonService', [])

.service('Lessons', function ($http, $rootScope) {
  /**
  This service function gets the lessons from the server.
  @method getAll
  @return {Function} Returns a $http() Get promise.
  */

  this.currentClassID = null;

  this.setCurrentClassID = function(class_id) {
    console.log("setCurrentClassID Called", class_id);
    this.currentClassID = class_id;
  };

  this.getCurrentClassID = function() {
    console.log("getCurrentClassID Called", this.currentClassID);
    return this.currentClassID;
  };

  this.getClassLessons = function(class_id) {
    return $http({
      url: '/lessons/?class_id=' + class_id,
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  };

  this.saveClassLesson = function(lesson) {
    return $http.post('/lessons', lesson);
  };
});
