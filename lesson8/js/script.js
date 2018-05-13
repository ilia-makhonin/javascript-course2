function Lamborghini(model, novelty, mileage) {
    this.model = model;
    this.novelty = novelty;
    this.mileage = mileage;
    this.wheels = 4;
}

Lamborghini.distance = 0;

Lamborghini.prototype.go = function (value) {
    Lamborghini.distance = value;
    this.mileage += value;
};

Lamborghini.prototype.getDistance = function () {
    return Lamborghini.distance;
};

Lamborghini.prototype.getMileage = function () {
    return this.mileage;
};