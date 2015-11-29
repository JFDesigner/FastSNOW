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

function generate(id) {
  chrome.tabs.executeScript(id,{file: 'generate.js'}, function(url){
    document.getElementById("urlBox").value=url;
  });
}



document.addEventListener('DOMContentLoaded', function () {
  getCurrentTabID(function(id){

    var insertBut = document.getElementById("insert");
    var copyBut = document.getElementById("copy");

    if(localStorage.getItem('url') !== "") {
      document.getElementById('urlBox').value = localStorage.getItem('url');
    }

    insertBut.addEventListener('click', function(){
      chrome.tabs.executeScript(id,{file: 'parse.js'});
    });

    copyBut.addEventListener('click', function() {generate(id);});

    var clearBut = document.getElementById("clear");

    clearBut.addEventListener('click', function(){
      document.querySelector('.js-copytextarea').value = "";
    })


    var copyTextareaBtn = document.querySelector('.js-textareacopybtn');

    copyTextareaBtn.addEventListener('click', function(event) {
      var copyTextarea = document.querySelector('.js-copytextarea');
      copyTextarea.select();
      var finalMessage = "";
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        finalMessage = 'Copying was ' + msg;
      } catch (err) {
        finalMessage = 'Oops, unable to copy';
      }
      document.getElementById('errorMessage').innerHTML = finalMessage
    });

    var bitlyLink = document.querySelector('.bitly');
    bitlyLink.addEventListener('click', function(event){
      chrome.tabs.create({url: bitlyLink.getAttribute('href')});
    });

    var snowLink = document.getElementById('snow');
    snowLink.addEventListener('click', function(event){
      chrome.tabs.create({url: snowLink.getAttribute('href')});
    });
  });

});

window.addEventListener("unload", function(event) {
   var savedText = document.getElementById('urlBox').value;
   localStorage.setItem('url', savedText);
}, true);
