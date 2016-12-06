(function ($) {

    function title(days) {

        var words = [
                "День",
                "Дня",
                "Дней"
            ],
            word,
            a, b;

        a = days / 10;
        a = a - Math.floor(a);
        a *= 10;

        b = days / 100;
        b = b - Math.floor(b);
        b *= 100;

        if (days == 1) {
            return " завтра";
        } else if (days == 2) {
            return " послезавтра";
        } else if (a == 1 || !(b > 10 && b < 20)) {
            word = words[0];
        } else if (a in [2, 3, 4]) {
            word = words[1];
        } else {
            word = words[2];
        }

        return " через " + days + " " + word;
    }

    $(function () {

        (function (window) {
            window.CoolDate = function CoolDate(timestamp, title, type) {
                this.__timestamp = timestamp;
                this.__title     = title;
                this.__type      = type.toLowerCase();
            };

            window.CoolDate.prototype = {
                constructor: CoolDate,

                get timestamp() {
                    return this.__timestamp;
                },
                get title() {
                    return this.__title;
                },

                toString: function () {
                    var days = Math.ceil((this.__timestamp - tT) / 864e5);

                    return [
                        (days == 1 ? "Завтра" : days == 2 ? "Послезавтра" : ([
                            "Через",
                            "<b>" + days + "</b>",
                            Slavunya.math(days).declination(["день", "деня", "дней"])
                        ].join(" "))),
                        "будет",
                        this.__type + ".",
                        this.__title
                    ].join(" ");
                }
            };

            window.CoolDate.__defineGetter__("MONTH", function () {
                return "Круглая дата";
            });
            window.CoolDate.__defineGetter__("COUNT", function () {
                return "Красивое количество дней";
            });

        })(window);

        var sD              = 11,
            sM              = 7,
            sY              = 2016,
            sT              = +(new Date(sY, sM, sD)),
            tT              = +(new Date),
            days            = parseInt((+(new Date) - sT) / 864e5),
            cool            = [
                new CoolDate(+(new Date(sY, sM + 3, sD)), "3 месяца", CoolDate.MONTH),
                new CoolDate(+(new Date(sY, sM + 6, sD)), "Полгода", CoolDate.MONTH),
                new CoolDate(+(new Date(sY, sM + 9, sD)), "9 месяцев", CoolDate.MONTH),

                new CoolDate(sT + 111 * 864e5, "111 дней", CoolDate.COUNT),
                new CoolDate(sT + 123 * 864e5, "123 дня", CoolDate.COUNT),
                new CoolDate(sT + 200 * 864e5, "200 дней", CoolDate.COUNT),
                new CoolDate(sT + 210 * 864e5, "2 1 0 дней", CoolDate.COUNT),
                new CoolDate(sT + 222 * 864e5, "222 дня", CoolDate.COUNT),
            ],
            nearest,
            nearestIterator = 0;

        cool.sort(function (a, b) {
            return a.timestamp - b.timestamp;
        });

        nearest = cool.filter(function (cool) {
            return (cool.timestamp - tT) / 864e5 > 0;
        });

        $(".title.days")
            .text(days);

        $(".text .days")
            .text(
                Slavunya
                    .math(days)
                    .declination([
                        "день",
                        "деня",
                        "деней"
                    ])
            );

        $("#nearest")
            .html(nearest[nearestIterator] + "")
            .on("click", function () {
                nearestIterator = nearestIterator < nearest.length - 1 ? nearestIterator + 1 : 0;

                $(this)
                    .html(nearest[nearestIterator] + "");
            });

        $("body")
            .delay(2e3)
            .queue(function (next) {
                $(this)
                    .addClass("ready");
                next();
            });

    });

})(jQuery);

(function () {
    var bar = new ProgressBar.Path('#heart-path', {
        easing:   'easeInOut',
        duration: 1400 * 2
    });

    bar.set(-1);
    bar.animate(1);
})();
