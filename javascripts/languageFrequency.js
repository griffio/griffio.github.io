var GH_LANG = {
    /*
    Input array of values returns frequency of values as array of objects with value, count properties.
    ["foo", "foo", "bar"] -> [ {value:"foo", freq: 2}, {value:"bar", freq: 1} ]
    */
    arrayFrequency: function(original) {

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
    },

    unwrapTextAll:function(elements) {

      var result = [];
      var i;
      var len = elements.length;

      for (i=0; i<len; i++) {
         result.push(elements.item(i).innerText);
      }
      return result;
    },

    updateTechBlogPage: function() {

        var elements = document.body.querySelectorAll(".DataSpec-languages span");

        var languages = GH_LANG.unwrapTextAll(elements);

        var freqLanguagesTopFive = GH_LANG.arrayFrequency(languages).sort( function (a,b) { return b.freq - a.freq } ).slice(0, 5);

        var topFiveElement = document.getElementById("top-five-languages");

        var topFiveParagraph = topFiveElement.querySelector("p");

        freqLanguagesTopFive.forEach(function(element, index) {
         var span = document.createElement('span');
         var textValue = document.createTextNode(element.value);
         span.appendChild(textValue);
         topFiveParagraph.appendChild(span);
        });
    }
};

GH_LANG.updateTechBlogPage();