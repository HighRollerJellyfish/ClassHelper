angular.module('classroom.gradebook', [])
.controller('GradebookController', function ($rootScope, $scope, $state, Classes, Grades, Assignments) {
  $rootScope.$watch('currentUser', function(){    
    


    Classes.getUserClasses($rootScope.currentUser.id)
    .then(function(data) {
      $scope.classes = data.data;
    });

  });

 

  // Grades.getClassGrades(1)
  // .then(function(data) {
  //   $scope.classGradesData = data.data

  //   for(var i = 0; i < $scope.classGradesData.length; i++) {
  //     $scope.assignments[$scope.classGradesData[i].assignment_title] = $scope.assignments[$scope.classGradesData[i].assignment_title] || {id: $scope.classGradesData[i].assignment_id, grades: []}
  //     $scope.assignments[$scope.classGradesData[i].assignment_title].grades.push({
  //       student_name: $scope.classGradesData[i].student_name,
  //       grade: $scope.classGradesData[i].grade,
  //       grade_id: $scope.classGradesData[i].grade_id
  //     })
  //   }
  //   console.log($scope.assignments);
  // })


  $scope.setActiveClass = function(class_id) {
    console.log("Active class: ", class_id);
    $scope.assignments = {};
    Grades.getClassGrades(class_id)
    .then(function(data) {
      $scope.classGradesData = data.data

      for(var i = 0; i < $scope.classGradesData.length; i++) {
        $scope.assignments[$scope.classGradesData[i].assignment_title] = $scope.assignments[$scope.classGradesData[i].assignment_title] || {id: $scope.classGradesData[i].assignment_id, grades: []}
        $scope.assignments[$scope.classGradesData[i].assignment_title].grades.push({
          student_name: $scope.classGradesData[i].student_name,
          grade: $scope.classGradesData[i].grade,
          grade_id: $scope.classGradesData[i].grade_id
        })
      }
    })
  }

  $scope.setActiveAssignment = function(assignment_id)


});