// CODE FOR THE MODAL
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modals')
        closeModal(modal)
    })
})

function openModal (modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal (modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modals.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

// CODE FOR ADDING THE COUNTDOWN
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const eventName = $("#eventName"); //name of the event

function submit () {
    const d = $("#date").val(); //get the value of the date input
    const date = new Date(d);
    const month = monthNames[date.getMonth()];
    console.log(month);
    const day = date.getUTCDate();
    console.log(day);
    const year = date.getFullYear();
    console.log(year);
    const t = $("#time").val(); //get the value of the time input
    console.log(t);
    
}