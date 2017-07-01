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
            return $http.get('https://www.alphavantage.co/query', {
                params: {
                    function: 'GLOBAL_QUOTE',
                    symbol: symbol,

                    /*
                     * You could steal this API key or you could just go get
                     * your own free key from alphavantage.co and query their
                     * API directly.
                     */
                    apikey: 'UTK3XJEQE3DPGPZ7'
                }
            });
        }
    };
});
