window.httpClient = (function() {
    var ajax = function(options) {
        return new Promise(function(resolve, reject) {
            $.ajax(options).done(resolve).fail(reject);
        });
    };
    
    return {
        ajax: ajax
    };
})();
