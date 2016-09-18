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
                obj = {};
                obj.value = original[i];
                obj.freq = freq;
                frequency.push(obj);
            }
        }

        return frequency;
    },

    unwrapText: function(nodes) {

        var arr = [];

        var ind = 0;

        var len = nodes.length;

        while (ind < len) {
            arr.push(nodes.item(ind).innerText);
            ind++;
        }

        return arr;
    },

    sortFreq: function(lower, higher) {

        return higher.freq - lower.freq;
    },

    updateTechBlogPage: function() {

        var elements = document.body.querySelectorAll(".DataSpec-languages span");

        var languages = GH_LANG.unwrapText(elements);

        var freqLanguagesTopFive = GH_LANG.arrayFrequency(languages).sort(GH_LANG.sortFreq).slice(0, 5);

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