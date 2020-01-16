let userName = localStorage.getItem('receivedName');
let userStatus = localStorage.getItem('receivedStatus');
let userComment = localStorage.getItem('receivedComment');
let userSession = localStorage.getItem('receivedSession');
// let statusColor = document.getElementById('status-input').value;

if (userName == null || userName == "") {
  userName = "friend";
}

if (userStatus == null) {
  userStatus = "not submitted";
}

if (userComment == null) {
  userStatus = "not submitted";
}

if (userSession == null) {
  userStatus = "not submitted";
}

function changeName() {
  console.log("storing data");
  userName = document.getElementById("name-input").value;
  userStatus = document.getElementById("status-input").value;
  userComment = document.getElementById("comment-input").value;
  userSession = document.getElementById("session-input").value;
}


document.getElementById("submitJson").addEventListener('click', function(e) {
  e.preventDefault()
  changeName();
  console.log("Submitting Data");

  const req = new XMLHttpRequest();
  const baseUrl = "https://classroomlive-basic-api.herokuapp.com/posts";
  const urlParams = `username=${userName}&comment=${userComment}&status=${userStatus}&session_id=${userSession}`;

  console.log(baseUrl);
  console.log(urlParams);

  req.open("POST", baseUrl, true);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.send(urlParams);

  req.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          console.log("Got response 200!");
      }
  }
  document.getElementById("name-form").reset();
});




// function onPageDetailsReceived(pageDetails) {
//   document.getElementById('title').value = pageDetails.title;
//   document.getElementById('url').value = pageDetails.url;
//   document.getElementById('summary').value = pageDetails.summary;
// }

// // Listen for page to connect.
// chrome.runtime.onConnect.addListener(function (port) {
//  console.log("Dropdown Running");
//   if (port.name === "page") {
//     console.log("Received page port");
//     port.onMessage.addListener(function (message) {
//       if (message.name === "query_error") {
//         alert("Error retrieving " + message.query + "!\n" + message.reason + " was not found.");
//       } else if (message.name === "query_response") {
//         alert("Retrieved value for " + message.query + ": " + message.value);
//       }
//     });
//     // Set button listener.
//     document.getElementById("submitJson").addEventListener("click", function (e) {
//       let value = document.getElementById("jsonName").value;
//       if (value !== "") {
//         port.postMessage({
//           name: "query",
//           query: value
//         });
//       } else {
//         alert("You must enter a value!");
//       }
//     });
//   } else {
//     console.warn("Received unknown port.");
//   }
// });

// window.addEventListener('load', function(evt) {
//   chrome.runtime.getBackgroundPage(function(eventPage) {
//     eventPage.getPageDetails(onPageDetailsReceived);
//   });
// });

// document.addEventListener('DOMContentLoaded', function() {
//   let checkPageButton = document.getElementById('checkPage');
//   checkPageButton.addEventListener('click', function() {

//     chrome.tabs.getSelected(null, function(tab) {
//       d = document;

//       let f = d.createElement('form');
//       f.action = 'https://classroomlive-basic-api.herokuapp.com/posts';
//       f.method = 'post';
//       let i = d.createElement('input');
//       i.type = 'hidden';
//       i.name = 'url';
//       i.value = tab.url;
//       f.appendChild(i);
//       d.body.appendChild(f);
//       f.submit();
//     });
//   }, false);
// }, false);