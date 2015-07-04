angular.module('classroom.gradebook', [])
.controller('GradebookController', function ($rootScope, $scope, $state, Classes, Grades, Assignments) {
  $rootScope.$watch('currentUser', function(){    
    


    Classes.getUserClasses($rootScope.currentUser.id)
    .then(function(data) {
      $scope.classes = data.data;
    });

  });

  $scope.activeClass = false;
  $scope.setActiveClass = function(class_id) {
    $scope.assignments = {};
    $scope.activeClass = true;
    $scope.activeAssignment = false;
    $scope.activeAssignmentGrades = [];

    Grades.getClassGrades(class_id)
    .then(function(data) {
      $scope.classGradesData = data.data

      for(var i = 0; i < $scope.classGradesData.length; i++) {
        $scope.assignments[$scope.classGradesData[i].assignment_id] = $scope.assignments[$scope.classGradesData[i].assignment_id] || {title: $scope.classGradesData[i].assignment_title, grades: []}

        $scope.assignments[$scope.classGradesData[i].assignment_id].grades.push({
          student_name: $scope.classGradesData[i].student_name,
          grade: $scope.classGradesData[i].grade,
          grade_id: $scope.classGradesData[i].grade_id,
          student_id: $scope.classGradesData[i].student_id,
          assignment_id: $scope.classGradesData[i].assignment_id
        })
      }
    })
  }

  $scope.setActiveAssignment = function(assignment_id) {
    $scope.activeAssignment = $scope.assignments[assignment_id].title;
    $scope.activeAssignmentGrades = [];
    $scope.activeAssignmentGrades = $scope.assignments[assignment_id].grades;
  }

  $scope.updateGrade = function(student_id, assignment_id, score) {
    gradeData = {
      student_id: student_id,
      assignment_id: assignment_id,
      score: score
    }

    Grades.add(gradeData);
  }

});