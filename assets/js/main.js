!function(t,e){e.urlParams("debug")&&e.debug,t(function(){function n(t){return t.length}function o(t,e){return+new Date(w,t,e)>C?+new Date(w,t,e):+new Date(w+1,t,e)}function a(t){var e,n,o=(""+t).split(""),a=!0;for(e=0,n=o.length-1;e<n;e++)a=a&&o[e]==o[e+1];if(a)return a;for(a=!0,e=0,n=o.length-1;e<n;e++)a=a&&o[e]==o[e+1]+1;if(a)return a;for(a=!0,e=0,n=o.length-1;e<n;e++)a=a&&o[e]==o[e+1]-1;if(a)return a;for(a=!0,e=1,n=o.length;e<n;e++)a=a&&0==o[e];return a}!function(t){t.CoolDate=function(t,e,n){this.__timestamp=t,this.__title=e,this.__type=n.toLowerCase()},t.CoolDate.prototype={constructor:CoolDate,get timestamp(){return this.__timestamp},get title(){return this.__title},toString:function(){var t=Math.ceil((this.__timestamp-d)/864e5);return[0==t?"Сегодня":[1==t?"Завтра":2==t?"Послезавтра":["Через","<b>"+t+"</b>",Slavunya.math(t).declination(["день","дня","дней"]).toLowerCase()].join(" "),"будет"].join(" "),this.__type+":",this.__title+"."].join(" ")}},t.CoolDate.__defineGetter__("MONTH",function(){return"Круглая дата"}),t.CoolDate.__defineGetter__("COUNT",function(){return"Красивое количество дней"}),t.CoolDate.__defineGetter__("IMPORTANT",function(){return"Важное событие"})}(window);var i,r,l,s=!1,u=setInterval(function(){t("#nearest-wrap").toggleClass("swing")},2e3),c=function(){s||(s=!0,clearInterval(u),t("#nearest-wrap").removeClass("swing"))},f=location.hash.replace("#","").split("/").filter(n),D=parseInt(f[2])||11,h=(f[1]||8)-1,w=parseInt(f[0])||2016,C=+new Date(w,h,D),d=+new Date,p=parseInt((+new Date-C)/864e5),_=[new CoolDate((+new Date(w+1,h,D)),"Год",CoolDate.MONTH),new CoolDate((+new Date(w+1,h+6,D)),"Полтора год",CoolDate.MONTH),new CoolDate(o(1,14),'Первое "14 февраля" вместе',CoolDate.IMPORTANT),new CoolDate(o(1,23),'Первое "23 февраля" вместе',CoolDate.IMPORTANT),new CoolDate(o(2,8),'Первое "8 марта" вместе',CoolDate.IMPORTANT)],m=0;for(r=1;r<12;r++)_.push(new CoolDate((+new Date(w,h+r,D)),[6==r?"":r,6==r?"Полгода":e.math(r).declination(["месяц","месяца","месяцев"])].join(" "),CoolDate.MONTH));for(r=2;r<=10;r++)_.push(new CoolDate((+new Date(w+r,h,D)),[r,e.math(r).declination(["год","года","лет"])].join(" "),CoolDate.MONTH));for(r=100,l=3660;r<l;r++)a(r)&&_.push(new CoolDate(C+864e5*r,[r,e.math(r).declination(["день","дня","дней"])].join(" "),CoolDate.COUNT));_.sort(function(t,e){return t.timestamp-e.timestamp}),i=_.filter(function(t){return m<10&&Math.ceil((t.timestamp-d)/864e5)>=0&&(m++,!0)}),e.log(i),t(".title.days").text(p),t(".text .days").text(Slavunya.math(p).declination(["день","дня","дней"])),i.forEach(function(e){t("#nearest").append(t("<div>").addClass("swiper-slide").html(e+""))}),new Swiper(".swiper-container",{loop:!0,runCallbacksOnInit:!1,onSlidePrevEnd:c,onSlideNextEnd:c}),t("body").delay(2e3).queue(function(e){t(this).addClass("ready"),e()})})}(jQuery,Slavunya),function(){var t=new ProgressBar.Path("#heart-path",{easing:"easeInOut",duration:2800});t.set(-1),t.animate(1)}();
//# sourceMappingURL=main.js.map
