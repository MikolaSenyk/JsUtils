/**
 * Web Storage "cookie" helper object.
 * Works with objects and primitive types.
 *
 * Usage:
 *     WsCookie.expiration = 60; // expiry in 1 minute
 *     WsCookie.set("user", {firstName: "John", lastName: "Doe"}, 120);
 *     var cookie = WsCookie.get("user"); // cookie.firstName equals to "John"
 */
var WsCookie = {
    // default expiration time in secods = 1 hour
    expiration: 3600,
    
    /**
     * Save cookie in web storage
     *
     * @param {string} name Name of cookie
     * @param {any} value Value of cookie
     * @param {number} expSeconds Expiry in seconds (optional)
     */
    set: function(name, value, expSeconds) {
        var expTime = ( expSeconds ) ? expSeconds : this.expiration;
        expTime += this.currTimestamp();
        var obj = {
            exp: expTime,
            item: value
        };
        localStorage.setItem(name, JSON.stringify(obj));
    },
    
    /**
     * Load cookie from web storage
     *
     * @param {string} name Cookie name
     * @return Cookie value or undifined
     */
    get: function(name) {
        var obj, value = localStorage.getItem(name);
        if ( value ) {
            obj = JSON.parse(value);
            if ( obj.exp > this.currTimestamp() ) {
                return obj.item;
            } else {
                localStorage.removeItem(name);
            }
        }
    },
    
    /**
     * Get current timestamp in seconds
     */
    currTimestamp: function() {
        return new Date().getTime() / 1000;
    }
};
