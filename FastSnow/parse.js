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
  serAff.focus();
  serAff.blur();
  document.getElementById("submit_button").focus();
}
