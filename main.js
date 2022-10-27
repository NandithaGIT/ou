status = "";
objects = [];
video = "";

function setup(){
    canvas = createCanvas(450,450);
    canvas.position(900,400);
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
    input = document.getElementById("inp").value;
}

function modelLoaded(){
    console.log("model Loaded!");
    status = true;
}

function draw(){
    image(video,0,0,450,450);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        for(i = 0;i < objects.length;i++){
            if(objects[i].label == input){
                document.getElementById("status").innerHTML = "Objects Detected";
                document.getElementById("obj_found").innerHTML = input + " " + "found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input + "found");
                objects.speak(utterThis);
                
                fill("#EC7272");
            confidence = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + confidence + "%",objects[i].x + 15,objects[i].y- 15);

            noFill();
            stroke("#9FC9F3");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
                }  else {
                    document.getElementById("obj_found").innerHTML = input + " " + "not found";
                }
        }
    }
}

function gotResult(error,results){
    if(error){
        console.log("error");
    }
    console.log(results);
    objects = results;
}
//16213E