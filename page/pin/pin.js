

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
  submitButton.onclick = function () {
    jg(pin, ntxt.vakue);
  };
  form.appendChild(submitButton);
}

async function epin() {
  var gameIdInput = document.getElementById("gameId");
  var pinValue = gameIdInput.value;
  alert(pinValue);
  ename(pinValue);
}