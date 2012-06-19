'use strict';

/* Controllers */

function TodoCtrl($scope) {
  var socket = io.connect();
  socket.on('change', function(obj) {
    $scope.todos = obj;
    $scope.$apply();
  });

  $scope.addTodo = function() {
    $scope.todos.push({text:$scope.todoText, done:false});
    $scope.todoText = '';
    socket.emit('change', $scope.todos);
  };

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
    socket.emit('change', $scope.todos);
  };

  $scope.change = function() {
    socket.emit('change', $scope.todos);
  };
}
