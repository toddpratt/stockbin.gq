var app = angular.module('StockBin', []);

app.controller('Controller', function($scope, $q, $location, AlphVantageApi) {

    $scope.matches = [];
    $scope.stocks = {};

    $scope.addStock = function(symbol) {
        if($scope.stocks[symbol]) {
            return;
        }
        var investment = {
            symbol: symbol,
            holdings: null,
            exchange: null,
            price: null
        };
        $scope.stocks[symbol] = investment;
        AlphVantageApi.get(symbol).then(function(response) {
            var quote = response.data["Realtime Global Securities Quote"];
            investment.price = quote['03. Latest Price'];
            investment.exchange = quote['02. Exchange Name'];
        });
        $scope.searchText = "";
        $scope.matches = [];
    };

    $scope.searchSymbols = function() {
        if($scope.searchText.length > 2) {
            StockSearchApi.search($scope.searchText)
                .then(function(response) {
                    $scope.matches = response.data;
                    if($scope.matches.length > 0) {
                        $("#matches").dropdown();
                    } else {
                        $("#matches").dropdown('toggle');
                    }
                });
        }
    };

    $scope.getStocks = function() {
        angular.forEach($scope.stocks, function(stock) {
            stock.price = null;
        });
        $q.all($scope.stocks.map(function(stock) {
            return AlphVantageApi.get(stock.symbol);
        })).then(function(responses) {
            angular.forEach(responses, function(response) {
                var quote = response.data["Realtime Global Securities Quote"];
                var investment = $scope.stocks[quote['01. Symbol']];
                investment.price = quote['03. Latest Price']
            });
            $scope.quotes = quotes.map(function(quote) {
            });
            $scope.apiState = 'loaded';
        }).catch(function(error) {
            $scope.apiState = 'failed';
        });;
    };
});
