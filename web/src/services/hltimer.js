module.exports.getWorkTimeFromString = function(text) {
    var getHours = function(timeText) {
        var pattern = /[0-9]{1,2}(H|h)/
        var result = pattern.exec(timeText);
        return result.length > 1 ? Number.parseInt(result[0]) : 0;
    };

    var getMins = function(timeText) {
        var pattern = /[0-9]{1,2}(M|m)/
        var result = pattern.exec(timeText);
        return result.length > 1 ? Number.parseInt(result[0]) : 0;
    };

    var patterns = [/!([0-9]|[1-2][0-9])(H|h)([0-9]|[1-5][0-9])(M|m)!/, // !2H37m!
        /!([1-9]|[1-2][0-9])(H|h)!/, // !2h! !23H!
        /!([0-9]|[1-2][0-9])(H|h)([0-9]|[1-5][0-9])(M|m)\([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,4}\)!/, //!2h34m(25/12/2010)!
        /!([0-9]|[1-5][0-9])(M|m)\([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,4}\)!/, //!34m(25/12/2010)!
        /!([0-9]|[1-2][0-9])(H|h)\([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,4}\)!/ //!2h(25/12/2010)!
    ];

    for (var i = 0; i < patterns.length; i++) {
        var tmpResults = patterns[i].exec(text);
        if (tmpResults && tmpResults.length > 0) {
            return {
                'H': getHours(tmpResults[0]),
                'm': getMins(tmpResults[0])
            };
        }
    }

    return false;
};

module.exports.getTotalTime = function(timeObjectArray) {
    var total = {
        H: 0,
        m: 0
    };
    timeObjectArray.forEach(function(item) {
        total.H += item.H || 0;
        total.m += item.m || 0;
    });

    total.H += Math.floor(total.m / 60);
    total.m = total.m % 60;

    return total;
};
