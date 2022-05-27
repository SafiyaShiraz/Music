leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song1= "";
song2= "";
songstatus= "";
scoreLeftWrist= 0;
scoreRightWrist= 0;
status1="";
status2="";


function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center;

    video = createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function draw()
{
image(video, 0, 0, 500, 500);

fill("red");
stroke("red");
if(scoreLeftWrist > 0.2)
{
circle(leftWristX, leftWristY, 30);
song1.stop();

if(status2 == false)
{
song2.play();
document.getElementById("song").innerHTML="Playing Peter Pan Song";
}

}

if(scoreRightWrist > 0.2)
{
    circle(rightWristX, rightWristY, 30);
song2.stop();
if(status1 == false)
{
song1.play();
document.getElementById("song").innerHTML="Playing Harry Potter Song";
}
}

}

function modelLoaded()
{
    console.log("Model is loaded");
}

function gotPoses(results)
{
if(results.length > 0)
{
console.log(results);

scoreLeftWrist = results[0].pose.keypoints[9].score;
console.log("Score Left Wrist="+scoreLeftWrist);

scoreRightWrist = results[0].pose.keypoints[10].score;
console.log("Score Right Wrist="+scoreRightWrist);

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;    
console.log("Left Wrist X=" + leftWristX + "Left Wrist Y=" + leftWristY);

rightWristX = results[0].pose.rightWrist.x;    
rightWristY = results[0].pose.rightWrist.y;    
console.log("Right Wrist X=" + rightWristX + "Right Wrist Y=" + rightWristY);

}

}



