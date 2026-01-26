function showSignup(){
  choice.classList.add("hidden");
  signup.classList.remove("hidden");
}

function showSignin(){
  choice.classList.add("hidden");
  signin.classList.remove("hidden");
}

function signup(){
  const user = {
    id: "U" + Date.now() + Math.floor(Math.random()*1000),
    name: name.value,
    intent: intent.value,
    pin: pin.value
  };
  localStorage.setItem("focusUser_"+user.id, JSON.stringify(user));
  localStorage.setItem("lastUser", user.id);
  enterApp();
}

function signin(){
  const pin = loginPin.value;
  const keys = Object.keys(localStorage).filter(k=>k.startsWith("focusUser_"));
  const found = keys.find(k=>JSON.parse(localStorage[k]).pin === pin);
  if(!found) return alert("Wrong PIN");
  localStorage.setItem("lastUser", found.replace("focusUser_",""));
  enterApp();
}

function enterApp(){
  entryGate.classList.add("hidden");
  plannerApp.classList.remove("hidden");
}
