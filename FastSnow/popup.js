// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var APIKEY = "AIzaSyA9lqIzivT4R_ZP_F8TrYl3dlTuKzn-MZw";
var PARSER = document.createElement('a');
var SNOW_URL = "https://bournemouth.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=3f1dd0320a0a0b99000a53f7604a2ef9";
var SNOW_HOST = "bournemouth.service-now.com";
var GITHUB_INFO = "https://github.com/JFDesigner/FastSNOW/blob/master/README.md";

/**
 * Get the current tab ID.
 *
 * @param {function(string)} callback - called when the ID of the current tab
 *   is found.
 */
function getCurrentTabID(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };
    chrome.tabs.query(queryInfo, function(tabs) {
      // chrome.tabs.query invokes the callback with a list of tabs that match the
      // query. When the popup is opened, there is certainly a window and at least
      // one tab, so we can safely assume that |tabs| is a non-empty array.
      // A window can only have one active tab at a time, so the array consists of
      // exactly one tab.
      var tab = tabs[0];

      // A tab is a plain object that provides information about the tab.
      // See https://developer.chrome.com/extensions/tabs#type-Tab
      var id = tab.id;

      callback(id);
    });

    // Most methods of the Chrome extension APIs are asynchronous. This means that
    // you CANNOT do something like this:
    //
    // var url;
    // chrome.tabs.query(queryInfo, function(tabs) {
    //   url = tabs[0].url;
    // });
    // alert(url); // Shows "undefined", because chrome.tabs.query is async.
  }

  function getCurrentTabUrl(callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
      active: true,
      currentWindow: true
    };
      chrome.tabs.query(queryInfo, function(tabs) {
        // chrome.tabs.query invokes the callback with a list of tabs that match the
        // query. When the popup is opened, there is certainly a window and at least
        // one tab, so we can safely assume that |tabs| is a non-empty array.
        // A window can only have one active tab at a time, so the array consists of
        // exactly one tab.
        var tab = tabs[0];

        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        var url = tab.url;

        callback(url);
      });
    }


/**
 * Runs the generate script on generate button press and stores the value
 * in the urlBox
 *
 * @param  integer - the tab id for the script to execute on
 */
function generate(id) {
  chrome.tabs.executeScript(id,{file: 'generate.js'}, function(url){
        document.getElementById('errorMessage').innerHTML = "";
        var infoDiv = document.getElementById("urlBox");
        infoDiv.value = url;
      });
};

/**
 * Simply clears the error messge in the htnl
 */
function clearErrorMsg() {
  document.getElementById('errorMessage').innerHTML = "";
}

/**
* Shortens the url and stores it in the url box
*/
function shortenUrl(event) {
  // Set the api key for the gapi client
  gapi.client.setApiKey(APIKEY);

  clearErrorMsg();

  // Get the url value from the url box
  url = document.getElementById("urlBox").value;

  // Use the parser to check that the url isn't already a shortened link
  PARSER.href=url;
  if(PARSER.hostname !== "goo.gl"){
    // Load the api and create the request with the url inside the urlBox
    gapi.client.load("urlshortener", "v1", function(){
      var request = gapi.client.urlshortener.url.insert({
        resource: {
          longUrl: url
        }
      });

      // Execute the request
      request.execute(function(response) {
        // get the ShortUrl value stored as id
        var shortUrl = response.id;
        // check if request executed properly
        if(shortUrl != null) {
          // Get the url box and set the value
          var urlBox = document.getElementById("urlBox");
          urlBox.value = shortUrl;
        }
        else {
          // Show the error message in the window
          var errorMsg = document.getElementById('errorMessage');
          errorMsg.innerHTML = "Error creating Short Url-> " + response.error.code + ": " + response.error.message;
        }
    });
  });
}
};

/**
 * Waits for the popup html to finish loading on button click and loads
 * all the event listeners.
 *
 */
document.addEventListener('DOMContentLoaded', function () {
  getCurrentTabID(function(id){
    // add Google Api to the headers of the popup page
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://apis.google.com/js/client.js?onload=callbackFunction";
    head.appendChild(script);

    // Gets the last url value from local storage if it exists
    var urlBox = document.getElementById('urlBox');
    if(localStorage.getItem('url') !== "") {
      urlBox.value = localStorage.getItem('url');
    }

    // Gets the last error message from local storage if it exists
    var errorMsg = document.getElementById('errorMessage')
    if(localStorage.getItem('errMsg') !== "") {
      errorMsg.innerHTML = localStorage.getItem('errMsg');
    }

    // Execute parse.js on click of insertButton
    var insertBtn = document.getElementById("insert");
    insertBtn.addEventListener('click', function(){
      clearErrorMsg();
      chrome.tabs.executeScript(id,{file: 'parse.js'});
    });

    // Execute generate function on click of copyButton
    var copyBtn = document.getElementById("copy");
    copyBtn.addEventListener('click', function() {
      getCurrentTabUrl(function(url){
        // parse the current tab url to ensure it is a bournemouth snow link
        PARSER.href = url;
        if(PARSER.hostname !== SNOW_HOST){
          errorMsg.innerHTML = "Error: Generating url only works at SNOW links!";
        }
        else {
          // genreate the url from the current tab using the id
          clearErrorMsg();
          generate(id);
        }
      });
    });

    // Clears the urlBox to nothing
    var clearBtn = document.getElementById("clear");
    clearBtn.addEventListener('click', function(){
      errorMsg.innerHTML = "";
      urlBox.value = "";
    })

    // Clears the errmsg to nothing
    var clearErrMsgBtn = document.getElementById("clearErrMsg");
    clearErrMsgBtn.addEventListener('click', clearErrorMsg());

    // add a click event listener for the copy button to copy the text
    // from the text box to the clipboard
    var copyUrlBtn = document.getElementById('urlCopyBtn');
    copyUrlBtn.addEventListener('click', function(event) {
      urlBox.select();
      var finalMessage = "";
      try {
        // execute copy command. Might not work on all browsers.
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        finalMessage = 'Copying was ' + msg;
      } catch (err) {
        finalMessage = 'Oops, unable to copy';
      }
      errorMsg.innerHTML = finalMessage
    });

    // add a click event listener for the shorten url button
    var shortUrlBtn = document.getElementById("urlShortBtn");
    shortUrlBtn.addEventListener('click', shortenUrl);

    // add a click event listener for the snow button
    var snowBtn = document.getElementById('snowBtn');
    snowBtn.addEventListener('click', function(event){
      chrome.tabs.create({url: SNOW_URL});
    });
    
    // add a click event listener for the info button
    var infoBtn = document.getElementById('infoBtn');
    infoBtn.addEventListener('click', function(event){
      chrome.tabs.create({url: GITHUB_INFO});
    });


  });

});

/**
 * Waits for popup close and stores the current url into local storage
 */
window.addEventListener("unload", function(event) {
   var urlSavedText = document.getElementById('urlBox').value;
   var errMessageText = document.getElementById('errorMessage').innerHTML;
   localStorage.setItem('url', urlSavedText);
   localStorage.setItem('errMsg', errMessageText);
}, true);
