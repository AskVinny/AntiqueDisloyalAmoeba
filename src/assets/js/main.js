// Burger menus
document.addEventListener("DOMContentLoaded", function () {
  // open
  const burger = document.querySelectorAll(".navbar-burger");
  const menu = document.querySelectorAll(".navbar-menu");

  if (burger.length && menu.length) {
    for (var i = 0; i < burger.length; i++) {
      burger[i].addEventListener("click", function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle("hidden");
        }
      });
    }
  }


  // close
  const close = document.querySelectorAll(".navbar-close");
  const backdrop = document.querySelectorAll(".navbar-backdrop");

  if (close.length) {
    for (var i = 0; i < close.length; i++) {
      close[i].addEventListener("click", function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle("hidden");
        }
      });
    }
  }

  if (backdrop.length) {
    for (var i = 0; i < backdrop.length; i++) {
      backdrop[i].addEventListener("click", function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle("hidden");
        }
      });
    }
  }
});
const firebase_url =
  "https://us-central1-askvinny-dd8ea.cloudfunctions.net/addEmailToAirtable";
document
  .getElementById("submitEmailButton")
  .addEventListener("click", function () {
    var email = document.getElementById("headerInput3-1").value;
    var timestamp = new Date().toISOString();

    // Use the path specified in your firebase.json rewrites configuration
    fetch(firebase_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With",
      },
      body: JSON.stringify({ email, timestamp }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON in the response
      })
      .then((data) => {
        console.log("Success:", data);
        // Handle successful response here, such as updating the UI
        document.getElementById("headerInput3-1").value = ""; // Optionally clear the input field
        // Optionally display a success message to the user
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here, such as displaying an error message to the user
      });
  });

