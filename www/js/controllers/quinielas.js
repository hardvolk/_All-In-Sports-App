ais.controller('QuinielasController', ['$scope','$requester', '$user', function($scope, $requester, $user){
    $scope.user = {coins: 0};

    // Getting User Info
    $user.get(function(info){
        console.log("UserInfo", info);
        $scope.user.coins = info.Coins.Amount;
    });

    // Getting quinielas    
    $requester.setup({
        url: 'games',
        method: 'GET',
        showLoadingModal: true
    }).call(function(response){
        console.log("Response------", response.data);
        $scope.sportGames = response.data;
    });
    
}]);