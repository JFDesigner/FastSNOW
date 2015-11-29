var SNOW_URL = "https://bournemouth.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=3f1dd0320a0a0b99000a53f7604a2ef9"
var SNOW_HOST = "bournemouth.service-now.com"

var FORM_NAME_IDS = new Array();

FORM_NAME_IDS["isPreventWork"] = "IO:3f61cee5bdbf99809697450f69dd30de";
FORM_NAME_IDS["contactNum"] = "IO:abbd279ff5d29440b892fe83220c6547";
FORM_NAME_IDS["location"] = "sys_display.IO:f5be279ff5d29440b892fe83220c65b6";
FORM_NAME_IDS["isPrevIncident"] = "IO:1d9f924a0a0a3c740029d4840766cbb9";
FORM_NAME_IDS["assetNumber"] = "sys_display.IO:5e15c28c8c599c00483188886d6e3d5b";
FORM_NAME_IDS["serviceAff"] = "sys_display.IO:b3ac5b833130590096978c2dfc0d8139";
FORM_NAME_IDS["shortDesc"] = "IO:3f2569920a0a0b990040d537cfc707f2";
FORM_NAME_IDS["longDesc"] = "IO:3f272c500a0a0b990059c24380a2bc02";

var FORM_IDS = ["IO:3f61cee5bdbf99809697450f69dd30de",
                "IO:abbd279ff5d29440b892fe83220c6547",
                "sys_display.IO:f5be279ff5d29440b892fe83220c65b6",
                "IO:1d9f924a0a0a3c740029d4840766cbb9",
                "sys_display.IO:5e15c28c8c599c00483188886d6e3d5b",
                "sys_display.IO:b3ac5b833130590096978c2dfc0d8139",
                "IO:3f2569920a0a0b990040d537cfc707f2",
                "IO:3f272c500a0a0b990059c24380a2bc02"
              ];

function generate()
{
  var FORM_IDS_LEN = FORM_IDS.length

  var url = SNOW_URL.concat("#");

  for (var i = 0; i < FORM_IDS_LEN; i++) {
    var url = url + FORM_IDS[i] + "=" + encodeURIComponent(document.getElementById(FORM_IDS[i]).value);
    if (i < FORM_IDS_LEN-1) {
      var url = url + "&";
    }
  }
  return url;
  console.log(url);
}

if (SNOW_HOST == window.location.host) {
  var url = generate();
  url
}
else {
  url = "Only works on SNOW links!"
}
