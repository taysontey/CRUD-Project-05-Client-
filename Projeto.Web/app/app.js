var app = angular.module('app', ['ngRoute']);

app.config(
    function ($routeProvider) {

        $routeProvider
            .when(
                '/cadastrarTime',
                {
                    templateUrl: 'app/views/time/cadastro.html',
                    controller: 'timeCtrl'
                }
            )
            .when(
                '/consultarTime',
                {
                    templateUrl: 'app/views/time/consulta.html',
                    controller: 'timeCtrl'
                }
            );
    }
);

app.controller('timeCtrl', function ($scope, $http) {

    $scope.msg = "";

    $scope.cadastrar = function (time) {
        $http.post("http://localhost:49199/services/time/cadastrar", time)
        .success(function (msg) {
            $scope.msg = msg;
        })
        .error(function (e) {
            $scope.msg = e;
        });
    };

    $http.get("http://localhost:49199/services/time/consultar")
    .success(function (lista) {
        $scope.times = lista;
    })
    .error(function (e) {
        $scope.msg = e;
    });

});