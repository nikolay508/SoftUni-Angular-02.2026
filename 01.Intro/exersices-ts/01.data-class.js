var Data = /** @class */ (function () {
    function Data(method, uri, version, message) {
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;
        this.response = undefined;
        this.fulfilled = false;
    }
    return Data;
}());
var mydata = new Data('POST', 'http://google.com/app-user', 'HTTP/2', 'Create user');
console.log(mydata);
