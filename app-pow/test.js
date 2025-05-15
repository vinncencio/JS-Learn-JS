describe("pow", function() {
    it("для отрицательных n возвращает NaN", function() {
        assert.isNaN(pow(2, -1));
    });
    it("для дробных n возвращает NaN", function() {
        assert.isNaN(pow(2, 1.5));
    });
    // describe("возводит x в степень 3", function() {
    //     function makeTest(x) {
    //         let expected = x * x * x;
    //         it(`${x} в степени 3 будет ${expected}`, function() {
    //             assert.equal(pow(x, 3), expected);
    //         });
    //     }
    //     for (let x = 1; x <= 5; x++) makeTest(x);
    // });
    // let x = 5;
    describe("Возводит x в степень n", function() {
        it("5 в степени 1 будет 5", function() {
            assert.equal(pow(5, 1), 5);
        });
        it.only("5 в степени 2 будет 25", function() {
            assert.equal(pow(5, 2), 25);
        });
        it("5 в степени 3 будет 125", function() {
            assert.equal(pow(5, 3), 125);
        });
    });
});

// describe("тест", function() {
//     before(() => alert("Тестирование началось – перед тестами"));
//     after(() => alert("Тестирование закончилось – после всех тестов"));
//     beforeEach(() => alert("Перед тестом – начинаем выполнять тест"));
//     afterEach(() => alert("После теста – заканчиваем выполнение теста"));
//     it('тест 1', () => alert(1));
//     it('тест 2', () => alert(2));
// });