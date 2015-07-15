app.controller('MainController', ['$scope', function($scope) { 
  
  $scope.title = 'Top Sellers in Princeton Dungeons';
  
//   $scope.products = [ 
//   { 
//     name: 'The Book of Trees', 
//     price: 19, 
//     pubdate: new Date('2014', '03', '08'), 
//     cover: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/4/11/1397210130748/Spring-Lamb.-Image-shot-2-011.jpg', 
//     likes: 0
//   }, 
//   { 
//     name: 'Program or be Programmed', 
//     price: 8, 
//     pubdate: new Date('2013', '08', '01'), 
//     cover: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/4/11/1397210130748/Spring-Lamb.-Image-shot-2-011.jpg', 
//     likes: 0
    
//   },
  
//   {
//     name: 'Glory of Mathematical Trails of Erica Wu',
//     price: 0.01,
//     cover: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/4/11/1397210130748/Spring-Lamb.-Image-shot-2-011.jpg',
//   likes: 0
    
//   }
// ];

$scope.plusOne = function(index){
   $scope.products[index].likes += 1; 
};

}]);

app.controller('posting', ['$scope', '$http', function($scope, $http) { 
  
  $scope.post = "Light";
  
   
  
  $http.get('http://www.speffs.one/SPE/getPosts.php')
  .success(function(data,status, headers, config){
    $scope.things = data; 
  }).
  error(function(data, status, headers, config){
    window.alert("Failure!"); 
  });
  
  
  
}]);


app.controller('CollapseDemoCtrl', function ($scope) {
  $scope.isCollapsed = true;
}); 

// upload post controller 

app.controller('upload', ['$scope', '$http', function($scope, $http) { 
  
  $scope.light = "Light";
  
  var _userId = 44; 
  $scope.desc = "  "; 
  $scope.pric = 0.0; 
  $scope.cat =  "  "; 
  $scope.title =  "  "; 
  
   
   $scope.sendPost = function() {
     
        var data =  JSON.stringify({
                userId: _userId, 
                price: $scope.pric, 
                description: $scope.desc, 
                category: $scope.cat, 
                photo1: null, 
                photo2: null, 
                photo3: null, 
                tag1: null, 
                tag2: null, 
                tag3: null,
                postTitle: $scope.title
            
        });
        
         
         
        $http.post("http://speffs.one/SPE/webPost.php", data).success(function(data, status) {
          
          // debug statement 
          console.log("Data: "+data+" Status: "+status);
           window.alert("HIII I AM IN");
            
            
        }).error(function(data, status){
          console.log("Data: "+data+" Status: "+status);
            window.alert("Error on post");
        });
    }; 
  
  
}]);