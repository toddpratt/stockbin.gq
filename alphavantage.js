app.factory('AlphVantageApi', function($http) {
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
        },
    }
});
