var myExtObject = (function() {

    return {
        func3: function(d, s, wid, eid) {
            var scriptId = "spk-script-" + eid;
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(scriptId)) {            
                d.removeChild(d.getElementById(scriptId));
            };
            if(!!d.getElementById(eid)){
                d.getElementById(eid).innerHTML = "";
            }
            js = d.createElement(s);
            js.scriptId = scriptId;
            js.async = 1;
            js.src = "https://crawler.speakol.com/sdk/speakol-widget.js?wid=" + wid + "&eid=" + eid;
            fjs.parentNode.insertBefore(js, fjs);
        },
        func2: function() {
            alert('function 2 called');
        }
    }
  
  })(myExtObject||{});
  myExtObject.func3(document, "script", "wi-2410", "spk-wi-2411");

(function(d, s, wid, eid) {
    var scriptId = "spk-script-" + eid;
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(scriptId)) return;
    js = d.createElement(s);
    js.scriptId = scriptId;
    js.async = 1;
    js.src = "https://crawler.speakol.com/sdk/speakol-widget.js?wid=" + wid + "&eid=" + eid;
    fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "wi-2467", "spk-wi-2467");