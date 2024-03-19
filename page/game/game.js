var isSingle = true;
function load() {
 $('#bar').animate({
    'bottom': '0'
 }, 1500);

 $('#icon').animate({
    'bottom': '15px'
 }, 1500);

 $('.plbox').animate({
    'bottom': '20px'
 }, 1500);

 $('#setting-lobby').animate({
    'right': '10px'
 }, 1400);

 $('#lobbytitle').animate({
    'opacity': '1'
 }, 1500);

 $('#lobbysubt').animate({
    'opacity': '1'
 }, 1500);
}

function setting() {
 console.log("aaa");
 prompt("RawData", localStorage.getItem("mod"));
}

function quizStart() {
 $('#lobbytitle').text("Game has started!!");
 $('#lobbysubt').text("Good luck!!");
 authCheck(); // Assuming this function is defined elsewhere
 $('#loading').show();  
}

async function questionReady(data) {
 if (data.type === "quiz" && data.layout == "TRUE_FALSE") {
    console.log("tf");
 } 
 
 if (data.type == "quiz") {
    document.getElementById("red").type="button";
    document.getElementById("blue").type="button";
    document.getElementById("yellow").type="button";
    document.getElementById("green").type="button";
    var isSingle = true;
 } else {
   var isSingle = false;
 }
 $('#lobbytitle').text(data.gameBlockType);
 for (let i = 0; i < data.getReadyTimeRemaining*1000; i = i+100) {
    $('#lobbysubt').text((data.getReadyTimeRemaining*1000-i)/1000);
    await delay(100);
 }
}

async function questionStart(data) {
   $('#lobbysubt').hide();
   $('#lobbytitle').hide();
   $('#loading').hide();
   $('.normal_ab').show();

   $('#red').on('click', function() {
     if(isSingle) {
       answer([0]);
     }
    });
    $('#blue').on('click', function() {
      if(isSingle) {
        answer([1]);
      }
    });
    $('#yellow').on('click', function() {
      if(isSingle) {
        answer([2]);
      }
    });
    $('#green').on('click', function() {
      if(isSingle) {
        answer([3]);
      }
    });
  
}
function multipleAnswer(arr, num) {
  var ret = [];
  for (let i = 0; i < arr.length; i++) {
    var choice = arr[i];
    for (let j = 0; j < num; j++) {
      ret.push(choice);
    }
  }
  answer(ret);
}