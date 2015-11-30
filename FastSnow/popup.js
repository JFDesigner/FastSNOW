// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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

/**
 * Runs the generate script on generate button press and stores the value
 * in the urlBox
 *
 * @param  integer - the tab id for the script to execute on
 */
function generate(id) {
  chrome.tabs.executeScript(id,{file: 'generate.js'}, function(url){
    document.getElementById("urlBox").value=url;
  });
}


/**
 * Waits for the popup html to finish loading on button click and loads
 * all the event listeners.
 *
 */
document.addEventListener('DOMContentLoaded', function () {
  getCurrentTabID(function(id){

    var insertBut = document.getElementById("insert");
    var copyBut = document.getElementById("copy");
    var clearBut = document.getElementById("clear");

    var copyUrlBtn = document.getElementById('urlCopyBtn');

    var urlBox = document.getElementById('urlBox');

    var errorMsg = document.getElementById('errorMessage')

    // Gets the last url value from local storage if it exists
    if(localStorage.getItem('url') !== "") {
      urlBox.value = localStorage.getItem('url');
    }

    // Execute parse.js on click of insertButton
    insertBut.addEventListener('click', function(){
      chrome.tabs.executeScript(id,{file: 'parse.js'});
    });

    // Execute generate function on click of copyButton
    copyBut.addEventListener('click', function() {generate(id);});

    // Clears the urlBox to nothing
    clearBut.addEventListener('click', function(){
      urlBox.value = "";
    })


    // add a click event listener for the copy button to copy the text
    // from the text box to the clipboard
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

    // Add the hyperlink to the link shortener
    var shortLink = document.getElementById('linkShort');
    shortLink.addEventListener('click', function(event){
      chrome.tabs.create({url: shortLink.getAttribute('href')});
    });

    // Add the hyperlink to the snow page
    var snowLink = document.getElementById('snow');
    snowLink.addEventListener('click', function(event){
      chrome.tabs.create({url: snowLink.getAttribute('href')});
    });
  });

});

/**
 * Waits for popup close and stores the current url into local storage
 */
window.addEventListener("unload", function(event) {
   var savedText = document.getElementById('urlBox').value;
   localStorage.setItem('url', savedText);
}, true);
