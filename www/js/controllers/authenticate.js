ais.controller('AuthenticateController', ['$scope', '$requester', '$userAuth', '$location', function($scope, $requester, $userAuth, $location){
    

    // User and password
    $scope.login = {
        user: "", 
        pass: "", 
        isUserWrong: false, 
        isPasswordWrong: false
    };

    // Login
    $scope.login.checkout = function(){
        // Validate
        if($scope.login.user == "" || $scope.login.pass == "") return false;
        
        // Do login
        $requester.setup({
            url: 'login',
            method: 'post',
            showLoadingModal: true,
            data: JSON.stringify({email: $scope.login.user, password: $scope.login.pass})
        }).call(function(response){
            if(response.data.token != null && response.data.token != ""){
                // Set Token
                $userAuth.setToken(response.data.token);
                // Redirects
                $location.path('/quiniela');
                
            }else Modal.show("No se pudieron comprobar tus credendiales");
        }, function(errorResponse){
            if(errorResponse.status == 422){
                Modal.show("El usuario ingresado o el correo no son correctos", "Oh Oh");    
            }
            
        });
    };
}]);