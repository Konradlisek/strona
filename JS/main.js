const btnOpen = document.querySelector(".mobile-hamburger");
const btnClose = document.querySelector(".mobile-close");
const openMenu = document.querySelector(".open-menu-holder");
const btnForm = document.querySelector(".btn-form");
const formFields = document.querySelectorAll(".form-field");
const appointmentMessage = document.querySelector(".appointment-massage");
let pValid = true;

let appointment = () => ({
  name: document.getElementById("appointment-name").value,
  email: document.getElementById("appointment-email").value,
  service: document.getElementById("appointment-service").value,
  phone: document.getElementById("appointment-phone").value,
  date: document.getElementById("appointment-date").value,
  time: document.getElementById("appointment-time").value,
  message: document.getElementById("appointment-message").value,
});
const createAppointment = (appointment) => {
  fetch("https://akademia108.pl/api/ajax/post-appointment.php", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  })
    .then((response) => response.json())
    .then((resJSON) => {
      appointmentMessage.classList.add("send");
      appointmentMessage.innerText = `Dziękujemy ${resJSON.appointment.name}! Zostałeś zapisany.`;
    })
    .catch((error) => {
      console.error("Błąd podczas przetwarzania odpowiedzi:", error);
    });
};

const showNavMobile = () => {
  openMenu.classList.add("open");
};
const closeNavMobile = () => {
  openMenu.classList.remove("open");
};

btnOpen.addEventListener("click", showNavMobile);
btnClose.addEventListener("click", closeNavMobile);

const checkForm = (event) => {
  event.preventDefault();
  for (let i = 0; i < formFields.length; i++) {
    if (formFields[i].value.trim() === "") {
      formFields[i].classList.add("error");
      pValid = false;
    } else {
      formFields[i].classList.remove("error");
    }
  }
  if (!pValid) {
    appointmentMessage.classList.add("error");
    appointmentMessage.innerText = "Proszę uzupełnić wszyskie pola!";
  } else {
    appointmentMessage.textContent = "Zostałeś zapisany!";
    createAppointment(appointment);
  }
};
btnForm.addEventListener("click", checkForm);
