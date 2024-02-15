function mfn() {
  alert("cd");
}

function ename(pin) {
  const form = document.getElementById("pinarea");
  form.innerHTML = "";
  let ntxt = document.createElement("input");
  ntxt.type = "text";
  ntxt.id = "ename";
  ntxt.placeholder = "Nick Name";
  ntxt.value = "";
  ntxt.autocomplete = "off";
  form.appendChild(ntxt);

  let submitButton = document.createElement("button");
  submitButton.id = "nenter";
  submitButton.textContent = "Enter";
  form.appendChild(submitButton);
  document.getElementById("nenter").addEventListener("click", () => {
    const nameInput = document.getElementById("ename").value.trim();
    if (nameInput) {
      joinGame(pin, nameInput);
      console.log("done");
    } else {
      alert("Please enter a nickname");
    }
  });
}

async function epin(event) {
  event.preventDefault();
  var gameIdInput = document.getElementById("gameId");
  var pinValue = gameIdInput.value;
  if (pinValue) {
    await ename(pinValue);
  } else {
    alert("Please enter a PIN");
  }
}
