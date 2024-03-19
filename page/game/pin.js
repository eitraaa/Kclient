function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


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
    $('#loading').show();
    if (nameInput) {
      await joinGame(pin, nameInput);
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
  $('#wahoot').animate({
    'opacity': '0'
  }, 1500);
  $('#pinarea').animate({
    'opacity': '0'
  }, 1500);
  $(`#ver`).animate({
    'left': '-100px'
  }, 1500);
  $('#setting').animate({
    'right':'-300px'
  }, 1500);
  await delay(1600);
  const gamesrc = await fetch("/page-1");
  const jsonText = await gamesrc.text();
  document.body.innerHTML = jsonText;
  getIcon();
  document.getElementById("username").textContent = name;
  document.getElementById("score").textContent = score;
  authCheck();
  load();
}

function getMod(create) {
  if (create) {
    let mods = {
      "exploit": {
        "custom_name": true,
        "crasher": false,
        "morescore": {
          "toggled": false,
          "value": 10,
        },
      },
      "game": {
        "keybind": {
          "toggled": true,
          "red": "q",
          "blue": "w",
          "yellow": "a",
          "green": "s",
        },
      },
    }
    return mods;
  }
}