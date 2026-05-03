// Initialize EmailJS
(function () {
  emailjs.init("MFGuOmMoOgJoScnkU");
})();

window.onload = function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  let lastSent = 0;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Spam check
    if (form.company.value) {
      status.textContent = "Spam detected";
      return;
    }

    // rate (10 seconds)
    const now = Date.now();
    if (now - lastSent < 10000) {
      status.textContent = "Please wait 10 seconds before sending again";
      return;
    }

    lastSent = now;

    status.textContent = "Sending...";
    // add time manually
    const templateParams = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      time: new Date().toLocaleString()
    };

    emailjs.send("service_ee57lbk", "template_p9cjdta", templateParams)
      .then(function () {
        status.textContent = "Message sent successfully!";
        status.style.color = "green";
        form.reset();
      })
      .catch(function (error) {
        console.error(error);
        status.textContent = "Failed to send message.";
        status.style.color = "red";
      });
  });
};