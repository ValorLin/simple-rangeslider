(function ($) {
    /*
     ======== A Handy Little QUnit Reference ========
     http://api.qunitjs.com/

     Test methods:
     module(name, {[setup][ ,teardown]})
     test(name, callback)
     expect(numberOfAssertions)
     stop(increment)
     start(decrement)
     Test assertions:
     ok(value, [message])
     equal(actual, expected, [message])
     notEqual(actual, expected, [message])
     deepEqual(actual, expected, [message])
     notDeepEqual(actual, expected, [message])
     strictEqual(actual, expected, [message])
     notStrictEqual(actual, expected, [message])
     throws(block, [expected], [message])
     */

    module('jQuery#rangeslider', {
        // This will run before each test in this module.
        setup: function () {
            this.$slider1 = $('#qunit-fixture');
            this.$slider2 = $('#qunit-fixture2');
        }
    });

    test('is chainable', function () {
        expect(1);
        // Not a bad test to run on collection methods.
        strictEqual(this.$slider1.rangeslider(), this.$slider1, 'should be chainable');
    });

    test('max min', function () {
        expect(4);
        var sliderApi = this.$slider1.rangeslider().data('slider');
        equal(sliderApi.getMin(), 0, 'default min should be 0');
        equal(sliderApi.getMax(), 100, 'default max should be 0');

        var expectMax = this.$slider2.attr('max');
        var expectMin= this.$slider2.attr('min');
        var sliderApi2 = this.$slider2.rangeslider().data('slider');
        equal(sliderApi2.getMin(), expectMin, 'min should equal to attr min');
        equal(sliderApi2.getMax(), expectMax, 'max should equal to attr max');
    });
}(jQuery));
