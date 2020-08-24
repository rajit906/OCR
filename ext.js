var getTextFromImage = function (imageUrl) {
  var apiUrl = "http://image-to-text.b3n5jnhe58.us-west-2.elasticbeanstalk.com/api/v1/ocr/url/";
  // alert('Getting text for imageUrl: ' + imageUrl);

  var request = new XMLHttpRequest();

  request.onreadystatechange = function () { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE) {
      var imageText = '';
      if (this.status === 200) {
        imageText = this.responseText;
      } else {
        imageText = 'Failed to get text, response status: ' + this.status;
      }
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {imageText: imageText});
      });
    }
  };

  // Open a new connection, using the POST request on the URL endpoint
  request.open('POST', apiUrl, true);

  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Send request
  request.send('url=' + encodeURIComponent(imageUrl));
};

chrome.contextMenus.create({
  title: "Get Text",
  contexts: ["all"]
});

// "activeTab" permission is sufficient for this:
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  chrome.tabs.executeScript(tab.id, {file: "manipulateDOM.js"});
  
  var srcUrl = null;
  if (info.hasOwnProperty('srcUrl')) {
    srcUrl = info.srcUrl;
  }
  if (srcUrl) {  
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {'srcUrl': srcUrl});
      });
  }
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    getTextFromImage(request.imageUrl);
  });