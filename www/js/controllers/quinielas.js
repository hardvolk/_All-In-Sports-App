ais.controller('QuinielasController', ['$scope','$requester', '$user', '$interval', function($scope, $requester, $user, $interval){
    $scope.user = {coins: 0};

    // Getting User Info
    function getUserInfo() {
        $user.get(function(info){
            $scope.user.coins = info.Coins.Amount;
        });
    }
    getUserInfo();

    // Preparing bet
    $scope.sendBet = function(game){
        // Validation?...

        // Update coins locally
        var currentCoins = $scope.user.coins;
        $scope.user.coins -= game.bet;

        // Sending Bet
        $requester.setup({
            url: 'bets',
            method: 'POST',
            showLoadingModal: true,
            data: { gameid: game.Id, bet: game.bet, winner: game.winner}
        }).call(function(response){
            Materialize.toast("Apuesta realizada!", 3000);
            //SlideUp Item
            $('#item-' + game.Id).slideUp();
            // Update Coins
            $user.get(function(info){
                $scope.user.coins = info.Coins.Amount;
            });
        }, function(response){
            // Refund coins
            $scope.user.coins = currentCoins;
            //Check if the bet was allready done
            if(response.status == 401){
                Modal.show(response.data.message);
            }
        });

    };
    
    // Get User Info periodically
    var refInterval = $interval(function() {getUserInfo()}, app.SERVER_REQUEST_INTERVAL);

    // Getting quinielas    
    $requester.setup({
        url: 'games',
        method: 'GET',
        showLoadingModal: true
    }).call(function(response){
        console.log("Response------", response.data);
        $scope.sportGames = response.data;
    });

    $scope.$on('$destroy', function() {
        $interval.cancel(refInterval);
    });
}]);