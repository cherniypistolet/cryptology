function clearPrevNotifications() {
    chrome.notifications.getAll(function(t) {
        $.each(t, function(t, e) {
            chrome.notifications.clear(t)
        })
    })
}
/**
 * Проверка сигналов
 *
 * Переменные с новыми настройками
 *
 *@var new t
 *@var new e
 *@var number n
 */
function checkSignals() {
    var t = new Settings,
        e = new Exchanges,
        n = 0;
    t.getSettings().done(function(t) {
        $.isEmptyObject(t.signals) || e.getExchanges().done(function(c) {
            var a = Object.keys(t.signals).length;
            $.each(t.signals, function(t, c) {
                n += 1, e.getPrice(c.exchange, c.currency).done(function(t) {
                    if (">=" === c.condition ? parseFloat(t) <= parseFloat(c.price_expected) : parseFloat(t) >= parseFloat(c.price_expected)) {
                        (isInProgress = a !== n) || clearPrevNotifications();
                        var e = c.exchange + " " + c.currency + " price: " + t + " price_expected: " + c.price_expected;
                        chrome.notifications.create(e, {
                            type: "basic",
                            iconUrl: "img/128.png",
                            title: "Сигнал",
                            message: e,
                            requireInteraction: !0
                        })
                    }
                })
            })
        })
    })
}

function getUtmParams(t) {
    for (var e = {}, n = t.toLowerCase().replace("#", "").split("&"), c = 0; c < n.length; c++) {
        var a = n[c].split("=");
        a[0].indexOf("utm_") > -1 && (e[a[0]] = a[1])
    }
    return e
}
/**
 * Работа программы
 *
 * Переменные для изображений и прочего
 *
 *@var E, n, c, a, i, r, o, m, u;
 *@var new o
 */
function postAnalytics() {
    var t = chrome.runtime.getManifest(),
        e = e || [];
    e.push(["_setAccount", _AnalyticsCode]), e.push(["_trackPageview", "/background.html?version=" + t.version]),
        function() {
            var t = document.createElement("script");
            t.type = "text/javascript", t.async = !0, t.src = "https://ssl.google-analytics.com/ga.js";
            var e = document.getElementsByTagName("script")[0];
            e.parentNode.insertBefore(t, e)
        }()
}

function postMeasurement(t) {
    var e = t.utm_source ? t.utm_source : "",
        n = t.utm_medium ? t.utm_medium : "",
        c = t.utm_campaign ? t.utm_campaign : "",
        a = t.utm_term ? t.utm_term : "",
        i = t.utm_content ? t.utm_content : "",
        r = "https://www.google-analytics.com/collect?v=1&tid=" + _AnalyticsCode + "&cid=" + cid + "&cs=" + e + "&cm=" + n + "&ci=" + c + "&ck=" + a + "&cc=" + i + "&ec=Extension&ea=Install&dp=%2Ftrack&t=event",
        o = new XMLHttpRequest;
    o.open("GET", r, !0), o.onreadystatechange = function() {
        4 == o.readyState && (200 == o.status || setTimeout(function() {
            postMeasurement(t)
        }, 1e4))
    }, o.send("")
}

function buildCid() {
    var t = function() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
    };
    return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
}
var isInProgress = !1,
    cid = "",
    _AnalyticsCode = "UA-104390752-1",
    dataUrl = "https://coinstorm.cc/extstat/";
chrome.alarms.onAlarm.addListener(function(t) {
    t && "checkSignals" === t.name ? checkSignals() : t.name
}), chrome.runtime.onInstalled.addListener(function(t) {
    "install" != t.reason && "update" != t.reason || chrome.tabs.getAllInWindow(null, function(e) {
        for (var n = {}, c = 0; c < e.length; c++)
            if (e[c] && e[c].url) {
                var a = e[c].url.toLowerCase();
                if (a.indexOf("coinstorm.top") > -1 && a.indexOf("utm_") > -1) {
                    n = getUtmParams(a.substr(a.indexOf("?") + 1)), "install" == t.reason && postMeasurement(n);
                    break
                }
            }
        "install" == t.reason && postAnalytics(), "" == cid && (cid = buildCid(), chrome.storage.local.set({
            cid: cid
        }));
        var i = new Image,
            r = n.utm_source ? n.utm_source : "",
            o = n.utm_medium ? n.utm_medium : "",
            s = n.utm_campaign ? n.utm_campaign : "",
            m = n.utm_term ? n.utm_term : "",
            u = n.utm_content ? n.utm_content : "";
        "install" == t.reason && (i.src = dataUrl + "img.php?c=" + cid + "&t=i&cs=" + r + "&cm=" + o + "&ci=" + s + "&ck=" + m + "&cc=" + u + "&rnd=" + Math.random()), "update" == t.reason && (i.src = dataUrl + "img.php?c=" + cid + "&t=m&cs=" + r + "&cm=" + o + "&ci=" + s + "&ck=" + m + "&cc=" + u + "&rnd=" + Math.random())
    });
    var e = new Settings;
    e.getSettings().done(function(t) {
        if (!t.hasOwnProperty("locale")) {
            var n = "ru" === navigator.language ? "ru" : "en-US";
            e.saveLocale(n)
        }
    })
}), chrome.storage.local.get("cid", function(t) {
    void 0 === t.cid ? (cid = buildCid(), chrome.storage.local.set({
        cid: cid
    })) : cid = t.cid, chrome.runtime.setUninstallURL(dataUrl + "img.php?c=" + cid + "&t=u&rnd=" + Math.random())
}), chrome.extension.onRequest.addListener(function(t, e, n) {
    "getimg" == t.action && n(dataUrl + "img.php?c=" + cid)
}), chrome.alarms.create("checkSignals", {
    periodInMinutes: 1
});