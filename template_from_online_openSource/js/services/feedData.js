app.factory('feedData', ['$http', function($http) { 
  
  $http.get('http://www.speffs.one/SPE/getpost.php')
  .success(function(data,status, headers, config){
    $scope.things = data; 
  }).
  error(function(data, status, headers, config){
    window.alert("Failure!"); 
  });
  
}]);