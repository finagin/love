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

        var sD   = 11,
            sM   = 7,
            sY   = 2016,
            sT   = +(new Date(sY, sM, sD)),
            tT   = +(new Date),
            days = parseInt((+(new Date) - sT) / 864e5),
            cool = [
                // полные месяцы
                +(new Date(sY, sM + 3, sD)),
                +(new Date(sY, sM + 6, sD)),
                +(new Date(sY, sM + 9, sD)),
                +(new Date(sY, sM, sD + 1)),

                // 111 дней
                sT + 111 * 864e5,

                // 123 дня
                sT + 123 * 864e5,

                // 200 дней
                sT + 200 * 864e5,

                // 210 дней
                sT + 210 * 864e5,

                // 222 дня
                sT + 222 * 864e5
            ],
            nearest,
            title;

        cool.sort();

        nearest = cool.filter(function (cool) {
            return (cool - tT) / 864e5 > 0;
        })[0];

        nearest = Math.ceil((nearest - tT) / 864e5);

        if (nearest == 1) {
            title = "Завтра";
        } else if (nearest == 2) {
            title = "Послезавтра";
        } else {
            title = [
                "Через",
                nearest,
                Slavunya.math(nearest).declination(["день", "деня", "дней"])
            ].join(" ");
        }


        $(".days")
            .text(days);

        $("#nearest")
            .html(title + " будет<br>красивая дата или юбилей");

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
