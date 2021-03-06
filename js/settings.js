var Settings = function() {
    this.data = null
};
/**
 * Функции реализации настроек
 */
Settings.prototype = {
    save: function(t) {
        chrome.storage.local.set({
            settings: t
        }, function() {
            console.log("Data stored to chrome.storage.local")
        })
    },
    _setDefaults: function() {
        void 0 !== this.data && this.data.hasOwnProperty("pairs") || (this.data = {
            pairs: [{
                from: "BTC",
                to: "USD"
            }, {
                from: "LTC",
                to: "USD"
            }, {
                from: "ETH",
                to: "RUR"
            }, {
                from: "DGB",
                to: "USD"
            }]
        }, this.save(this.data)), this.data.hasOwnProperty("signals") || (this.data.signals = {}, this.save(this.data)), this.data.hasOwnProperty("bag") || (this.data.bag = [], this.save(this.data))
    },
    getSettings: function() {
        var t = $.Deferred();
        return chrome.storage.local.get("settings", function(a) {
            this.data = a.settings, this._setDefaults(), t.resolve(this.data)
        }.bind(this)), t.promise()
    },
    addSignal: function(t, a) {
        this.data.signals[t] = a, this.save(this.data)
    },
    addBagItem: function(t) {
        this.data.bag.push(t), this.save(this.data)
    },
    removeBagItem: function(t) {
        for (var a = 0; a < this.data.bag.length; a++)
            if (this.data.bag[a].adding_date === t) {
                this.data.bag.splice(a, 1);
                break
            }
        this.save(this.data)
    },
    removeSignalsItem: function(t) {
        delete this.data.signals[t], this.save(this.data)
    },
    saveLocale: function(t) {
        this.data.locale = t, this.save(this.data)
    }
};