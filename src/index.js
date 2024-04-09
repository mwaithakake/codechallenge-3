       
        document.addEventListener('DOMContentLoaded' , () => {
            getFilm()
          ticketsAvailable()

        })
     
        function getFilm(){
            const filmList = document.getElementById('films')
            fetch ("http://localhost:3000/films")
            .then (response => response.json() )
            .then ((collection) => {
                collection.forEach (film => {
                    const list = document.createElement ('li')
                    list.innerText = film.title;
                    list.addEventListener('click'  , () => {
                        getMovieDetails(film)
                    })
                
                filmList.appendChild(list);
                console.log (film.title)
                
                })
                    
                });

            } 
            
           function getMovieDetails(film) {
                const image = document.getElementById('poster');
                image.src = film.poster

                const title = document.getElementById('title');
                title.innerText = `${film.title}`

                const runtime = document.getElementById ('runtime');
                runtime.innerText = `${film.runtime}`

                const showtime = document.getElementById('showtime');
                showtime.innerText = `${film.showtime}`

               const description = document.getElementById('film-info');
               description.innerText = `${film.description}`


                const tickets = document.getElementById('ticket-num');
                const availableTickets = film.capacity - film.tickets_sold
            }

        function ticketsAvailable (){
            const tickets = document.getElementById('ticket-num');
            const availableTickets  = film.capacity - film.tickets_sold
            return availableTickets
        }
        