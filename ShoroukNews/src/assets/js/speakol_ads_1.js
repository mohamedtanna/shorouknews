(function(d, s, wid, eid) {
    var scriptId = "spk-script-" + eid;
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(scriptId)) return;
    js = d.createElement(s);
    js.scriptId = scriptId;
    js.async = 1;
    js.src = "https://crawler.speakol.com/sdk/speakol-widget.js?wid=" + wid + "&eid=" + eid;
    fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "wi-1776", "spk-wi-1776");