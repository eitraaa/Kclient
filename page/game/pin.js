async function ename(pin) {
  const form = document.getElementById("pinarea");
  if (!form) return;

  form.innerHTML = "";

  const ntxt = document.createElement("input");
  ntxt.type = "text";
  ntxt.id = "nickname";
  ntxt.placeholder = "Nick Name";
  ntxt.autocomplete = "off";

  const submitButton = document.createElement("button");
  submitButton.id = "nicknamesubmit";
  submitButton.textContent = "Enter";

  form.appendChild(ntxt);
  form.appendChild(submitButton);

  submitButton.addEventListener("click", async () => {
    const nameInput = ntxt.value.trim();
    if (nameInput) {
      await joinGame(pin, nameInput); // joinGameをawaitで呼び出す
      console.log("done");
    } else {
      alert("Please enter a nickname");
    }
  });
}

async function epin(event) {
  event.preventDefault();
  const gameIdInput = document.getElementById("gameId");
  const pinValue = gameIdInput.value.trim();
  if (pinValue) {
    await ename(pinValue);
  } else {
    alert("Please enter a PIN");
  }
}

async function joined(name, score) { 
  const gamesrc = await fetch("/page-1"); 
  const jsonText = await gamesrc.text(); 
  document.body.innerHTML = jsonText; 
  document.getElementById("username").textContent = name;
  document.getElementById("score").textContent = score;
}

function setting() {
  const list = JSON.stringify({"a" : "A", "b" : "B", "c" : "C", "d" : "D"}); 
  window.prompt("settings", `list:\n${list}`);
}
