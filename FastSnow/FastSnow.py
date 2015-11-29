import urllib


if __name__ == "__main__":

    url = "https://bournemouth.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=3f1dd0320a0a0b99000a53f7604a2ef9"

    isPreventWork = raw_input("Is this issue preventing you from working?(Yes,No) ")
    contactNum = "01202965515"
    location = raw_input("Please confirm the location of the problem: ")
    isPrevIncident = raw_input("Previous incident?(Yes/No) ")
    assetNumber = raw_input("Please enter the asset number e.g. e.g. PC12345 (desktop) or LP12345 (laptop): ")
    serviceAff = raw_input("Service Affected: ")
    shortDesc = raw_input("Short description: ")
    longDesc = raw_input("Please describe your issue below: ")

    ids = [ ("IO:3f61cee5bdbf99809697450f69dd30de", isPreventWork),
            ("IO:abbd279ff5d29440b892fe83220c6547", contactNum),
            ("sys_display.IO:f5be279ff5d29440b892fe83220c65b6", location),
            ("IO:1d9f924a0a0a3c740029d4840766cbb9",isPrevIncident),
            ("sys_display.IO:5e15c28c8c599c00483188886d6e3d5b",assetNumber),
            ("sys_display.IO:b3ac5b833130590096978c2dfc0d8139", serviceAff),
            ("IO:3f2569920a0a0b990040d537cfc707f2", shortDesc),
            ("IO:3f272c500a0a0b990059c24380a2bc02", longDesc) ]

    url += "#"
    lenIds = len(ids)
    i=0

    for form, value in ids:
        url += form + "=" + value.replace(" ", "%20").replace(r"\n", "%0A")
        if i < len(ids)-1:
            url += "&"
        i += 1

    print url

