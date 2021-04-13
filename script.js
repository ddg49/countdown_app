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
    const day = date.getUTCDate();
    const year = date.getFullYear();
    const time = $("#time").val(); //get the value of the time input
    const formattedDate = `${month} ${day}, ${year} ${time}:${0}${0}`
    console.log(formattedDate);

    const event = $("<li>");
    const t = $("<span>");
    trash = t.html("<i class='fas fa-trash-alt' ></i>"); //trash icon

    let unique = new Date().getSeconds();
    trash.attr("id", unique);
    event.attr("id", unique); //Add the unique Date ID's
    trash.attr("onclick", 'deleteEvent(this.id)') //Pass in the unique ID of this particular element, which is the same ID of the parent.
    event.html(eventName.val());
    event.append(trash)

    const counter = $("<li>")
    let countDownDate = new Date(formattedDate).getTime();

    // Update the count down every 1 second
    let x = setInterval(function() {

    // Get today's date and time
    let now = new Date().getTime();
    
    // Find the distance between now and the count down date
    let distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    counter.html(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        counter.html("EXPIRED");
    }
    }, 1000);
    counter.addClass("counter")
    event.append(counter)
    $("ul").append(event);
    modal.classList.remove('active')
    overlay.classList.remove('active') //close the modal after event is submitted
}

function deleteEvent (ownElement){
    document.getElementById(ownElement).remove()  
}