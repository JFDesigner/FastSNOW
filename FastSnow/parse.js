// window.location.hash returns the hash suffix of the url for hte current page
var hashParams = window.location.hash.substr(1).split('&'); // substr(1) to remove the `#`
if (hashParams[0] != ""){
    // loops through splitting the id and value
    for(var i = 0; i < hashParams.length; i++){
        var p = hashParams[i].split('=');
        // decode the URI into readable text
        document.getElementById(p[0]).value = decodeURIComponent(p[1]);
    }
}
// Used to verify the service affected error where the value must be checked in
// in the text box by focus and un-focusing the text box
if (window.location.host == "bournemouth.service-now.com") {
  var serAff = document.getElementById("sys_display.IO:b3ac5b833130590096978c2dfc0d8139");
  var prevInc = document.getElementById("IO:1d9f924a0a0a3c740029d4840766cbb9");
  var prevIncNum = document.getElementById("sys_display.IO:1d9d17bc0a0a3c74018847effca72444");
  var locationBox = document.getElementById("sys_display.IO:f5be279ff5d29440b892fe83220c65b6");
  var assetNumBox = document.getElementById("sys_display.IO:5e15c28c8c599c00483188886d6e3d5b");

  var highlights = [serAff, prevInc, prevIncNum, locationBox, assetNumBox];

  var changeEvent = document.createEvent("HTMLEvents");
  changeEvent.initEvent("change", true, true);
  prevInc.dispatchEvent(changeEvent);

  for (var i = 0; i<highlights.length; i++) {
    highlights[i].focus();
    highlights[i].blur();
  }

  document.getElementById("submit_button").focus();
}
