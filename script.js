// Javascript Code Goes Here!

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // Grabs all the seats that are not occupied
const count = document.getElementById('count'); // Grabs the count element
const total = document.getElementById('total'); // Grabs the total element
const movieSelect = document.getElementById('movie'); // Grabs the movie select element

let ticketPrice = +movieSelect.value; // Grabs the value of the movie select element and converts it to a number (NOTE: needs to be let since we are changing the value of the ticket price)
console.log(ticketPrice); // Logs the ticket price(10)

function updateSelectedCount() { // Function to update the selected count
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); // Grabs all the selected seats
  // console.log(selectedSeats); // Logs the selected seats
  
    const selectedSeatsCount = selectedSeats.length; // Grabs the number of selected seats
    count.innerText = selectedSeatsCount; // Sets the count element to the number of selected seats
    total.innerText = selectedSeatsCount * ticketPrice; // Sets the total element to the number of selected seats times the ticket price
}

movieSelect.addEventListener('change', (e) => { // Listens for a change in the movie select element
    ticketPrice = +e.target.value; // Sets the ticket price to be a number & to the value of the movie select element
    updateSelectedCount(); // Calls the updateSelectedCount function
});

container.addEventListener('click', (e) => { // Adds an event listener that toggles if a seat can be selected
  // console.log(e.target); // Logs the target element that is clicked
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) { // If the target is a seat and not occupied
      e.target.classList.toggle('selected'); // Toggle the selected class
      
      updateSelectedCount(); // Update the selected count
    }
});





