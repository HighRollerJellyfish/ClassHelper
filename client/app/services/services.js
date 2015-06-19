angular.module('classroom.services', [])
.service('LoginModal', function ($modal, $rootScope) {
  function assignCurrentUser (user) {
    $rootScope.currentUser = user;
    return user;
  }

  return function() {
    var instance = $modal.open({
      templateUrl: 'auth/loginModal.html',
      controller: 'LoginModalController',
      controllerAs: 'LoginModalCtrl'
    })

    return instance.result.then(assignCurrentUser);
  };
})

.factory('Auth', function () {
  function login (username, password) {
    console.log('Login called in Auth factory');
  }

  return {
    login: login
  };
});