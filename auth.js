(function () {

  const gate = document.getElementById("entryGate");
  const app = document.getElementById("plannerApp");

  const choiceBox = document.getElementById("choiceBox");
  const newUserBox = document.getElementById("newUser");
  const existingUserBox = document.getElementById("existingUser");

  // UI switches
  window.showNew = () => {
    choiceBox.style.display = "none";
    newUserBox.style.display = "block";
  };

  window.showExisting = () => {
    if (!localStorage.getItem("userProfile")) {
      alert("No existing user found on this device");
      return;
    }
    choiceBox.style.display = "none";
    existingUserBox.style.display = "block";
  };

  // NEW USER
  window.createProfile = () => {
    const name = nameInput.value.trim();
    const intention = intentionInput.value.trim();
    const pin = pinCreate.value.trim();

    if (!name || !intention || pin.length !== 4) {
      alert("Fill all fields correctly");
      return;
    }

    const profile = {
      userId: crypto.randomUUID(),   // REAL identity
      name,
      intention,
      pin,
      createdAt: Date.now()
    };

    localStorage.setItem("userProfile", JSON.stringify(profile));
    enterApp();
  };

  // EXISTING USER
  window.unlock = () => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    if (!profile) return;

    if (pinEnter.value !== profile.pin) {
      alert("Wrong PIN");
      return;
    }

    enterApp();
  };

  function enterApp() {
    gate.style.display = "none";
    app.style.display = "block";
    console.log("User:", JSON.parse(localStorage.getItem("userProfile")));
  }

})();
