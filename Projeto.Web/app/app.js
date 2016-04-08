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
            )
            .when(
                '/cadastrarJogador',
            {
                templateUrl: 'app/views/jogador/cadastro.html',
                controller: 'jogadorCtrl'
            }
            )
            .when(
                '/consultarJogador',
                {
                    templateUrl: 'app/views/jogador/consulta.html',
                    controller: 'jogadorCtrl'
                }
            );
    }
);

app.controller('timeCtrl', function ($scope, $http) {

    $scope.msg = "";
    $scope.display = "display:none";

    $http.get("http://localhost:49199/services/time/consultar")
    .success(function (lista) {
        $scope.times = lista;
    })
    .error(function (e) {
        $scope.msg = e;
    });

    $scope.cadastrar = function (time) {
        $http.post("http://localhost:49199/services/time/cadastrar", time)
        .success(function (msg) {
            $scope.msg = msg;
            $scope.time = "";
        })
        .error(function (e) {
            $scope.msg = e;
        });
    };

    $scope.editar = function (id) {
        $http.get("http://localhost:49199/services/time/editar?id=" + id)
        .success(function (resultado) {
            $scope.time = resultado;
            $scope.display = "display:block";
        })
        .error(function (e) {
            $scope.msg = e;
        });
    };

    $scope.atualizar = function (time) {
        $http.put("http://localhost:49199/services/time/atualizar", time)
        .success(function (msg) {
            $scope.msg = msg;
            window.setTimeout(function () {
                location.reload()
            }, 3000)
        })
        .error(function (e) {
            $scope.msg = e;
        });
    };

    $scope.cancelar = function () {
        $scope.display = "display:none";
    };

    $scope.excluir = function (id) {
        $http.delete("http://localhost:49199/services/time/excluir?id=" + id)
        .success(function (msg) {
            $scope.msg = msg;

            window.setTimeout(function () {
                location.reload()
            }, 3000)
        })
        .error(function (e) {
            $scope.msg = e;
        });
    };

});

app.controller('jogadorCtrl', function ($scope, $http) {

    $scope.msg = "";

    $http.get("http://localhost:49199/services/jogador/carregarTimes")
    .success(function (lista) {
        $scope.times = lista;
    })
    .error(function (e) {
        $scope.msg = e;
    });

    $http.get("http://localhost:49199/services/jogador/consultar")
    .success(function (lista) {
        $scope.jogadores = lista;
    })
    .error(function (e) {
        $scope.msg = e;
    });

    $scope.cadastrar = function (jogador) {
        $http.post("http://localhost:49199/services/jogador/cadastrar", jogador)
        .success(function (msg) {
            $scope.msg = msg;
            $scope.jogador = "";
        })
        .error(function (e) {
            $scope.msg = e;
        });
    };

    $scope.excluir = function (id) {
        $http.delete("http://localhost:49199/services/jogador/excluir?id=" + id)
        .success(function (msg) {
            $scope.msg = msg;

            window.setTimeout(function () {
                location.reload()
            }, 3000)
        })
        .error(function (e) {
            $scope.msg = e;
        });
    };
});