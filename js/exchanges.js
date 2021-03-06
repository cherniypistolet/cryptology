function Exchanges() {
    this.LIST = {
        Poloniex: {
            base: "https://poloniex.com/public?command=returnTicker"
        },
        Bittrex: {
            base: "https://bittrex.com/api/v1.1/public/",
            currencies: "getmarkets",
            price: "getticker?market="
        },
        Bitfinex: {
            base: "https://api.bitfinex.com/v1/",
            currencies: "symbols",
            price: "pubticker/"
        },
        Coinbase: {
            base: "https://api.coinbase.com/v2/exchange-rates?currency=btc"
        },
        YoBit: {
            base: "https://yobit.net/api/3/",
            currencies: "info",
            price: "ticker/"
        }
    }, this.data = {}
}
/**
 * Работа с бандами
 *
 * Переменные с новыми настройками
 *
 *@var i, n, r, c, a, s, t;
 */
Exchanges.prototype = {
    initExchange: function(e) {
        this.data[e] = {};
        var i = this.data[e];
        return i.tickers = {}, i
    },
    getCurrencyName: function(e, i, t) {
        var n = e.toLowerCase(),
            r = i || "",
            c = n.indexOf("btc");
        if (-1 !== c) {
            var a = 0 === c,
                s = a ? e.substring(3 + r.length, e.length) : e.substring(0, n.indexOf(r + "btc"));
            return t && (a = !a), {
                invert: a,
                name: s.toUpperCase()
            }
        }
        return null
    },
    _convertPrice: function(e, i) {
        var t = e ? 1 / i : i;
        return parseFloat(t).toFixed(8)
    },
    callbacks: {
        Poloniex: function(e) {
            var i = arguments.callee.name;
            if (e && !$.isEmptyObject(e)) {
                var t = this.initExchange(i);
                $.each(e, function(e, i) {
                    var n = this.getCurrencyName(e, "_", !0);
                    n && (t.tickers[n.name] = {
                        price: this._convertPrice(n.invert, i.last),
                        invert: n.invert
                    })
                }.bind(this))
            }
        },
        Coinbase: function(e) {
            if (e && !$.isEmptyObject(e.data.rates)) {
                var i = this.initExchange(arguments.callee.name);
                $.each(e.data.rates, function(e, t) {
                    i.tickers[e] = {
                        price: this._convertPrice(!0, t),
                        invert: !0
                    }
                }.bind(this))
            }
        },
        Bitfinex: function(e) {
            if (e && e.length) {
                var i = this.initExchange(arguments.callee.name);
                $.each(e, function(e, t) {
                    var n = this.getCurrencyName(t, "", !1);
                    n && (i.tickers[n.name] = {
                        price: null,
                        pair: t,
                        invert: n.invert
                    })
                }.bind(this))
            }
        },
        Bittrex: function(e) {
            if (e && e.hasOwnProperty("success") && !0 === e.success && e.hasOwnProperty("result") && 0 !== e.result.length) {
                var i = this.initExchange(arguments.callee.name);
                $.each(e.result, function(e, t) {
                    t.hasOwnProperty("BaseCurrency") && "BTC" === t.BaseCurrency && (i.tickers[t.MarketCurrency] = {
                        price: null,
                        pair: "BTC-" + t.MarketCurrency,
                        invert: !1
                    })
                }.bind(this))
            }
        },
        YoBit: function(e) {
            if (e && e.hasOwnProperty("pairs")) {
                var i = this.initExchange(arguments.callee.name);
                $.each(e.pairs, function(e, t) {
                    var n = this.getCurrencyName(e, "_", !1);
                    n && (i.tickers[n.name] = {
                        price: null,
                        pair: e,
                        invert: n.invert
                    })
                }.bind(this))
            }
        }
    },
    getP: function(e, i, t) {
        var n = $.Deferred(),
            r = this.data[i].tickers[e];
        return $.getJSON(this.LIST[i].base + this.LIST[i].price + r.pair, function(e) {
            try {
                r.price = t(r, e), n.resolve(r.price)
            } catch (e) {
                n.resolve(null)
            }
        }.bind(this)).fail(function() {
            n.resolve(null)
        }), n.promise()
    },
    priceCallbacks: {
        Bittrex: function(e, i) {
            return this._convertPrice(e.invert, i.result.Last)
        },
        Bitfinex: function(e, i) {
            return this._convertPrice(e.invert, i.last_price)
        },
        YoBit: function(e, i) {
            return this._convertPrice(e.invert, i[e.pair].last)
        }
    },
    getExchanges: function() {
        var e = $.Deferred(),
            i = 0,
            t = [];
        return $.each(this.LIST, function(e, t) {
            this.data.hasOwnProperty(e) && i++
        }.bind(this)), Object.keys(this.LIST).length === i ? e.resolve(this.data) : ($.each(this.LIST, function(e, i) {
            var n = $.getJSON(i.base + (i.currencies || ""), function(i) {
                this.callbacks[e].bind(this)(i)
            }.bind(this)).fail(function() {
                return console.log(11), !0
            });
            t.push(n)
        }.bind(this)), $.whenAll.apply($, t).done(function() {
            e.resolve(this.data)
        }.bind(this)).fail(function() {
            console.log("fail"), console.log(this.data), e.resolve(this.data)
        }.bind(this))), e.promise()
    },
    getPrice: function(e, i) {
        var t = $.Deferred();
        try {
            null !== this.data[e].tickers[i].price ? t.resolve(this.data[e].tickers[i].price) : this.getP(i, e, this.priceCallbacks[e].bind(this)).done(function(e) {
                t.resolve(e)
            }.bind(this))
        } catch (e) {
            t.resolve(null)
        }
        return t.promise()
    },
    preloadSignalsPrices: function(e, i, t, n) {
        var r = [];
        $.isEmptyObject(e) ? i(null) : ($.each(e, function(e, i) {
            r.push(this.getPrice(i.exchange, i.currency))
        }.bind(this)), r.push(this.getPrice(t, n)), $.whenAll.apply($, r).done(function() {
            i(this.data)
        }.bind(this)).fail(function() {
            console.log("fail in preloadSignalsPrices"), console.log(this.data), i(this.data)
        }.bind(this)))
    },
    preloadBagPrices: function(e, i, t, n) {
        var r = [];
        e.length ? ($.each(e, function(e, i) {
            r.push(this.getPrice(i.exchange, i.currency))
        }.bind(this)), r.push(this.getPrice(t, n)), $.whenAll.apply($, r).done(function() {
            i(this.data)
        }.bind(this)).fail(function() {
            console.log("fail in preloadBagPrices"), i(this.data)
        }.bind(this))) : i(null)
    }
};