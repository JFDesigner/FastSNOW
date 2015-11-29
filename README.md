# FastSNOW
A Chrome extension designed with speeding up spamming IT with a complaint that affects multiple people at the NCCA.

##Installation
1. Go to [chrome://extensions](chrome://extensions).
2. Click "Developer mode" in the top right which allows you to Load unpacked extensions.
3. Click "Load unpacked extension..." and locate the FastSnow folder which contains the code.
4. You should now see a Troll Face (placholder icon ;) ) in the toolbar of your browser.

##How to use

###Using a link that has been provided
If someone has supplied you a link, simply click the link and it will take you to the correct page and fill in all the required info for you.

If going to the page asks you to login, do so and repeat the previous step by clicking the link again.

###Generating your own link
Fill in the SNOW page as you would usually. If you don't want people to have your phone number, simply put the Service Desks own extension 65515.

Before submitting, click the plugin icon in the toolbar and proceed by clicking the "Generate" button. This will create the new URL and place it into the Generated URL box. To copy the URL, simply press the Copy URL button. You will see a message appear on screen if this was successful.

It is recommended you shorten the URL using Bitly (with a link provided in the popup) since the links produced are very lengthy. Also, the URL is saved in the box on close of the pop-up, so you don't have to worry if you accidently closed it. There is the option to clear it if necessary.

###Other Notes
How this works is it stores the form ID and value within the URL. This is done by using a hash at the end of URL and using the format of `<formID>=<formValue>&` for each entry that needs to be filled.

This process can be used on any site that doesn't already use hash in the URL. The "Insert URL Values" is for this purpose and can be used on other pages of your choosing. Simply prefix the URL you use to access the sight with a # followed by the form ID on the page and the value.
