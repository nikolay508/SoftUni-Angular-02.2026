class Data {
    method: string;
    uri: string;
    version: string;
    message: string;
    response: string | undefined;
    fulfilled: boolean;

    constructor(method: string, uri: string, version: string, message: string){
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;

        this.response = undefined;
        this.fulfilled = false;
    }
}

let mydata = new Data('POST', 'http://google.com/app-user', 'HTTP/2', 'Create user');
console.log(mydata);