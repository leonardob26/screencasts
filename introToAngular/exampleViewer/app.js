var app = angular.module('exampleViewerApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'example-list.html',
      controller: 'ExampleListCtrl'
    }).
    when('/:exampleNumber', {
      templateUrl: 'example-detail.html',
      controller: 'ExampleDetailCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
});

app.factory('examples', function($http){

  function getData(callback){
    $http({
      method: 'GET',
      url: '../examples.json',
      cache: true
    }).success(callback);
  }

  return {
    list: getData,
    find: function(exampleNumber, callback){
      getData(function(data) {
        var index = parseInt(exampleNumber) - 1;
        callback(data[index]);
      });
    }
  };
});

app.controller('ExampleListCtrl', function ($scope, examples){
  examples.list(function(examples) {
    $scope.examples = examples;
  });
});

app.controller('ExampleDetailCtrl', function ($scope, $routeParams, examples){
  examples.find($routeParams.exampleNumber, function(example) {
    $scope.example = example;
  });
});

app.controller('FileViewerCtrl', function ($scope, $http){
  var path = '../examples/snapshots/' + $scope.example.name + '/' + $scope.file;
  console.log(path);
  $http.get(path, function(data){
    console.log(data);
    $scope.content = data;
  });
});
