
function logout() {
  authData = JSON.parse(localStorage.getItem("auth"));
  socket.emit("logout", { "id": authData.id, "loginid": authData.loginid});
}

socket.on("logoutResult", (data) => {
  if (data) {
    localStorage.clear();
    window.location.reload();
  }
});

$('document').ready(function() {
  let auth = JSON.parse(localStorage.getItem("auth"));
  if (auth == null) {
    let conf = confirm("Wahoot uses Localstorage for better user experience. By clicking OK, you agree to this.");
    if (conf) {
      let getmod = JSON.stringify(getMod(true));
      localStorage.setItem("auth", JSON.stringify({"id": -1, "loginid": -1}));
      localStorage.setItem("mod", getmod);
      window.location.reload();
    } else {
      window.location.href = "/";
    }
  } else if (auth.loginid === -1) {
    window.location.href = "/login";
  } else {
    authCheck();
  }
});

socket.on("authCheckResult", (authData) => {
  if (!authData) {
    localStorage.clear();
    window.location.reload();
    console.log("[AuthCheck] Failed");
  } else {
    console.log("[AuthCheck] Succes");
  }
});

function authCheck() {
  var getAuthData = JSON.parse(localStorage.getItem("auth"));
  socket.emit("authCheck", getAuthData);
}

function getIcon() {
  var getAuthData = JSON.parse(localStorage.getItem("auth"));
  socket.emit("getIcon", getAuthData.id);
}

socket.on("iconResult", (url) => {
  try {
    document.getElementById("icon").src = url;
  } catch (error) {
    ;
  }
})