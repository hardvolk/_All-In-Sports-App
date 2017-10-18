var ais = angular.module("aisModule", ["ngRoute"]);

ais.config(function($routeProvider) {
    $routeProvider
    .when("/mi-cuenta", {
        templateUrl : "views/mi-cuenta.html?v=0.0.12",
        controller : "Mi-CuentaController"
    })
    .when("/quiniela", {
        templateUrl : "views/quinielas.html?v=0.0.16",
        controller: "QuinielasController"
    })
    .when("/regalos", {
        templateUrl : "views/regalos.html?v=0.0.22",
        controller: "RegalosController"        
    })
    .when("/canje", {
        templateUrl : "views/canje.html?v=0.0.23"
    })
    .when("/deportes", {
        templateUrl : "views/deportes.html?v=0.0.23"
    })
    .when("/jornadas", {
        templateUrl : "views/jornadas.html?v=0.0.23"
    })
    .when("/tabla-general", {
    templateUrl : "views/tabla-general.html?v=0.0.23"
    })
    .when("/mercado", {
        templateUrl : "views/mercado.html?v=0.0.23"
        })
    .when("/mercado-panel", {
        templateUrl : "views/mercado-panel.html?v=0.0.23"
        })
    ;
});

/**
* Service: Makes http request to the server and handles the response
*/
ais.factory('$requester', ['$http', function($http){
    var request = {
        setup: function(configParams){
            this.config = configParams;
            return this;
        },
        config: {},
        call: function(callbackFn){
            // Adding the API URL and 'X-Auth-Token'
            this.config.url = app.API_URL + this.config.url;
            this.config.headers = {"X-Auth-Token" : app.TOKEN};
            if(typeof this.config.showLoadingModal !== "undefined"){
                Modal.show('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>' + 
                    '<p>Espere por favor</p>',"",true);
            }
            // Making request, first param in 'then' is callback function, second is error handler
            $http(this.config).then(
                function success(response){
                    if(Modal.visible == true) Modal.close();
                    callbackFn(response);
                }, 
                function errorHanlder(response){
                    console.log("---ERROR RESPONSE", response);
                    Modal.show(response.statusText, "Oh Oh");
            });
        }
    };
    return request;
}]);

/*
* Service: User Info
**/
ais.factory('$user', ['$requester', function($requester){
    
    return {
        req: $requester,
        get: function(callback){
            this.req.setup({
                url: "users/my-info",
                method: "GET"
            }).call(function(response){
                callback(response.data);
            });
        }
    };
}]);