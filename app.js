var app = angular.module('StockBin', []);

app.controller('Controller', function($scope, $q, StockQuote) {
    $scope.apiState = 'not-loaded';

    $scope.getStocks = function() {
        $scope.apiState = 'loading';
        var symbols = $scope.stockText.split(/[^a-zA-z]+/);

        $q.all(symbols.map(function(symbol) {
            return StockQuote.get(symbol);
        })).then(function(quotes) {
            $scope.quotes = quotes.map(function(quote) {
                return quote.data["Realtime Global Securities Quote"];
            });
            $scope.apiState = 'loaded';
        });
    };
});

app.factory('StockQuote', function($http) {
    return {
        get: function(symbol) {
            return $http.get('/api/query', {
                params: {
                    function: 'GLOBAL_QUOTE',
                    symbol: symbol,
                    apikey: 'UTK3XJEQE3DPGPZ7'
                }
            });
        }
    };
});
