/*
Input array of values returns frequency of values as array of objects with value, count properties.
["foo", "foo", "bar"] -> [ {value:"foo", freq: 2}, {value:"bar", freq: 1} ]
*/
function arrayFrequency(original) {
 
	var frequency = [];
  var obj = null;

	var copy = original.slice(0);
	for (var i = 0; i < original.length; i++) { 
		var freq = 0;	
		for (var j = 0; j < copy.length; j++) {
			if (original[i] == copy[j]) {
				freq++;
				delete copy[j];
			}
		}
 
		if (freq > 0) {
      var obj = {};
			obj.value = original[i];
			obj.freq = freq;
			frequency.push(obj);
		}
	}
	
	return frequency;
};
