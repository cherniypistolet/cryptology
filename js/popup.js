function showLoading(e) {
    var t = new Spinner;
    return t.spin(), (e || $("#main")).append(t.el), t
}

function formatBagItemTime(e) {
    return moment.unix(e).format("DD.MM.YY - H:mm")
}
/**
 * Реализация переводчка
 *
 * Переменные для работы
 *
 *@var c, r, n, t, g;
 *
 * Переменные для даты
 *@var p, e, h;
 */
function getBagItemPercentage(e, t, n, a) {
    var c;
    try {
        c = e[t].tickers[n].price
    } catch (e) {
        return "null"
    }
    var r = (100 * (parseFloat(c) - parseFloat(a)) / parseFloat(a)).toFixed(2);
    return (r <= 0 ? "" : "+") + r
}
var locale;
$(function() {
    function e(e, t) {
        var n = Locales[locale];
        n.locales = locale, g.empty(), g.html(f[e](t, {
            data: {
                intl: n
            }
        }))
    }

    function t() {
        h.getSettings().done(function(e) {
            locale = e.locale;
            var t = Locales[e.locale];
            t.locales = e.locale, $("body").html(f.main({
                locale: t.title,
                Locales: Locales
            }, {
                data: {
                    intl: t
                }
            })), $(".locale").click(function() {
                $(this).find(".drop").slideToggle(400), $(this).toggleClass(".show_drop")
            }), $(".drop li").click(function() {
                h.saveLocale($(this).data("id")), location.reload(!0)
            }), $(".header li").click(function(e) {
                e.preventDefault(), {
                    1: r,
                    2: u,
                    3: d,
                    4: i,
                    5: o
                }[$(e.target).data("id")]()
            }), g = $("#main"), r()
        })
    }

    function n(e, t) {
        var n = $(".par_items");
        if (e) n.empty(), n.html(f.pair({
            editmode: !0,
            data: p,
            pairs: t
        }));
        else {
            var a = showLoading(n),
                c = [];
            $.each(t, function(e, t) {
                c.push($.getJSON(m + t.from + "-" + t.to + "?tpl=%s"))
            }), $.when.apply($, c).done(function() {
                for (var e = [], c = 0; c < t.length; c++) e.push(arguments[c][0]);
                a.stop(), n.empty(), n.html(f.pair({
                    editmode: !1,
                    data: e
                }))
            })
        }
    }

    function a(e, t) {
        var n = 0,
            a = 0,
            c = $.Deferred();
        return $.when($.getJSON(m + "BTC-" + e + "?tpl=%s"), $.getJSON(m + "BTC-" + t + "?tpl=%s")).done(function(e, t) {
            e && e.hasOwnProperty("success") && (n = e.ticker.price), t && t.hasOwnProperty("success") && (a = t.ticker.price)
        }), 0 !== a && 0 !== n && c.resolve(a / n), c.promise()
    }

    function c(e) {
        var t, n, c = $("#field1"),
            r = $("#field2"),
            i = $(e).parent().closest("div[id]").attr("id");
        "row1" === i ? (t = $("#row2 select").find(":selected").text().split("(")[0].trim(), n = $("#row1 select").find(":selected").text().split("(")[0].trim()) : (t = $("#row1 select").find(":selected").text().split("(")[0].trim(), n = $("#row2 select").find(":selected").text().split("(")[0].trim()), $.getJSON(m + n + "-" + t + "?tpl=%s", function(e) {
            if (e && e.hasOwnProperty("success"))
                if (e.success) {
                    var o = e.ticker.price,
                        s = "row1" == i ? c.val() * o : r.val() * o;
                    (isNaN(s) || "" == s) && (s = 0), "row1" == i ? r.val(s) : c.val(s)
                } else e.hasOwnProperty("error") && "Pair not found" == e.error && a(n, t)
        })
    }

    function r() {
        $("#main").empty();
        var t = showLoading();
        $.getJSON("https://api.cryptonator.com/api/currencies", function(a) {
            p = a, e("courses", a.rows), h.getSettings().done(function(e) {
                n(!1, e.pairs)
            });
            var r = $(".basic").select2();
            setTimeout(function() {
                t.stop(), $(".sel:first select").val("BTC"), $(".sel:eq(1) select").val("USD"), r.trigger("change"), r.on("change", function() {
                    console.log("change"), c(this)
                }), $("#field1, #field2").keyup(function(e) {
                    c(e.target)
                })
            }, 0), $("#edit_pairs").click(function(e) {
                e.preventDefault(), h.getSettings().done(function(t) {
                    $(".par_item .pair_item_span").length ? ($(e.target).text(Locales[locale].messages.courses.l6), n(!0, t.pairs)) : (h.data.pairs = [], $(".par_item").each(function() {
                        var e = $(this).find("select option:selected").map(function() {
                            return $(this).val()
                        }).get();
                        h.data.pairs.push({
                            from: e[0],
                            to: e[1]
                        })
                    }), h.save(h.data), $(e.target).text(Locales[locale].messages.courses.l5), n(!1, t.pairs));
                    $(".basic").select2();
                    $(".basic").trigger("change")
                }.bind(this))
            })
        })
    }

    function i() {
        $("#main").empty();
        var t = showLoading();
        $.getJSON("https://coinstorm.cc/news2/json", function(n) {
            t.stop(), console.log($.map(n, function(e, t) {
                return $.extend(e, {
                    summ: e.sum
                })
            })), e("ico", $.map(n, function(e, t) {
                return $.extend(e, {
                    summ: e.sum
                })
            }))
        })
    }

    function o() {
        $("#main").empty();
        var t = showLoading();
        $.getJSON("https://coinstorm.cc/news1/json", function(n) {
            t.stop(), e("news", n), $(".mCustomScrollbar").mCustomScrollbar()
        })
    }

    function s() {
        $(".remove-bag-item").click(function(e) {
            e.preventDefault(), console.log("remove");
            var t = $(e.target).data("id");
            h.removeBagItem(t), $(e.target).parents().closest("tr").remove()
        })
    }

    function l() {
        $(".remove-signals-item").click(function(e) {
            e.preventDefault(), console.log("remove");
            var t = $(e.target).data("id");
            h.removeSignalsItem(t), $(e.target).parents().closest("tr").remove()
        })
    }

    function d() {
        $("#main").empty();
        var t = new Exchanges,
            n = showLoading();
        h.getSettings().done(function(a) {
            t.getExchanges().done(function(c) {
                var r = Object.keys(c)[0],
                    i = c[r],
                    o = Object.keys(i.tickers)[0];
                n.stop(), t.preloadSignalsPrices(a.signals, function() {
                    e("signals", {
                        exchanges: c,
                        currencies: Object.keys(i.tickers),
                        price: t.data[r].tickers[o].price,
                        signals: a.signals
                    }), $(".bottom_table").mCustomScrollbar();
                    var n = $("#currencyselect").select2(),
                        s = $("#exchangeselect").select2(),
                        d = $("#conditionselect").select2(),
                        u = $("#price_expected");
                    n.on("change", function() {
                        t.getPrice(s.find(":selected").text(), this.value).done(function(e) {
                            u.val(e)
                        })
                    }), s.on("change", function() {
                        n.empty(), $.each(t.data[this.value].tickers, function(e, t) {
                            n.append($("<option>", {
                                value: e,
                                text: e
                            }))
                        }), n.trigger("change"), t.getPrice(this.value, n.find(":selected").text()).done(function(e) {
                            u.val(e)
                        })
                    }), l(), $("#add_signal").click(function(e) {
                        e.preventDefault();
                        var a = {
                            currency: n.find(":selected").text(),
                            exchange: s.find(":selected").text(),
                            price_expected: u.val(),
                            condition: d.find(":selected").text()
                        };
                        console.log(a), "" !== a.exchange && "" !== a.currency && "" !== a.price_expected && (h.addSignal((new moment).unix(), a), t.getExchanges().done(function(e) {
                            t.getPrice(a.exchange, a.currency).done(function(t) {
                                $("tbody").append("<tr></tr><td>" + a.currency + "</td><td>" + a.exchange + "</td><td>" + a.price_expected + "</td><td>" + a.condition + "</td><td>" + e[a.exchange].tickers[a.currency].price + '</td><td><a href="#" class="remove-signals-item" >' + Locales[locale].messages.signals.l11 + "</a></td></tr>"), l()
                            })
                        }))
                    })
                }.bind(this), r, o)
            })
        })
    }

    function u() {
        $("#main").empty();
        var t = new Exchanges,
            n = showLoading();
        h.getSettings().done(function(a) {
            t.getExchanges().done(function(c) {
                var r = Object.keys(c)[0],
                    i = c[r],
                    o = Object.keys(i.tickers)[0];
                n.stop(), t.preloadBagPrices(a.bag, function() {
                    e("bag", {
                        exchanges: c,
                        currencies: Object.keys(i.tickers),
                        price: t.data[r].tickers[o].price,
                        bag: a.bag
                    }), $("#mCSB_1_container").mCustomScrollbar();
                    var n = $("#currencyselect").select2(),
                        l = $("#exchangeselect").select2(),
                        d = $("#summa"),
                        u = $("#price"),
                        g = $("#date");
                    n.on("change", function() {
                        t.getPrice(l.find(":selected").text(), this.value).done(function(e) {
                            u.val(e)
                        })
                    }), l.on("change", function() {
                        n.empty(), $.each(t.data[this.value].tickers, function(e, t) {
                            n.append($("<option>", {
                                value: e,
                                text: e
                            }))
                        }), n.trigger("change")
                    }), s(), $("#add_bagitem").click(function(e) {
                        e.preventDefault();
                        var a = {
                            currency: n.find(":selected").text(),
                            exchange: l.find(":selected").text(),
                            price: u.val(),
                            total: d.val(),
                            date: g.val(),
                            adding_date: (new moment).unix(),
                            prices: {}
                        };
                        console.log(a), "" !== a.exchange && "" !== a.currency && "" !== a.price && "" !== a.sum && "" !== a.date && t.getExchanges().done(function(e) {
                            t.getPrice(a.exchange, a.currency).done(function(t) {
                                a.prices[(new moment).unix()] = t, h.addBagItem(a), $("tbody").append("<tr></tr><td>" + a.currency + "</td><td>" + a.exchange + "</td><td>" + a.total + "</td><td>" + a.price + "</td><td>" + a.date + "</td><td>" + getBagItemPercentage(e, a.exchange, a.currency, a.price) + '%</td><td><a href="#" class="remove-bag-item" >' + Locales[locale].messages.bag.l16 + "</a></td></tr>"), s()
                            })
                        })
                    })
                }.bind(this), r, o)
            })
        })
    }
    var g, p, m = "https://api.cryptonator.com/api/ticker/extension/",
        f = {
            main: null,
            news: null,
            ico: null,
            courses: null,
            pair: null,
            signals: null,
            signals_item: null,
            bag: null,
            bag_item: null,
            graph: null
        },
        h = new Settings;
    h.getSettings().done(function(e) {
        locale = e.locale, Locales[e.locale].locales = e.locale;
        var n = [];
        $.each(f, function(e, t) {
            n.push($.get("/templates/" + e + ".hbs", "text"))
        }), $.when.apply($, n).done(function() {
            var e = Array.prototype.slice.call(arguments),
                n = 0;
            $.each(f, function(t, a) {
                "signals_item" === t ? Handlebars.registerPartial("signals_item", e[n][0]) : "bag_item" === t && Handlebars.registerPartial("bag_item", e[n][0]), f[t] = Handlebars.compile(e[n][0]), n++
            }), t()
        })
    })
}), Handlebars.registerHelper("formatICOTime", function(e) {
    var t = moment(new Date),
        n = moment.unix(e),
        a = moment.duration(n.diff(t));
    console.log(a);
    var c = Locales[locale].messages.ico;
    return a._milliseconds < 0 ? c.outdatedWord : moment.duration(a, "minutes").format("d[d] h[h] m[m]".replace("[d]", "[" + c.day + "]").replace("[h]", "[" + c.hour + "]").replace("[m]", "[" + c.minute + "]"))
}), Handlebars.registerHelper("times", function(e, t) {
    for (var n = "", a = 0; a < e; ++a) n += t.fn(a);
    return n
}), Handlebars.registerHelper("roundTo", function(e, t) {
    return parseFloat(e).toFixed(t)
}), Handlebars.registerHelper("getSignalCurrPrice", function(e, t, n) {
    try {
        return e[t].tickers[n].price
    } catch (e) {
        return null
    }
}), Handlebars.registerHelper("getBagItemPercentage", function(e, t, n, a) {
    return getBagItemPercentage(e, t, n, a)
}), H.registerHelpers(Handlebars), moment.locale("ru"), HandlebarsIntl.registerWith(Handlebars);