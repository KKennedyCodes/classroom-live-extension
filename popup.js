function onPageDetailsReceived(pageDetails) {
  document.getElementById('title').value = pageDetails.title;
  document.getElementById('url').value = pageDetails.url;
  document.getElementById('summary').value = pageDetails.summary;
}

// Listen for page to connect.
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === "page") {
    console.log("Received page port");
    port.onMessage.addListener(function (message) {
      if (message.name === "query_error") {
        alert("Error retrieving " + message.query + "!\n" + message.reason + " was not found.");
      } else if (message.name === "query_response") {
        alert("Retrieved value for " + message.query + ": " + message.value);
      }
    });
    // Set button listener.
    document.getElementById("submitJson").addEventListener("click", function (e) {
      let value = document.getElementById("jsonName").value;
      if (value !== "") {
        port.postMessage({
          name: "query",
          query: value
        });
      } else {
        alert("You must enter a value!");
      }
    });
  } else {
    console.warn("Received unknown port.");
  }
});

window.addEventListener('load', function(evt) {
  chrome.runtime.getBackgroundPage(function(eventPage) {
    eventPage.getPageDetails(onPageDetailsReceived);
  });
});