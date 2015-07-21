/**
 * number format
 */
 
 /**
  * toString() -> toString(10)
  * toString(radix) 2 <= radix <= 36
  */
  
  var a = 42;
  console.log(a.toString(2)); // 101010
  console.log(a.toString(16)); // 2a
 
 /**
  * toFixed(n)  n bit after the decimal point.
  */
  
  var a = 17.38;
  console.log(a.toFixed(1)); // 17.42
  console.log(a.toFixed(3)); // 17.380
  
/**
 * toExponential(n) n > 0
 */
  var a = 17951.38596;
  console.log(y.toExponential(1)); // 1.8e+4
  console.log(y.toExponential(0)); // 2e+4
  
 /**
  * toPrecision(n) 
  */
  
  var z = 17951.38596; 
  console.log(z.toPrecision(8));  // 17951.386
  console.log(z.toPrecision(3));  // 1.8e+4