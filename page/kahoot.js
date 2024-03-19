const socket = io();
let playerData = { "pin": -1, "name": "Undefined", "score": 0 }; // Corrected "Undifined" to "Undefined"

if (socket) {
 function joinGame(pin, name) {
    playerData = { "pin": pin, "name": name, "score": 0 }; 
    socket.emit("join", playerData);
 }

 function answer(arr) {
    socket.emit("answer", arr);
    $('.normal_ab').hide();
    $('#lobbysubt').text("Please wait for the next question").show();
    $('#lobbytitle').text("Genius?").show();
    $('#loading').show();
 } 

 socket.on("joined", (data) => {
    console.log("joined game: ", data);
    if (data.twoFactorAuth == true) {
      const solveSq = prompt("2FA has been enabled in this game.\nEg. [red, blue, yellow, green] => [0, 1, 2, 3]","[]");
      socket.emit("solve2FA", solveSq);
    }
    joined(playerData.name, playerData.score); 
 });

 socket.on("QuizStart", (data) => {
    console.log("quiz is started: ", data);
    quizStart(data); 
 });

 socket.on("QuestionReady", (data) => {
    console.log("Question Ready: ", data);
    questionReady(data); 
 });

 socket.on("QuestionStart",(data)=> {
   questionStart(data);
 });

 socket.on("QuestionEnd",(data)=> {
    console.log(`${data}`);
    $('#lobbytitle').text(data.isCorrect ? "Correct!" : "Wrong!");
    $('#lobbysubt').text(`+${data.points}`);
    $('#score').text(data.totalScore);
    $('#result').text(`You are at ${data.rank}th place, ${data.Nemesis.totalScore-data.totalScore} point lower than ${data.Nemesis.name}!!`);
 });

 socket.on("Podium",(data)=> {
    console.log(data);
    if (data.podiumMedalType) {
      $('#lobbytitle').text(`You are ${data.podiumMedalType}!!`);
      $('#lobbysubt').text(`with score of ${$('score').text()}`); 
    } 
 });

 socket.on("error", (error) => {
    alert("エラーが発生しました: " + JSON.stringify(error));
 });
} else {
 alert("error: failed to load WS");
}
