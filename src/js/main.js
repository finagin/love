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
                new CoolDate(+(new Date(sY + 1, sM, sD)), "Год", CoolDate.MONTH),
                new CoolDate(+(new Date(sY + 1, sM + 6, sD)), "Полтора год", CoolDate.MONTH),

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
            nearestLength   = 0,
            nearestIterator = 0,
            c;

        for (c = 1; c < 12; c++) {
            cool.push(new CoolDate(
                +(new Date(sY, sM + c, sD)),
                [
                    c,
                    с == 6 ? "Полгода" : $$
                        .math(c)
                        .declination([
                            "месяц",
                            "месяца",
                            "месяцев"
                        ])
                ].join(" "),
                CoolDate.MONTH
            ));
        }

        for (c = 2; c <= 10; c++) {
            cool.push(new CoolDate(
                +(new Date(sY + c, sM, sD)),
                [
                    c,
                    $$
                        .math(c)
                        .declination([
                            "год",
                            "года",
                            "лет"
                        ])
                ].join(" "),
                CoolDate.MONTH
            ));
        }

        cool.sort(function (a, b) {
            return a.timestamp - b.timestamp;
        });

        nearest = cool.filter(function (cool) {
            if (nearestLength < 10) {
                if ((cool.timestamp - tT) / 864e5 >= 0) {
                    nearestLength++;
                    return true;
                }
            }
            return false;
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
            })
            .on("contextmenu", function (e) {
                e.preventDefault();

                nearestIterator = nearestIterator > 0 ? nearestIterator - 1 : nearest.length - 1;

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
