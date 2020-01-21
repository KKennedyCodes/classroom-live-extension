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