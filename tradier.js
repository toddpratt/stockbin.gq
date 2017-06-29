app.factory('TradierApi', function($http) {
    return {
        search: function(search_text) {
            return $http.get('https://sandbox.tradier.com/v1/', {
                params: {
                    search_text: search_text,

                    /*
                     * You could steal this API key or you could just go get
                     * your own free key from www.tradier.com and query their
                     * API directly.
                     */
                    api_key: '2qxAxIxr4HGbkNR0HCWHn2rnqQG8'
                }
            });
        }
    };
});
