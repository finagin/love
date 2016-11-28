(function ($) {

    $(function () {

        $(function () {

            var days = parseInt((+(new Date) - (new Date(2016, 7, 11))) / 864e5);

            $(".days")
                .text(days);

            $("body")
                .delay(2e3)
                .queue(function (next) {
                    $(this)
                        .addClass("ready");
                    next();
                });
        });

    });

})(jQuery);
