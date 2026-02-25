var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["Success"] = 200] = "Success";
    HttpStatus[HttpStatus["Error"] = 400] = "Error";
    HttpStatus[HttpStatus["Warning"] = 300] = "Warning";
})(HttpStatus || (HttpStatus = {}));
var status1 = HttpStatus.Success;
console.log(status1);
