function openSettings() {
  document.getElementById("settings").classList.toggle("settings-open");
}

let userName = localStorage.getItem('receivedName');
let userStatus = localStorage.getItem('receivedStatus');
let userComment = localStorage.getItem('receivedComment');
let userSession = localStorage.getItem('receivedSession');
// let statusColor = document.getElementById('status-input').value;

if (userName == null) {
  userName = "friend";
}

if (userStatus == null) {
  userStatus = "not submitted";
}

if (userComment == null) {
  userStatus = "not submitted";
}

if (userComment == null) {
  userStatus = "not submitted";
}

function clearStatus(){
  userStatus = "not submitted";
  getGreeting();
  changeColor();
}

document.getElementById("settings-button").addEventListener('click', openSettings)
document.getElementById("clear-settings-button").addEventListener('click', clearStatus)

function saveName() {
  localStorage.setItem('receivedName', userName);
  localStorage.setItem('receivedStatus', userStatus);
  localStorage.setItem('receivedSession', userSession);
  localStorage.setItem('receivedComment', userComment);
}



function changeName() {
  userName = document.getElementById("name-input").value;
  userStatus = document.getElementById("status-input").value;
  userComment = document.getElementById("comment-input").value;
  userSession = document.getElementById("session-input").value;
  saveName();
  getGreeting();
  changeColor();
}

function changeColor() {
  if (userStatus == "working") {
    document.body.style.background = "Chartreuse";
  } else if (userStatus == "stuck") {
    document.body.style.background = "FireBrick";
  } else if (userStatus == "question") {
    document.body.style.background = "Gold";
  }
  else if (userStatus == "done") {
    document.body.style.background = "blue";
  }
  else {
    document.body.style.background = "LightSlateGrey";
  }
}

document.getElementById("name-form").addEventListener('submit', function(e) {
  e.preventDefault()
  changeName();
  // postStatus();

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
});

function getGreeting() {
  document.getElementById("greeting").innerHTML  = `Hello, ${userName}. Your status is ${userStatus}.`;
}

getGreeting();
changeColor();

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {data: text}, function(response) {
//       $('#status').html('changed data in page');
//       console.log('success');
//   });
// });

// function postStatus(){
//   const Url = 'https://classroomlive-basic-api.herokuapp.com/posts';
//   const Data = {
//     username: userName,
//     status: userStatus,
//     comment: userComment,
//     session_id: userSession
//   };

//   const othePram={
//     headers:{
//       "content-type":"application/json: charset=UTF-8"
//     },
//     body:Data,
//     method:"POST"
//     };

//     fetch(Url,othePram)
//     .then((response) => {
//       return response.json();
//     })
//     .then((myJson) =>{
//       console.log(myJson);
//     });
//   }
    // }
    // .then(data=>(return data.json()})
    // .then(res=>(console.log(res)})
    // .catch(error=>console.log(error))

