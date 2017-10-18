ais.controller('RegalosController', ['$scope', '$interval', function($scope, $interval){
    
    //TIMER!!! 
    // Set the date we're counting down to
    $scope.countDownDate = new Date("Aug 2, 2017 15:37:25").getTime();
    $scope.countDownText = "00:00:00";

    var cdInterval;

    // Update the count down every second
    $scope.updateCountDown = function() {
        if ( angular.isDefined(cdInterval) ) return;

        cdInterval = $interval(function(){
            // Get todays date and time
              var now = new Date().getTime();

              // Find the distance between now an the count down date
              var distance = $scope.countDownDate - now;

              // Time calculations for days, hours, minutes and seconds
              var days = Math.floor(distance / (1000 * 60 * 60 * 24));
              var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              var seconds = Math.floor((distance % (1000 * 60)) / 1000);

              // Update the CountDownText
              $scope.countDownText = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
              
              // If the count down is finished, write some text 
              if (distance < 0) {
                $scope.stopTimer();
                $scope.countDownText = "SUBASTA CONCLUIDA";
              }

        }, 1000);
    };

    $scope.stopTimer = function(){
        if (angular.isDefined(cdInterval)) {
            $interval.cancel(cdInterval);
            cdInterval = undefined;
          }
    };

    $scope.updateCountDown();
}]);