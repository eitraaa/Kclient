const socket = io();
let playerData = { "pin": -1, "name": "Undifined", "score": 0};

if (socket) {
  function joinGame(pin, name) {
    playerData = { "pin": pin, "name": name, "score": 0 }; 
    socket.emit("join", playerData);
  }

 function answer(arr) {
   socket.emit("answer", arr);
 } 

  socket.on("joined", (data) => {
    if (data.twoFactorAuth === true) {
      console.log("2要素認証がオンです");
    }
    joined(playerData.name, playerData.score);
  });

  socket.on("error", (error) => {
    alert("エラーが発生しました: " + JSON.stringify(error));
  });

  socket.on("newquestion", () => {
    console.log("questionstart イベントを受信しました");
  });
} else {
  console.error("WebSocketの接続に失敗しました。");
  alert("WebSocketの接続に失敗しました。ページを更新してください。");
}
