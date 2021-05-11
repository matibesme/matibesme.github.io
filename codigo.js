const listaPel = document.getElementById('listaPel');
const url = 'http://www.omdbapi.com/?apikey=1c0a7fbd'



function traerApi(){
    let film = document.getElementById('titulo').value;
    let año = document.getElementById('año').value;
    let tipoFilm = document.getElementById('tipo').value;

    if(film!= ""){
        let urlFetch = `${url}&s=${film.replace(' ', '+')}&type=${tipoFilm}&y=${año}`
        console.log(urlFetch);
        fetch(urlFetch)
        .then(data => data.json())
        .then(data =>{
          console.log(data.Response);
          if(data.Response == "True"){
            console.log(data);
           
            agregarPeli(data);
          }
          else{
            swal ( "Oops" ,  "No encontramos su pelicula!" ,  "error" )
            
          }
        });
    }   
    else{
      swal ( "Oops" ,  "Ingrese un titulo valido" ,  "error" )
    }
    
}

function agregarPeli(data){ 
  swal({
    icon: "success",
  }); 
  document.getElementById('listaPel').innerHTML =null;

  for(var i = 0; i < data.Search.length; i++){
    let poster = data.Search[i].Poster; 
      
      listaPel.innerHTML += `
        
       
          <tr class="table-warning">
            <td class="col-2">${data.Search[i].Title}</td>
            <td  class="col-2">${data.Search[i].Year}</td>
            <td  class="col-2">${data.Search[i].Type}</td>
            <td class="col-1"><img class"img3" src="${poster}" width="120" height="150" alt="imagen"></td>
        <td class="col-3"><button class="btn btn-danger mt-2 mb-2 botonBuscar" id="masInfo" onclick="mostrarModal('${data.Search[i].imdbID}')" > Detalles</button></td>
          </tr>
        
      
      
        `
} 

}




const mostrarModal = (imdbID) => {



  let urlFetch2 = `${url}&i=${imdbID}`
  fetch(urlFetch2)
      .then(data => data.json())
      .then(data =>{
        console.log(data);
        if(data.Response == "True" ){
          modalDetalle = document.createElement('div');
          modalDetalle.innerHTML = `
          <div class="modal" tabindex="-1">
              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div class="modal-content">
                      <div class="modal-header">
                      <h5 class="modal-title center">${data.Title}</h5></center>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                      <center><img class"imgenCentrar imgenTam" src="${data.Poster}" width="120" height="150" alt="imagen"><p> </center>
                          <p>Comienzo: ${data.Released}
                          </p>
                          <p>Pais:  ${data.Country}
                          </p>
                          <p>Duracion: ${data.Runtime}
                          </p>
                          <p>Director:${data.Director}</p>
                          <p>Protagonistas:${data.Actors}</p>
                          <p>Premios:${data.Awards}</p>
                          <p>Produccion:${data.Production}</p>
                          <p>IMDB Rating:${data.imdbRating}</p>
                          <p>Resumen:${data.Plot}</p>
                          
                          
                      </div>
                  
                  </div>
              </div>
          </div>
          `
          /*<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>*/
          document.body.append(modalDetalle);
          var modal = new bootstrap.Modal(modalDetalle.querySelector('.modal'));
          modal.show();

        }
      });

  console.log(urlFetch2);

  
  
}











