function load() {
  $('#bar').animate({
    'bottom': '0'
  }, 1500)
  
  $('#icon').animate({
    'bottom': '15px'
  }, 1500)
  
  $('.plbox').animate({
    'bottom': '20px'
  }, 1500)

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
  let playerSetting = {
    exploit: {
      custom_name: true,
      crasher: false,
      morescore: {
        toggled: false,
        value: 10,
      },
    },
    game: {
      keybind: {
        toggled: true,
        red: "q",
        blue: "w",
        yellow: "a",
        green: "s",
      },
    },
  };
}