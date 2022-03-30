// Javascript Code Goes Here!

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // Grabs all the seats that are not occupied
const count = document.getElementById('count'); // Grabs the count element
const total = document.getElementById('total'); // Grabs the total element
const movieSelect = document.getElementById('movie'); // Grabs the movie select element

populateUI();


let ticketPrice = +movieSelect.value; // Grabs the value of the movie select element and converts it to a number (NOTE: needs to be let since we are changing the value of the ticket price)
// console.log(ticketPrice); // Logs the ticket price(10)

function setMovieData(movieIndex, moviePrice) { // Function that sets the movie data
    localStorage.setItem('selectedMovieIndex', movieIndex); // Sets the selected movie index in local storage
    localStorage.setItem('selectedMoviePrice', moviePrice); // Sets the selected movie price in local storage
}

function updateSelectedCount() { // Function to update the selected count
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); // Grabs all the selected seats
  // console.log(selectedSeats); // Logs the selected seats
  
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)); // Creates an array of the selected seats and maps it to the index of the seats array (NOTE: ... is the spread operator)
  // console.log(seatsIndex); // Logs the seats index
  
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); // Stores the selected seats in local storage as a string (NOTE: JSON.stringify converts the array to a string)
  
    const selectedSeatsCount = selectedSeats.length; // Grabs the number of selected seats
    count.innerText = selectedSeatsCount; // Sets the count element to the number of selected seats
    total.innerText = selectedSeatsCount * ticketPrice; // Sets the total element to the number of selected seats times the ticket price
}

//Get Data From Local Storage and Populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); // Grabs the selected seats from local storage and converts it to an array
    // console.log(selectedSeats); // Logs the selected seats
    
    if (selectedSeats !== null && selectedSeats.length > 0) { // Checks if there are selected seats
        seats.forEach((seat, index) => { // Loops through the seats
            if (selectedSeats.indexOf(index) > -1) { // Checks if the index of the selected seats is greater than -1 (NOTE: -1 is the index of the last element in an array)
                seat.classList.add('selected'); // Adds the selected class to the seat
            }
        });
    }
    
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex'); // Grabs the selected movie index from local storage
    if (selectedMovieIndex !== null) { // Checks if there is a selected movie index
        movieSelect.selectedIndex = selectedMovieIndex; // Sets the selected index of the movie select element to the selected movie index
    }
}

movieSelect.addEventListener('change', (e) => { // Listens for a change in the movie select element
    ticketPrice = +e.target.value; // Sets the ticket price to be a number & to the value of the movie select element
  // console.log(e.target.selectedIndex,e.target.value); // Logs the value of the movie select element and the index of the movie select element
  
  setMovieData(e.target.selectedIndex,e.target.value); // Sets the movie data
  
    updateSelectedCount(); // Calls the updateSelectedCount function
});

container.addEventListener('click', (e) => { // Adds an event listener that toggles if a seat can be selected
  // console.log(e.target); // Logs the target element that is clicked
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) { // If the target is a seat and not occupied
      e.target.classList.toggle('selected'); // Toggle the selected class
      
      updateSelectedCount(); // Update the selected count
    }
});

// Initial count and total set
updateSelectedCount();



