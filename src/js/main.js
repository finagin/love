(function ($, $$) {

    if ($$.urlParams("debug")) {
        $$.debug;
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
                        (days == 0 ? "Сегодня" : [
                            days == 1 ? "Завтра" : days == 2 ? "Послезавтра" : (
                                [
                                    "Через",
                                    "<b>" + days + "</b>",
                                    Slavunya
                                        .math(days)
                                        .declination([
                                            "день",
                                            "дня",
                                            "дней"
                                        ])
                                        .toLowerCase()
                                ].join(" ")
                            ),
                            "будет"
                        ].join(" ")),
                        this.__type + ":",
                        this.__title + "."
                    ].join(" ");
                }
            };

            window.CoolDate.__defineGetter__("MONTH", function () {
                return "Круглая дата";
            });
            window.CoolDate.__defineGetter__("COUNT", function () {
                return "Красивое количество дней";
            });
            window.CoolDate.__defineGetter__("IMPORTANT", function () {
                return "Важное событие";
            });

        })(window);

        function notEmpty(item) {
            return item.length
        }

        function firstImportant(m, d) {
            if (+(new Date(sY, m, d)) > sT) {
                return +(new Date(sY, m, d));
            }
            return +(new Date(sY + 1, m, d));
        }

        var hD              = location.hash.replace("#", "").split("/").filter(notEmpty),
            sD              = parseInt(hD[2]) || 11,
            sM              = (hD[1] || 8) - 1,
            sY              = parseInt(hD[0]) || 2016,
            sT              = +(new Date(sY, sM, sD)),
            tT              = +(new Date),
            days            = parseInt((+(new Date) - sT) / 864e5),
            cool            = [
                /**
                 * Круглые даты
                 */
                new CoolDate(+(new Date(sY, sM + 3, sD)), "3 месяца", CoolDate.MONTH),
                new CoolDate(+(new Date(sY, sM + 6, sD)), "Полгода", CoolDate.MONTH),
                new CoolDate(+(new Date(sY, sM + 9, sD)), "9 месяцев", CoolDate.MONTH),
                new CoolDate(+(new Date(sY + 1, sM, sD)), "Год", CoolDate.MONTH),
                new CoolDate(+(new Date(sY + 1, sM + 6, sD)), "Полтора год", CoolDate.MONTH),
                new CoolDate(+(new Date(sY + 2, sM, sD)), "2 года", CoolDate.MONTH),
                new CoolDate(+(new Date(sY + 3, sM, sD)), "3 года", CoolDate.MONTH),
                new CoolDate(+(new Date(sY + 4, sM, sD)), "4 года", CoolDate.MONTH),
                new CoolDate(+(new Date(sY + 5, sM, sD)), "5 лет", CoolDate.MONTH),
                new CoolDate(+(new Date(sY + 6, sM, sD)), "6 лет", CoolDate.MONTH),

                /**
                 * Красивые числа
                 */
                new CoolDate(sT + 111 * 864e5, "111 дней", CoolDate.COUNT),
                new CoolDate(sT + 123 * 864e5, "123 дня", CoolDate.COUNT),
                new CoolDate(sT + 200 * 864e5, "200 дней", CoolDate.COUNT),
                new CoolDate(sT + 210 * 864e5, "2 1 0", CoolDate.COUNT),
                new CoolDate(sT + 222 * 864e5, "222 дня", CoolDate.COUNT),
                new CoolDate(sT + 234 * 864e5, "234 дня", CoolDate.COUNT),
                new CoolDate(sT + 300 * 864e5, "300 дней", CoolDate.COUNT),
                new CoolDate(sT + 321 * 864e5, "3 2 1", CoolDate.COUNT),
                new CoolDate(sT + 333 * 864e5, "333 дня", CoolDate.COUNT),
                new CoolDate(sT + 345 * 864e5, "345 дней", CoolDate.COUNT),

                /**
                 * Важные события
                 */
                new CoolDate(firstImportant(1, 14), "Первое \"14 февраля\" вместе", CoolDate.IMPORTANT),
                new CoolDate(firstImportant(1, 23), "Первое \"23 февраля\" вместе", CoolDate.IMPORTANT),
                new CoolDate(firstImportant(2, 8), "Первое \"8 марта\" вместе", CoolDate.IMPORTANT)
            ],
            nearest,
            nearestIterator = 0;

        $$.log(hD, sD, sM, sY);

        cool.sort(function (a, b) {
            return a.timestamp - b.timestamp;
        });

        nearest = cool.filter(function (cool, index) {
            return index < 10 && (cool.timestamp - tT) / 864e5 >= 0;
        });

        $$.log(nearest);

        $(".title.days")
            .text(days);

        $(".text .days")
            .text(
                Slavunya
                    .math(days)
                    .declination([
                        "день",
                        "дня",
                        "дней"
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

})(jQuery, Slavunya);

(function () {
    var bar = new ProgressBar.Path('#heart-path', {
        easing:   'easeInOut',
        duration: 1400 * 2
    });

    bar.set(-1);
    bar.animate(1);
})();
