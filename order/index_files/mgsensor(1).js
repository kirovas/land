(function() {
    var domain = 'a.marketgid.com'; var gid = '0'; var tid = '0'; var muidn = 'f5p2YWD55wRj';

    var MgSensor = function(params) {
        var host = "//" + domain + "/1x1.gif";
        var autoHost = "//" + domain + "/auto.gif";
        var safariHost = "//" + domain + "/safari.html";
        var safariAutoHost = "//" + domain + "/safari_auto.html";
        var visits = 0;
        var isLongCheck = false;

        var self = this;

        var sendData = function(target) {
            var src = (!isSafari() ? host : safariHost) + "?id=" + (params.cid ? params.cid : params.id) + (params.cid ? "&type=c" : "&type=s") + "&g=" + gid + "&t=" + tid + "&tg=" + target + "&v=" + visits + "&r=" + encodeURIComponent(document.location.href);
            send(src, "");
        };

        var isSafari = function() {
            if (params.nosafari === true || muidn != '') return false;
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('safari')!=-1 && ua.indexOf('chrome')==-1 && !(ua.indexOf('mobile safari')!=-1 || ua.indexOf('ipad')!=-1 || ua.indexOf('iphone')!=-1 || ua.indexOf('android')!=-1)) return true;
            else return false;
        };

        var getCookiePrefix = function() {
            var domainParts = /a\.([^\.]*)\.(.*)/.exec(domain);
            if (domainParts[1]) {
                return domainParts[1].charAt(0).toUpperCase() + domainParts[1].slice(1);
            } else {
                return 0;
            }
        };

        var getCookie = function() {
            var matches = document.cookie.match(new RegExp("(?:^|; )" + getCookiePrefix() + "Sensor=([^;]*)"));

            if (matches) {
                var res = matches[1].split('_');
                if (res[0] && res[1]) {
                    gid = res[0]!=0 ? res[0] : gid;
                    tid = res[1]!=0 ? res[1] : tid;
                } else {
                    gid = 0;
                    tid = 0;
                }
            } else if (gid != 0 && tid != 0) {
                document.cookie = getCookiePrefix() + "Sensor=" + gid + "_" + tid + ";path=/;expires=" + (new Date((!Date.now ? new Date().valueOf() : Date.now()) + 864e5)).toUTCString();
            }

            matches = document.cookie.match(new RegExp("(?:^|; )" + getCookiePrefix() + "SensorVis=([^;]*)"));
            if (matches) {
                visits = matches[1];
            }
        };

        var sendAutoData = function() {
            if (params.eid == undefined) params.eid = "";
            if (params.goods == undefined) params.goods = [];
            if (params.partner == undefined) params.partner = "";
            var src = (!isSafari() ? autoHost : safariAutoHost) + "?sid=" + (params.cid ? params.cid : params.id) + "&eid=" + params.eid + (params.cid ? "&type=c" : "&type=s") + "&goods=" + params.goods.join(',') + "&partner=" + params.partner;
            send(src, "A");
        };

        var send = function(src, postfix) {
            if (!isSafari()) {
                (new Image).src = src;
            } else {
                var e = document.createEvent("MouseEvents");
                e.initMouseEvent("click", false, true, window, 0, 0, 0, 0, 0, true, false, false, true, 0, null);
                var a = document.createElement('A');
                a.id = 'fakeMgLink' + postfix;
                a.href = src;
                document.body.appendChild(a);
                document.getElementById('fakeMgLink' + postfix).dispatchEvent(e);
            }
        };

        this.invoke = function(target) {
            getCookie();
            if (target == '') {
                visits++;
                document.cookie = getCookiePrefix() + "SensorVis=" + visits + ";path=/;expires=" + (new Date((!Date.now ? new Date().valueOf() : Date.now()) + 864e5)).toUTCString();
            }
            sendData(target);
            if (params.eid || params.goods) {
                sendAutoData();
            }
        };

        this.mgqWorker = function() {
            for (var i = 0; i < window._mgq.length; i++) {
                var el = window._mgq[i];
                if (typeof(window[el[0]]) == 'function') {
                    window[el[0]].apply(window, el.slice(1));
                    window._mgq.splice(i, 1);
                }
            }
            if (!window._mgqi) {
                window._mgqi = window.setInterval(function() {
                    self.mgqWorker();
                }, 5);
            }

            if (!isLongCheck) {
                if ((new Date()).getTime() - window._mgqt > 10000) {
                    isLongCheck = true;
                    window.clearInterval(window._mgqi);
                    window._mgqi = window.setInterval(function() {
                        self.mgqWorker();
                    }, 100);
                }
            }
        };

        this.mgqInit = function() {
            window._mgq = window._mgq || [];
            if (typeof(window._mgqp) == 'undefined') {
                window._mgqp = self.mgqWorker;
                window._mgqt = (new Date()).getTime();
                self.mgqWorker();
            }
        };
    };

    if (Object.prototype.toString.call(MgSensorData) === '[object Array]') {
        for (var i = 0; i < MgSensorData.length; i++) {
            if (MgSensorData[i].project == domain) {
                var sensor = new MgSensor(MgSensorData[i]);
                window.MgSensor = sensor;
                window["MgSensorInvoke" + i] = window["MgSensorInvoke"] = sensor.invoke;
                sensor.mgqInit();
                _mgq.push(["MgSensorInvoke" + i, [""]]);
                break;
            }
        }
    } else if (MgSensorData && (MgSensorData.id || MgSensorData.cid)) {
        window.MgSensor = new MgSensor(MgSensorData);
        window.MgSensorInvoke = window.MgSensor.invoke;
        window.MgSensor.mgqInit();
        _mgq.push(["MgSensorInvoke", [""]]);
    }
})();