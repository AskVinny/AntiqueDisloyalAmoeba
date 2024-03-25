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
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      document.getElementById("headerInput3-1").value = "";
      var errorMessage = document.getElementById("emailError");
      if (!errorMessage) {
        errorMessage = document.createElement("div");
        errorMessage.id = "emailError";
        errorMessage.style.color = "red";
        errorMessage.textContent = "Please enter a valid email";
        document.getElementById("headerInput3-1").parentNode.insertBefore(errorMessage, document.getElementById("headerInput3-1").nextSibling);
      }

      var submitButton = document.getElementById("submitEmailButton");
      submitButton.style.backgroundColor = "red";
      submitButton.classList.add("shake"); // Add shake class

      setTimeout(function() {
        submitButton.style.transition = "background-color 2s";
        submitButton.style.backgroundColor = "#4F46E5"; // Fade to purple
        errorMessage.remove(); // Remove the error message
        submitButton.classList.remove("shake"); // Remove shake class after animation
      }, 1000); // Start after 1 second

      return;
    }
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
        // Get the submit button and update its properties
        var submitButton = document.getElementById("submitEmailButton");
        submitButton.style.backgroundColor = "#25D366"; // Set the button color to WhatsApp green
        submitButton.innerText = "Thanks, We'll be in touch soon"; // Change the button text

      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here, such as displaying an error message to the user
      });
  });

document.addEventListener("DOMContentLoaded", function() {
  var submitHeaderButton = document.getElementById("submitHeaderButton");
  var documentContainer = document.getElementById("waitlistContainer");

  submitHeaderButton.addEventListener("click", function() {
    // Remove the button
    submitHeaderButton.parentNode.removeChild(submitHeaderButton);

    // Create and insert the input field and submit button
    var inputHtml = `
      <div class="w-full xl:flex-1" id="inputContainer">
        <input
          class="p-3 xl:p-0 xl:pr-7 w-full text-gray-600 placeholder-gray-600 outline-none"
          id="headerInput3-1"
          type="text"
          placeholder="Enter email here"
        />
        <div id="emailError" style="color: red; display: none;">Please enter a valid email</div>
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
    documentContainer.innerHTML += inputHtml;
    documentContainer.classList.add('mb-16', 'p-1.5', 'xl:pl-7', 'inline-block', 'md:max-w-xl', 'w-full', 'border-2', 'border-black', 'rounded-3xl', 'focus-within:ring', 'focus-within:ring-indigo-300');

    var submitEmailButton = document.getElementById("submitEmailButton");
    submitEmailButton.addEventListener("click", function() {
      var emailInput = document.getElementById("headerInput3-1");
      var email = emailInput.value;
      var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var errorMessage = document.getElementById("emailError");

      if (!regex.test(email)) {
        emailInput.value = "";
        errorMessage.style.display = "block"; // Show error message
        submitEmailButton.classList.add("shake");

        setTimeout(function() {
          submitEmailButton.style.transition = "background-color 2s";
          submitEmailButton.style.backgroundColor = "red";
          setTimeout(() => {
            submitEmailButton.style.backgroundColor = "#4F46E5"; // Fade back to original color
            errorMessage.style.display = "none"; // Hide error message after showing
            submitEmailButton.classList.remove("shake");
          }, 2000);
        }, 1000);

        return;
      }

      // Proceed with the fetch request if the email is valid
      var timestamp = new Date().toISOString();
      fetch("https://us-central1-askvinny-dd8ea.cloudfunctions.net/addEmailToAirtable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ email, timestamp }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log("Success:", data);
        // Update UI to reflect successful submission
        submitEmailButton.innerText = "Thanks - We'll be in touch soon";
        submitEmailButton.style.backgroundColor = "#25D366"; // WhatsApp green
        emailInput.value = ""; // Clear the input field
      })
      .catch(error => {
        console.error("Error:", error);
        // Optionally, handle errors, such as retrying the request or displaying an error message
      });
    });
  });
});

// Function to hide an image on mobile devices
function hideImageOnMobile() {
  var image = document.getElementById('heroImageContainer'); // Replace 'yourImageId' with your image's ID
  if (window.innerWidth <= 768) { // 768px is a common breakpoint for mobile devices
    image.style.visibility = 'hidden';
      image.style.display = 'none'; // Hides the image on mobile devices
  } else {
    image.style.visibility = 'visible'; // Makes sure the image is visible on larger devices
  }
}

// Call the function on initial load
hideImageOnMobile();

// Optionally, call the function on window resize to handle dynamic changes
window.addEventListener('resize', hideImageOnMobile);

document.getElementById('trustpilot').addEventListener('click', function() {
  window.location.href = 'https://uk.trustpilot.com/review/askvinny.co.uk';
});