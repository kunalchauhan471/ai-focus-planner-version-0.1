(function () {

  const gate = document.getElementById("entryGate");
  const app = document.getElementById("plannerApp");

  const stored = localStorage.getItem("userProfile");

  // If user already exists
  if (stored) {
    document.getElementById("firstTime").style.display = "none";
    document.getElementById("returning").style.display = "block";
    document.getElementById("gateTitle").innerText = "Welcome back";
  }

  // Create profile
  window.createProfile = function () {
    const name = nameInput.value.trim();
    const intention = intentionInput.value.trim();
    const pin = pinCreate.value.trim();

    if (!name || !intention || pin.length !== 4) {
      alert("Fill all fields correctly");
      return;
    }

    const profile = {
      userId: crypto.randomUUID(), // 🔑 REAL IDENTITY
      name,
      intention,
      pin,
      createdAt: Date.now()
    };

    localStorage.setItem("userProfile", JSON.stringify(profile));
    unlock();
  };

  // Unlock planner
  window.unlock = function () {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    if (!profile) return;

    if (pinEnter.value !== profile.pin && pinCreate.value !== profile.pin) {
      alert("Wrong PIN");
      return;
    }

    gate.style.display = "none";
    app.style.display = "block";

    // Optional: greeting
    console.log("User:", profile.name, profile.userId);
  };

})();
