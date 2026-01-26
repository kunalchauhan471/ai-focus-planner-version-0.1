// ===================== DOM ELEMENTS =====================
const entryGate = document.getElementById("entryGate");
const plannerApp = document.getElementById("plannerApp");

const choice = document.getElementById("choice");
const signup = document.getElementById("signup");
const signin = document.getElementById("signin");

const nameInput = document.getElementById("name");
const intentInput = document.getElementById("intent");
const pinInput = document.getElementById("pin");
const loginPin = document.getElementById("loginPin");

// ===================== SHOW SCREENS =====================

// Show New User (signup) form
function showSignup() {
  choice.classList.add("hidden");
  signup.classList.remove("hidden");
}

// Show Existing User (signin) form
function showSignin() {
  if (!localStorage.getItem("lastUser")) {
    alert("No existing user found on this device");
    return;
  }
  choice.classList.add("hidden");
  signin.classList.remove("hidden");
}

// ===================== SIGNUP =====================

function signup() {
  const name = nameInput.value.trim();
  const intent = intentInput.value.trim();
  const pin = pinInput.value.trim();

  // Validate inputs
  if (!name || !intent || pin.length !== 4) {
    alert("Please fill all fields correctly and use a 4-digit PIN");
    return;
  }

  // Create unique user object
  const user = {
    id: "U" + Date.now() + Math.floor(Math.random() * 1000), // unique ID
    name,
    intent,
    pin,
    createdAt: Date.now()
  };

  // Save user in localStorage
  localStorage.setItem("focusUser_" + user.id, JSON.stringify(user));
  localStorage.setItem("lastUser", user.id);

  // Enter planner
  enterApp();
}

// ===================== SIGNIN =====================

function signin() {
  const pin = loginPin.value.trim();
  const keys = Object.keys(localStorage).filter(k => k.startsWith("focusUser_"));

  // Find a user with matching PIN
  const foundKey = keys.find(k => {
    const user = JSON.parse(localStorage[k]);
    return user.pin === pin;
  });

  if (!foundKey) {
    alert("Wrong PIN");
    return;
  }

  localStorage.setItem("lastUser", foundKey.replace("focusUser_", ""));
  enterApp();
}

// ===================== ENTER PLANNER =====================

function enterApp() {
  entryGate.classList.add("hidden");  // hide entry gate
  plannerApp.classList.remove("hidden"); // show planner

  // Optional: log user info
  const currentUser = JSON.parse(localStorage.getItem("focusUser_" + localStorage.getItem("lastUser")));
  console.log("Current user:", currentUser);
}
