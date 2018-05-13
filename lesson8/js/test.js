describe('Тестирование объекта', function () {
    var model = 'Murcielago';
    var novelty = true;
    var mileage = 0;
    var murcielago = new Lamborghini(model, novelty, mileage);

    it('Создание объекта', function () {
        expect(murcielago.model).toBe(model);
        expect(murcielago.novelty).toBeTruthy();
        expect(murcielago.wheels).toBe(4);
    });

    it('Проверка методов "go" и "getMileage"', function () {
        var dist = 100;
        var amount = dist;

        for (var i = 0; i < 10; i++) {
            murcielago.go(dist);
            expect(murcielago.getMileage()).toBe(amount);
            amount += dist;
        }
    });

    it('Проверка метода "getDistance"', function () {
        var aventador = new Lamborghini('Aventador', true, 0);
        var distance = 150;

        aventador.go(distance);
        expect(aventador.getDistance()).toBe(distance);
    });
});