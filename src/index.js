let movieList = document.getElementById("films");
let idBuyticket = document.getElementById("buy-ticket")
let movieImg = document.getElementById("poster");
let Title = document.getElementById("title")
let Runtime = document.getElementById("runtime")
let FilmInfo = document.getElementById("film-info")
let Showtime = document.getElementById("showtime")
let Remainingtickets = document.getElementById("ticket-num")
let url = "http://localhost:3000/films/";

//Fetch film data from the server
function getFilm(){
    fetch(url)
    .then(response => response.json())
    .then(data => { 
        //clearing the existing movie title list
        movieList.innerHTML = "";

        for(collection of data){
             displayFilms(collection);
        }
        }
    )
    .catch(error => console.log(error.message));
}
getFilm();

//displaying the movie list on the page
function displayFilms(movies){
    let ticketsAvailable = movies.capacity - movies.tickets_sold;
    filmTitle = movies.title
    movieId = movies.id
    let filmList = document.createElement("li");
    if(!ticketsAvailable > 0)
    { filmList.className = "sold-out"
    }
    movieList.appendChild(filmList);

    let movieDuration = document.createElement("duration");
    movieDuration.innerText = filmTitle;
     filmList.appendChild(movieDuration);
//delete button next to the films
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete"
    filmList.appendChild(deleteButton); 
     deleteButton.addEventListener('click', () => {
    deleteFilm(movies)
    })
    
    movieDuration.addEventListener('click', () => {
        updateFilms(movies);
    })
    if(movies.id === "1"){
        updateFilms(movies);
    }
}
//function for displaying the data on the screen
function updateFilms(movies){
    let remainder = movies.capacity - movies.tickets_sold;
    let filmId = movies.id;
    let availabiity;
     if(remainder > 0){
        availabiity = "Buy Ticket"
    }else{
        availabiity = "Sold out"
    }
    movieImg.src = movies.poster; 
    movieImg.alt = movies.title; 
     Title.innerText = movies.title;
     Runtime.innerText = movies.runtime + " minutes";
     FilmInfo.innerText = movies.description;
     Showtime.innerText = movies.showtime;
     Remainingtickets.innerText = remainder;
    idBuyticket.onclick = () => {
        //update buy ticket button based on availability
        if(remainder > 0)
        { 
             buyTicket(movies)
        }else{
            console.log("You cannot buy tickets")
        }
    };
    idBuyticket.dataset.movieId = movies.id;
    let button = document.querySelector("[data-movie-id='"+filmId+"']");
    button.innerText = availabiity;
}

//sending a patch request to update tickets_sold for the current film
function buyTicket(movies){
    movies.tickets_sold++
    let ticketsSold = movies.tickets_sold;
    let requestHeaders = {
        "Content-Type": "application/json"
    }
   let requestBody = {
        "tickets_sold": ticketsSold
    } 
    fetch(url+movies.id,{
        method: "PATCH",
        headers: requestHeaders,    
        body: JSON.stringify(requestBody)
    })
    .then (response => response.json())
    .then (data => {
        updateFilms(data);
         let numberOfTickets = (data.capacity - data.tickets_sold)
        if(!numberOfTickets > 0)
        { getFilm()
        }
        let  RequestBodyTickets =  {
            "film_id": data.id,
            "number_of_tickets": numberOfTickets
         }
//sending a post request update tickets sold for the current film
        fetch("http://localhost:3000/tickets",{
            method: "POST",
            headers: requestHeaders,    
            body: JSON.stringify(RequestBodyTickets)
        })

        .then (response => response.json())
        .then(data => data)
        .catch (error => console.log(error.message));

    })
    .catch (e => console.log(e.message));
 
 //sending a delete request to the server when the delete button of the current film is clicked   
}
function deleteFilm(movie){
    let requestHeaders = {
        "Content-Type": "application/json"
    }
    let requestBody = {
        "id": movie.id
    }
    fetch(url+movie.id, {
        method: "DELETE",
        headers: requestHeaders,    
        body: JSON.stringify(requestBody)
    })
    .then (response => response.json())
    .then (data => getFilm())
    .catch (error => console.log(error.message));
}