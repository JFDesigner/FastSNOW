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
