chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ locked: true });
});
chrome.tabs.onCreated.addListener(function(tab){
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: showelock
  });

});
function showelock(){
  chrome.runtime.sendMessage({ type: 'lockBrowser' });
  
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'checkPassword') {
    chrome.storage.local.get(['password'], (result) => {
      if (result.password === message.password) {
        chrome.storage.local.set({ locked: false });
        sendResponse({ success: true });
      } else {
        sendResponse({ success: false });
      }
    });
    return true; // Keeps the message channel open for sendResponse
  } else if (message.type === 'lockBrowser') {
    chrome.storage.local.set({ locked: true });
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });
      });
    });
  }
});

chrome.tabs.onActivated.addListener(() => {
  chrome.storage.local.get(['locked'], (result) => {
    if (result.locked) {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
          });
        });
      });
    }
  });
});