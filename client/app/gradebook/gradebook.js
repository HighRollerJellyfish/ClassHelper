angular.module('classroom.gradebook', [])
.controller('GradebookController', function ($rootScope, $scope, $state, Classes, Grades) {
  $rootScope.$watch('currentUser', function(){    
    // console.log($rootScope.currentUser);
    // console.log($rootScope.currentUser.id);

    Classes.getUserClasses($rootScope.currentUser.id)
    .then(function(data) {
      $rootScope.classes = data.data;
    });

  });

  $scope.getClassGrades = function(class_id) {
    alert(class_id);
  };


});