// Create a list of the video catalogue - 6 videos
video_list = [
    "https://archive.org/download/jabludbael49ukar0kowedengduet/1.mp4",
    "https://archive.org/download/NuclearExplosion/NuclearExplosionwww.keepvid.com_512kb.mp4",
    "https://archive.org/download/BestSmuleKhaiBaharDanShimaUpdate2016/Berharap%20Kau%20Setia%20%28Smule%29%20-%20Qaisara%20Syafiza%20%26%20Khai%20Bahar.mp4",
    "https://archive.org/download/vodkabuild/marad.mp4",
    "https://archive.org/download/07102020-inacap/07102020_Inacap.mp4",
    "https://archive.org/download/trending/earn1.mp4"
]

// Extract the video object for global use
var video = document.getElementById("vid")
var elements = document.getElementsByClassName("options");

// Link the options to the videos in the list
var add_vids = function () {
    var attribute = this.getAttribute("value");
    video.src = video_list[attribute - 1];
};

// Add vlick event listeners to the video
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', add_vids, false);
}

// Play the next video is the video ends
video.addEventListener('ended', next_vid, false);
count = 1

function next_vid(){
    
    count++; 
    video.src = video_list[count-1]; 
    
    for (var i = 0; i < elements.length; i++) {
        if(i == count -1){
            elements[i].setAttribute("checked", "checked") ;
        }
        else{
            elements[i].removeAttribute("checked");
        }
    }

    document.getElementById('vid_no').innerHTML
        = '<h3>Playing Video ' + count + '/6</h3>' ; 
}


// Get the value entered in the Search Box and attach it in the  url
var url = document.getElementById("urlbox");
url.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        var attribute = url.value;
        video.src = attribute;
    }
});

// Add Seek the video
var seek = document.getElementById("seekbox");
seek.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        video.pause();
        var attribute = seek.value;
        video.currentTime = attribute;
        video.play();
    }
});



// Generateing the preview of the video
var prev_but = document.getElementById("preview-button");

prev_but.addEventListener("click", function () {
    var preview = document.getElementById("preivew-canvas");
    preview.width = 560;
    preview.height = 315;

    // video.pause()
    var context = preview.getContext('2d');
    context.drawImage(video, 0, 0, preview.width, preview.height);
});

//Rotate the Video
var rot_but = document.getElementById("rotate-button");
rot_but.onclick = function () {
    document.getElementById("vid").className = "rotated";
}


//Hide the Controls
var checkbox = document.getElementById("hide_box");
checkbox.addEventListener('change', function () {
    if (this.checked) {
        video.removeAttribute("controls");
    } 
    else {
        video.setAttribute("controls", "controls") ;
    }

    
});

//Mirror the video on a canvas
var mirror_but = document.getElementById("mirror-button");

mirror_but.addEventListener("click", function () {
    var canvas = document.getElementById("preivew-canvas");
    canvas.width = 600;
    canvas.height = 400;

    // video.pause()
    var context = canvas.getContext('2d');
    
    video.addEventListener('play', function () {
        draw(this, context, canvas.width, canvas.height);
    }, false);

});

function draw(v, c, w, h) {
    if (v.paused || v.ended) return false;
    c.drawImage(v, 0, 0, w, h);
    setTimeout(draw, 20, v, c, w, h);
}

// Login Form

// Name and Password from the register-form
var login_name = document.getElementById('login_name');
var pw = document.getElementById('pw');
var ph_no = document.getElementById('ph_no'); 
var logged_in = false;
var current_user = "abc";

// storing input from register-form
function store() {
    var storedName = localStorage.getItem('login_name');

    if(login_name.value == storedName ){
        alert("You are already Registered");
        open_login_Form();
    }
    else{
        localStorage.setItem('login_name', login_name.value);
        localStorage.setItem('pw', pw.value);
        localStorage.setItem('ph_no', ph_no.value);
        alert("You are Registered");
        close_register_Form();
    }
    
    
}


// check if stored data from register-form is equal to entered data in the   login-form
function check() {

    // stored data from the register-form
    var storedName = localStorage.getItem('login_name');
    var storedPw = localStorage.getItem('pw');

    // entered data from the login-form
    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPw');

    // check if stored data from register-form is equal to data from login form
    if (userName.value == storedName && userPw.value == storedPw) {
        alert('You are logged in.');
        logged_in = true;
        current_user = userName.value;
        close_login_Form();
        LoadComment();
    } else {
        alert('ERROR - Not a registered user');
        open_register_Form();
    }
}


var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;


function getwords() {
    
    if(logged_in){
        text = words.value;
        // document.getElementById("usr").innerHTML += ;
        // document.getElementById("time").innerHTML += '<p>' + dateTime;
        document.getElementById("para").innerHTML += '<h3>' + current_user + '</h3>' + '<p>' + dateTime + '<br/>' + '<p>' + text + '<br/>';
        document.getElementById("words").value = "enter" ;
    }
    else{
        alert("Please log-in!")
    }
    
    
}

function SaveComment() {

    var comments = document.getElementById("para")
    localStorage.setItem("comments", comments.innerHTML)
    
}

function LoadComment() {

    document.getElementById("para").innerHTML += localStorage.getItem("comments")
}


// Geolocation

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
}

var current_pos = navigator.geolocation.getCurrentPosition(success, error, options);

// var coords = { lat: "", lon: "" };




//Opening and Closing the Forms
function open_login_Form() {
    document.getElementById("login-form").style.display = "block";
}

function close_login_Form() {
    document.getElementById("login-form").style.display = "none";
}


function open_register_Form() {
    document.getElementById("register-form").style.display = "block";
}

function close_register_Form() {
    document.getElementById("register-form").style.display = "none";
}
