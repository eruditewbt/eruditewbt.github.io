//navigation

(function () {
  // When the DOM content is loaded, check if there's an active tab stored in local storage
  document.addEventListener("DOMContentLoaded", () => {
    const activeTab = localStorage.getItem("activeTab");
    if (activeTab) {
      // Remove the "active-btn" class from the previous active button
      document.querySelector(".active-btn").classList.remove("active-btn");
      // Remove the "active" class from the previous active tab
      document.querySelector(".active").classList.remove("active");
      // Add the "active-btn" class to the stored active button
      document
        .querySelector(`[data-id=${activeTab}]`)
        .classList.add("active-btn");
      // Add the "active" class to the stored active tab
      document.getElementById(activeTab)?.classList.add("active");
    }
  });

  // Initialize variables to track touch start and end positions
  let touchstartX = 0;
  let touchendX = 0;

  // Listen for touch start event
  document.addEventListener(
    "touchstart",
    ({ changedTouches: [{ screenX }] }) => {
      touchstartX = screenX;
    },
    false
  );

  // Listen for touch end event
  document.addEventListener(
    "touchend",
    ({ changedTouches: [{ screenX }] }) => {
      touchendX = screenX;
      // Handle swipe based on touch direction
      handleSwipe();
    },
    false
  );

  // Get references to all control buttons
  const buttons = [...document.querySelectorAll(".control")];

  // Handle swipe gesture
  function handleSwipe() {
    const activeButton = document.querySelector(".active-btn");
    const activeIndex = buttons.indexOf(activeButton);

    // If swiped left, click the next button
    if (touchendX + 100 < touchstartX) {
      const nextButton = buttons[activeIndex + 1];
      nextButton?.click();
    }

    // If swiped right, click the previous button
    if (touchendX > touchstartX + 100) {
      const prevButton = buttons[activeIndex - 1];
      prevButton?.click();
    }
  }

  /**
   * Handles tab change animation.
   * @param {HTMLElement} prevActiveTab - The previously active tab.
   * @param {HTMLElement} nextActiveTab - The next active tab.
   * @param {string} direction - The direction of the transition ("left" or "right").
   */
  function handleTabChange(prevActiveTab, nextActiveTab, direction) {
    if (prevActiveTab) {
      // Remove the "active" class from the previous tab
      prevActiveTab.classList.remove("active");

      // set display to block if it is none
      if (prevActiveTab.style.display !== "block") {
        prevActiveTab.style.display = "block";
      }
      // Slide out the previous tab (left or right)
      if (direction === "left") {
        if (prevActiveTab.style.transform !== "translateX(-100%)") {
          prevActiveTab.style.transform = "translateX(-100%)";
        }
      } else {
        if (prevActiveTab.style.transform !== "translateX(100%)") {
          prevActiveTab.style.transform = "translateX(100%)";
        }
      }

      // After the transition completes, reset the transform property
      prevActiveTab.addEventListener(
        "transitionend",
        () => {
          prevActiveTab.style.transform = "";
          // set display to block if it is none
          if (prevActiveTab.style.display !== "none") {
            prevActiveTab.style.display = "none";
          }
        },
        { once: true }
      );
    }

    if (nextActiveTab) {
      // Add the "active" class to the next tab

      // set display to block if it is none
      if (nextActiveTab.style.display !== "block") {
        nextActiveTab.style.display = "block";
      }

      nextActiveTab.classList.add("active");

      // slide in the next tab (left or right)
      if (direction === "right") {
        if (nextActiveTab.style.animation !== "disappear 0.5s ease-in-out") {
          nextActiveTab.style.animation = "disappear 0.5s ease-in-out";
        }
      } else {
        if (nextActiveTab.style.animation !== "appear 0.5s ease-in-out") {
          nextActiveTab.style.animation = "appear 0.5s ease-in-out";
        }
      }

      // After the transition completes, start the appearance animation
      nextActiveTab.addEventListener(
        "transitionend",
        () => {
          nextActiveTab.style.animation = "none";
          nextActiveTab.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        },
        { once: true }
      );
    }
  }

  // Add a click event listener to each control button
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get references to the previous and next active tabs
      const prevActiveTab = document.querySelector(".active");
      const nextActiveTab = document.getElementById(button.dataset.id);

      // Determine the indices of the active and next buttons
      const activeButton = document.querySelector(".active-btn");
      const activeIndex = buttons.indexOf(activeButton);
      const nextIndex = buttons.indexOf(this);

      // Handle tab change based on the direction (left or right)
      if (nextIndex > activeIndex) {
        handleTabChange(prevActiveTab, nextActiveTab, "left");
      } else if (nextIndex < activeIndex) {
        handleTabChange(prevActiveTab, nextActiveTab, "right");
      } else if (nextIndex === activeIndex) {
        return;
      }

      // Update the active button class
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");

      // Store the active tab in local storage
      localStorage.setItem("activeTab", button.dataset.id);
    });
  });
})();

// modal control

document.addEventListener("DOMContentLoaded", function () {
  // Get other elements
  var cards = document.querySelectorAll(".card");
  var span = document.getElementsByClassName("close")[0];
  var modal = document.querySelector(".modal"); // Replace ".modal" with your modal's selector

  // Check if the elements exist
  if (!cards) {
    console.log("Card not found");
  }
  if (!span) {
    console.log("Close button not found");
  }
  if (!modal) {
    console.log("Modal not found");
  }

  // Add click event listeners to the cards
  cards.forEach(function (card) {
    card.onclick = function () {
      var cardName = this.getAttribute("data-card");

      // Show the modal
      modal.style.display = "block";

      // Update the modal content based on the card number and show it
      var element = document.getElementById(cardName);
      element.style.display = "block";

      modal.classList.remove("hide");

      // Close the modal when the close button is clicked
      span.onclick = function () {
        modal.classList.add("hide");
        setTimeout(function () {
          // Hide the content
          element.style.display = "none";

          // Clear the modal
          modal.style.display = "none";
        }, 500); // Match this with the animation duration
      };

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.classList.add("hide");
          setTimeout(function () {
            // Hide the content
            element.style.display = "none";

            // Clear the modal
            modal.style.display = "none";
          }, 500); // Match this with the animation duration
        }
      };
    };
  });
});

// set date in footer

(function () {
  var currentYear = new Date().getFullYear();
  var footerElements = document.querySelectorAll("div.footer-all");
  footerElements.forEach(function (element) {
    element.textContent = `© ${currentYear} EruditeWbt Inc. All rights reserved.`;
  });
})();

// navigation control

(function () {
  // set dark and light mode
  document.querySelector(".theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.documentElement.classList.toggle("light-mode");
  });
})();

/*
// JavaScript to handle the click event in contact
document.getElementById("triggerButton").addEventListener("click", function () {
  document.getElementById("submitButton").click(); // Triggers the submit button's click event
});
*/

// contact us submission

function submitForm() {
  // Function to copy values from one set of inputs to another

  //prevent reloading
  //event.preventDefault();

  // Get values from the first set of inputs
  var nameValue = document.getElementById("name").value;
  var emailValue = document.getElementById("email").value;
  var phoneValue = document.getElementById("phone").value;
  var messageValue = document.getElementById("text-area").value;

  // Access the iframe by its ID
  var iframe = document.getElementById("frame");

  if (iframe) {
    // get the url and origin
    var url = new URL(iframe.src);
    var origin = url.origin; // This is the origin of the iframe

    // Access the iframe's document
    // Send a message to the iframe using window.postMessage
    var iframe = document.getElementById("frame");
    if (iframe) {
      iframe.contentWindow.postMessage(
        {
          name: nameValue,
          email: emailValue,
          phone: phoneValue,
          message: messageValue,
        },
        `${origin}`
      ); // the origin of the iframe for better security
    }

    // Listen for a message from the parent window
    window.addEventListener(
      "message",
      function (event) {
        // Check the origin of the message for security
        if (event.origin !== "http://example.com")
          // Replace with the origin of the parent window
          return;

        // Get the data from the message
        var data = event.data;

        // Use the data to set the values of the inputs
        var inputs = document.querySelectorAll("input.-af-215");
        var textArea = document.querySelector("textarea.-af-215");

        if (inputs.length >= 3 && textArea) {
          inputs[0].value = data.name;
          inputs[1].value = data.email;
          inputs[2].value = data.phone;
          textArea.value = data.message;
        }
      },
      false
    );

    if ((textArea.value = messageValue)) {
      iframeDocument
        .querySelector('[data-automation-id="submitButton"]')
        .click();
      // Triggers the submit button's click event
    }
  }
}
