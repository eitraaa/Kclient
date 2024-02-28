const socket = io();
let playerData = { "pin": 0000, "name": "Undifined", "score": 0};

if (socket) {
  function joinGame(pin, name) {
    playerData = { "pin": pin, "name": name, "score": 0 }; // 既存の playerData を更新するため、let を削除
    socket.emit("join", playerData);
  }

  function senda(ans) {
    console.log("a");
  }

  socket.on("joined", (data) => {
    if (data.twoFactorAuth === true) {
      console.log("2要素認証がオンです");
    }
    // playerData を参照するように修正
    joined(playerData.name, playerData.score);
  });

  socket.on("error", (error) => {
    alert("エラーが発生しました: " + JSON.stringify(error));
  });

  socket.on("newquestion", () => { // "newquesion" から "newquestion" に修正
    console.log("questionstart イベントを受信しました"); 
    socket.emit("answer", 0);
  });

  window.senda = senda;
} else {
  console.error("WebSocketの接続に失敗しました。");
  alert("WebSocketの接続に失敗しました。ページを更新してください。");
}
