function ConvertHandler() {
  
  this.getNum = function(input) {
    // match number
    let result = input.match(/(^\d+\.?\d*|^\.\d+)(\/\d+\.?\d*)?(?=[a-z]*$)|^[a-z]+$/gi);

    if (result != null) {
      if ((/^(gal|l|mi|km|lbs|kg)$/gi).test(result[0])) {
        result = 1;
      } else if ((/^[\d\.\/]+$/gi).test(result[0])) {
        result = parseFloat(eval(result[0]));
      } else {
        result = 'invalid unit';
      }
    } else {
      result = 'invalid number';
    }

    return result;
  };
  
  this.getUnit = function(input) {
    // match correct unit
    let result = input.match(/(?<=^[\d\.\/]+)(gal|l|mi|km|lbs|kg)$|^(gal|l|mi|km|lbs|kg)$/gi);

    if (result == null) {
      result = 'invalid unit';
    } else if ((/^l$/gi).test(result[0])) {
      result = 'L';
    } else {
      result = result[0].toLowerCase();
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = '';

    if (initUnit == 'gal') {
      result = 'L';
    } else if (initUnit == 'L') {
      result = 'gal';
    } else if (initUnit == 'mi') {
      result = 'km';
    } else if (initUnit == 'km') {
      result = 'mi';
    } else if (initUnit == 'lbs') {
      result = 'kg';
    } else if (initUnit == 'kg') {
      result = 'lbs';
    } else {
      result = 'invalid unit';
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = '';
    
    if (unit == 'gal') {
      result = 'gallons';
    } else if (unit == 'L') {
      result = 'liters';
    } else if (unit == 'km') {
      result = 'kilometers';
    } else if (unit == 'mi') {
      result = 'miles';
    } else if (unit == 'kg') {
      result = 'kilograms';
    } else if (unit == 'lbs') {
      result = 'pounds';
    } else {
      result = 'invalid unit';
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = '';

    if (initNum != 'invalid number' && initUnit != 'invalid unit') {
      if (initUnit == 'L') {
        result = initNum / galToL;  
      } else if (initUnit == 'gal') {
        result = initNum * galToL;
      } else if (initUnit == 'km') {
        result = initNum / miToKm;
      } else if (initUnit == 'mi') {
        result = initNum * miToKm;
      } else if (initUnit == 'kg') {
        result = initNum / lbsToKg;
      } else if (initUnit == 'lbs') {
        result = initNum * lbsToKg;
      }

      result = parseFloat(result.toFixed(5));
    } else if (initNum == 'invalid number') {
      result = 'invalid number';
    } else if (initUnit == 'invalid unit') {
      result = 'invalid unit';
    } else {
      result = 'invalid number and unit';
    }

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + ' ' + this.spellOutUnit(initUnit) + ' ' + 'converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);

    
    if (initNum == 'invalid number' && initUnit == 'invalid unit')
    {
      result = 'invalid number and unit';
    } else if (initNum == 'invalid number') {
      result = 'invalid number';
    } else if (initUnit == 'invalid unit') {
      result = 'invalid unit';
    }
    
    return result;
  };
  
}

module.exports = ConvertHandler;
