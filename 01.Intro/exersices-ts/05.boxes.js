var Box = /** @class */ (function () {
    function Box() {
        this._boxes = [];
    }
    Box.prototype.add = function (element) {
        this._boxes.push(element);
    };
    Box.prototype.remove = function () {
        return this._boxes.pop();
    };
    Object.defineProperty(Box.prototype, "count", {
        get: function () {
            return this._boxes.length;
        },
        enumerable: false,
        configurable: true
    });
    return Box;
}());
var box = new Box();
box.add("Pesho");
box.add("Gosho");
console.log(box.count);
console.log(box.remove());
console.log(box.count);
