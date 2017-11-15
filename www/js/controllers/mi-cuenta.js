
ais.controller('Mi-CuentaController', ['$scope', '$interval', '$userAuth', function($scope, $interval, $userAuth){

  //TIMER!!! 
    // Set the date we're counting down to
    $scope.countDownDate_monedas = new Date("11 3, 2017 15:37:25").getTime();
    $scope.countDownText_monedas = "00:00:00";

    var cdInterval;

    // Update the count down every second
    $scope.updateCountDown_monedas = function() {
        if ( angular.isDefined(cdInterval) ) return;

        cdInterval = $interval(function(){
            // Get todays date and time
              var now = new Date().getTime();

              // Find the distance between now an the count down date
              var distance = $scope.countDownDate_monedas - now;

              // Time calculations for days, hours, minutes and seconds
              var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              var seconds = Math.floor((distance % (1000 * 60)) / 1000);

              // Update the countDownText_monedas
              $scope.countDownText_monedas = hours + "h " + minutes + "m " + seconds + "s ";
              
              // If the count down is finished, write some text 
              if (distance < 0) {
                $scope.stopTimer_monedas();
                $scope.countDownText_monedas = "Monedas Gratis";
              }

        }, 1000);
    };

    $scope.stopTimer_monedas = function(){
        if (angular.isDefined(cdInterval)) {
            $interval.cancel(cdInterval);
            cdInterval = undefined;
          }
    };

    $scope.updateCountDown_monedas();
  //Logout
  $scope.exitAccount = function(){
    $userAuth.logout();
  };
}]);