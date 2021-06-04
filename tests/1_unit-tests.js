const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('convertHandler', function() {
    test('read a whole number input', function(done) {
      let input = ['4gal', '41l', '0123mi'];
      let expect = [4, 41, 123];
      
      for (let i = 0; i < input.length; i++) {
        assert.equal(convertHandler.getNum(input[i]), expect[i]);
        return done();
      }
    });

    test('read a decimal number input', function(done) {
      let input = ['3.1mi', '33.11mi', '.3mi', '1.mi'];
      let expect = [3.1, 33.11, 0.3, 1];

      for (let i = 0; i < input.length; i++) {
        assert.equal(convertHandler.getNum(input[i]), expect[i]);
        return done();
      }
    });

    test('read a fractional input', function() {
      let input = '11/22kg';

      assert.notEqual(convertHandler.getNum(input), 'invalid number');
    });

    test('read a fractional input with a decimal', function(done) {
      let input = ['5.4/3lbs', '5.4/3.kg', '.4/3.l'];

      for (let i = 0; i < input.length; i++) {
        assert.notEqual(convertHandler.getNum(input[i]), 'invalid number');
        return done();
      }
    });

    test('return an error on a double-fraction', function() {
      let input = '3/2/32kg';

      assert.equal(convertHandler.getNum(input), 'invalid number');
    });

    test('default to a numerical input of 1 when no numerical input is provided', function(done) {
      let input = ['gal', 'l', 'Mi', 'kM', 'lBs', 'KG'];

      for (let i = 0; i < input.length; i++) {
        assert.equal(convertHandler.getNum(input[i]), '1');
        return done();
      }
    });

    test('read each valid input unit', function(done) {
      let input = ['4gal', '5.6L', '6/3Mi', '.7kM', '8.LBS', 'kg'];

      for (let i = 0; i < input.length; i++) {
        assert.notEqual(convertHandler.getUnit(input[i]), 'invalid unit');
        return done();
      }
    });

    test('return an error for an invalid input unit', function() {
      let input = '3.1cm';

      assert.equal(convertHandler.getUnit(input), 'invalid unit');
    });

    test('return the correct return unit', function(done) {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];

      for (let i = 0; i < input.length; i++) {
        assert.equal(convertHandler.getReturnUnit(input[i]), expect[i]);
        return done();
      }
    });

    test('return the spelled-out string unit', function(done) {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];

      for (let i = 0; i < input.length; i++) {
        assert.equal(convertHandler.spellOutUnit(input[i]), expect[i]);
        return done();
      }
    });

    test('convert gal to L', function() {
      let input = [1, 'gal'];

      assert.approximately(convertHandler.convert(input[0], input[1]), 3.78541, 0.1);
    });

    test('convert L to gal', function() {
      let input = [1, 'L'];

      assert.approximately(convertHandler.convert(input[0], input[1]), 0.26417, 0.1);
    });

    test('convert mi to km', function() {
      let input = [1, 'mi'];

      assert.approximately(convertHandler.convert(input[0], input[1]), 1.60934, 0.1);
    });

    test('convert km to mi', function() {
      let input = [1, 'km'];

      assert.approximately(convertHandler.convert(input[0], input[1]), 0.62137, 0.1);
    });

    test('convert lbs to kg', function() {
      let input = [1, 'lbs'];

      assert.approximately(convertHandler.convert(input[0], input[1]), 0.45359, 0.1);
    });

    test('convert kg to lbs', function() {
      let input = [1, 'kg'];

      assert.approximately(convertHandler.convert(input[0], input[1]), 2.20462, 0.1);
    });
  });
});