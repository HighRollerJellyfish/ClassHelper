angular.module('classroom.gradebook', [])
.controller('GradebookController', function ($rootScope, $scope, $state, Classes, Grades, Assignments) {
  $rootScope.$watch('currentUser', function(){    
    $scope.assignments = [];


    Classes.getUserClasses($rootScope.currentUser.id)
    .then(function(data) {
      $scope.classes = data.data;
    });

  });

  Assignments.getClassAssignments(1)
  .then(function(data) {
    console.log("AAAAAAAAAAA");
    console.log(data.data);
  });

 

  Grades.getClassGrades(1)
  .then(function(data) {
    $scope.classGradesData = data.data

    for(var i = 0; i < $scope.classGradesData.length; i++) {
      console.log("CCC")
      $scope.assignments[$scope.classGradesData[i].assignment_title] = $scope.classGradesData[i].assignment_id;
    }
    console.log($scope.assignments);
  })


});