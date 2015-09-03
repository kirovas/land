(function(d, w){
    if (w.rtcdnPxl) {
        w.rtcdnPxl('1B7840CB-5F14-49B4-B8DE-1DBDC6DAE2A2');
    }
    if (w.rtcdnProduct) {
        (function (d, w) {
            var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () { n.parentNode.insertBefore(s, n); };

            var date = new Date();
            var siteId = 10012;
            var product = w.rtcdnProduct;

            s.type = "text/javascript";
            s.async = true;
            s.src = (d.location.protocol == "https:" ? "https:" : "http:")
            + "//dmp.rtcdn.ru/market.js?t=" + date.getTime()
            + "&siteId=" + siteId
            + "&productId=" + product.productId
            + "&referer=" + encodeURIComponent(d.referrer);

            if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
            } else { f(); }
        })(d, w);
    }
})(document, window)