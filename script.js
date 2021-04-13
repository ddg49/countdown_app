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
//This function adds a day so we can fix the original date selected. This is because getDate() returns yesterday
Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
// CODE FOR ADDING THE COUNTDOWN
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const eventName = $("#eventName"); //name of the event

function submit () {
    let d = $("#date").val(); //get the value of the date input
    let date = new Date(d).addDays(1); 
    let month = monthNames[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();
    let time = $("#time").val(); //get the value of the time input
    //Changing miltary time to standard time. (Credit: Rahul Desai from stackoverflow.com) 
    let timeChanger = time + ":" + 0 + 0;
    timeChanger = timeChanger.split(":");
    let hours = Number(timeChanger[0]);
    let minutes = Number(timeChanger[1]);
    let timeValue;
    if (hours > 0 && hours <= 12) {
    timeValue= "" + hours;
    } else if (hours > 12) {
    timeValue= "" + (hours - 12);
    } else if (hours == 0) {
    timeValue= "12";
    }
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM
    if (d === "" || time === "" || year < 2021) {
        alert("Please type in a valid date and time.");
    } else {
    const formattedDate = `${month} ${day}, ${year} ${time}:${0}${0}`;
    const event = $("<li>");
    const t = $("<span>");
    trash = t.html("<i class='fas fa-trash-alt' ></i>"); //trash icon
    const headDate = $("<h5>")
    headDate.html(formattedDate.substr(0, 12) + " &nbsp;&nbsp;" + timeValue);
    let unique = new Date().getSeconds();
    trash.attr("id", unique); //Add the unique Date ID's
    event.attr("id", unique);
    headDate.attr("id", unique); 
    trash.attr("onclick", 'deleteEvent(this.id)') //Pass in the unique ID of this particular element, which is the same ID of the parent.
    const name = eventName.val(); //name of the event stored in a variable
    event.append(headDate);
    event.append(name);
    const counter = $("<li>")
    // Starting the countdown. (Help from w3schools.com)
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
    // Output the result in the li 'counter'
    counter.html(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        counter.html("Countdown ended.");
    }
    }, 1000);
    event.append(trash);
    counter.addClass("counter");
    event.append(counter);
    event.addClass("borders");
    $("ul").append(event);
    modal.classList.remove('active');
    overlay.classList.remove('active'); //close the modal after event is submitted
    eventName.val(''); //empty out all input values
    $("#date").val('');
    $("#time").val(''); 
}
}

function deleteEvent (ownElement){
    document.getElementById(ownElement).remove();  
}