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

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
