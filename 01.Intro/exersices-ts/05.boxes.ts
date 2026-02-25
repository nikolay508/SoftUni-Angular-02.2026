class Box<T> {
    private _boxes: T[] = [];

    public add(element: T): void {
        this._boxes.push(element);
    }

    public remove(): void {
        this._boxes.pop();
    }

    get count(): number {
        return this._boxes.length;
    }
}

let box = new Box<String>();
box.add("Pesho");
box.add("Gosho");
console.log(box.count);
console.log(box.remove())
console.log(box.count);