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
          document.getElementById("postForm").reset();
           window.alert("HIII I AM IN");
           
           
            
        }).error(function(data, status){
          console.log("Data: "+data+" Status: "+status);
          document.getElementById("postForm").reset();
            window.alert("Error on post");
            
        });
    }; 
  
  
}]);

app.controller('UploadController', ['$scope', '$http',

function($scope, $http) {

    //a simple model to bind to and send to the server
    $scope.model = {
        name: "",
        comments: ""
    };

    //an array of files selected
    $scope.files = [];

    //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });
    
    //the save method
    $scope.save = function() {
        $http({
            method: 'POST',
            url: "http://speffs.one/SPE/photoUpload.php",
            //IMPORTANT!!! You might think this should be set to 'multipart/form-data' 
            // but this is not true because when we are sending up files the request 
            // needs to include a 'boundary' parameter which identifies the boundary 
            // name between parts in this multi-part request and setting the Content-type 
            // manually will not set this boundary parameter. For whatever reason, 
            // setting the Content-type to 'false' will force the request to automatically
            // populate the headers properly including the boundary parameter.
            headers: { 'Content-Type': undefined },
            //This method will allow us to change how the data is sent up to the server
            // for which we'll need to encapsulate the model data in 'FormData'
            transformRequest: function (data) {
                var formData = new FormData();
                //need to convert our json object to a string version of json otherwise
                // the browser will do a 'toString()' on the object which will result 
                // in the value '[Object object]' on the server.
                formData.append("model", angular.toJson(data.model));
                //now add all of the assigned files
                for (var i = 0; i < data.files.length; i++) {
                    //add each file to the form data and iteratively name them
                    formData.append("file" + i, data.files[i]);
                }
                return formData;
            },
            //Create an object that contains the model and files which will be transformed
            // in the above transformRequest method
            data: { model: $scope.model, files: $scope.files }
        }).
        success(function (data, status, headers, config) {
            alert("success!");
        }).
        error(function (data, status, headers, config) {
            alert("failed!");
        });
    };
}]);

