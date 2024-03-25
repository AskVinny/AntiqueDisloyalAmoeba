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

document.addEventListener('DOMContentLoaded', function() {
  var submitHeaderButton = document.getElementById('submitHeaderButton');

  submitHeaderButton.addEventListener('click', function() {
    // Remove the button
    submitHeaderButton.parentNode.removeChild(submitHeaderButton);

    // Create and insert the input field and submit button
    var inputHtml = `
      <div class="w-full xl:flex-1" id="inputContainer">
        <input
          class="p-3 xl:p-0 xl:pr-7 w-full text-gray-600 placeholder-gray-600 outline-none"
          id="headerInput3-1"
          type="text"
          placeholder="Enter email to get started"
        />
      </div>
      <div class="w-full xl:w-auto">
        <div class="block">
          <button
            id="submitEmailButton"
            class="py-4 px-7 w-full text-white font-semibold rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
            type="button"
          >
            Join our waitlist
          </button>
        </div>
      </div>
    `;
    document.getElementById('waitlistContainer').innerHTML += inputHtml;
  });
});