ais.controller('MisApuestasController', ['$requester', '$scope', function($requester, $scope){
    // Getting Active Bets    
    $requester.setup({
        url: 'bets/active',
        method: 'GET',
        showLoadingModal: true
    }).call(function(response){
        console.log("Response------", response.data);
        $scope.activeGames = response.data;
    });
    
}]);