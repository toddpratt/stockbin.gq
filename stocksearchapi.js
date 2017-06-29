app.factory('StockSearchApi', function($http) {
    return {
        search: function(search_text) {
            return $http.get('https://stocksearchapi.com/api/', {
                params: {
                    search_text: search_text,

                    /*
                     * You could steal this API key or you could just go get
                     * your own free key from www.stocksearchapi.com and query
                     * their API directly.
                     */
                    api_key: '883adb8d7a0d47fc754f135b482cebca095f98e0'
                }
            });
        }
    };
});
