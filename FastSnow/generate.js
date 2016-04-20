var SNOW_URL = "https://bournemouth.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=3f1dd0320a0a0b99000a53f7604a2ef9"

// all the form ids for the webpage
var FORM_IDS = ["IO:3f61cee5bdbf99809697450f69dd30de",
                "IO:abbd279ff5d29440b892fe83220c6547",
                "sys_display.IO:f5be279ff5d29440b892fe83220c65b6",
                "IO:1d9f924a0a0a3c740029d4840766cbb9",
                "sys_display.IO:5e15c28c8c599c00483188886d6e3d5b",
                "sys_display.IO:b3ac5b833130590096978c2dfc0d8139",
                "IO:3f2569920a0a0b990040d537cfc707f2",
                "IO:3f272c500a0a0b990059c24380a2bc02",
                "IO:1d9f924a0a0a3c740029d4840766cbb9",
                "sys_display.IO:1d9d17bc0a0a3c74018847effca72444"
              ];

/**
 * Generates the url with all the formIDs and values
 */
function generate()
{
  if (document.URL == SNOW_URL){
    var FORM_IDS_LEN = FORM_IDS.length

    var url = SNOW_URL.concat("#"); // add hash to the end of the url

    for (var i = 0; i < FORM_IDS_LEN; i++) {
      // ensure the value is encoded to make URL compatible symbols present
      var url = url + FORM_IDS[i] + "=" + encodeURIComponent(document.getElementById(FORM_IDS[i]).value);

      if (i < FORM_IDS_LEN-1) {
        var url = url + "&"; // attach a & at the end of each statement except last
      }
    }
  }
  else{
    var url = "Website isn't proper SNOW Page.\n Make sure to use the SNOW Page button above to access the right page.";
  }

  return url;
}

var url = generate();
url // returns the value to the callback (no ; at the end of statement)
