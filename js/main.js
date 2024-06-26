
//clase de canciones
class Song {
    constructor(song, title, author ,img){
        this.song = song;
        this.author = author;
        this.title = title;
        this.img = img;
    }

    get getSong() {
        return this.song;
    }

    get getAuthor() {
        return this.author;
    }

    set setAuthor(author){
        this.author = author
    }

    get getTitle() {
        return this.title;
    }   

    get getImg() {
        return this.img;
    }

    set setSong(song) {
        this.song = song;
    }

    set setTitle(title) {   
        this.title = title; 
    }

    set setImg(img) {
        this.img = img;
    }
}

//clase de albums
class Album {
    constructor(songs, title, author ,img, categoria){
        this.categoria = categoria;
        this.songs = songs;
        this.author = author;
        this.title = title;
        this.img = img;
    }

    get getCategoria() {
        return this.categoria;
    }
    set setCategoria(categoria){
        this.categoria = categoria;
    }

    get getSongs() {
        return this.songs;
    }

    set setSongs(songs) {
        this.songs = songs;
    }

    get getAuthor() {
        return this.author;
    }

    set setAuthor(author){
        this.author = author
    }

    get getTitle() {
        return this.title;
    }   

    get getImg() {
        return this.img;
    }
    set setTitle(title) {   
        this.title = title; 
    }

    set setImg(img) {
        this.img = img;
    }
}


let lugarDeAlbumes = document.getElementById("albumes-populares");



let albums = [
    new Album([new Song(new Audio("../songs/dryhands.mp3"), "Dry Hands", "C418", "../imgs/dryhands.jpg"), 
    new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "C418", "../imgs/haggstrom.jpg"), 
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "C418", "../imgs/wethands.jpg")], "Minecraft", "C418", "../imgs/minecraft.jpg", "Game Soundtrack"),

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "Dry Hands", "Luciana", "../imgs/dryhands.jpg"), 
    new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "Luciana", "../imgs/haggstrom.jpg"), 
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "Luciana", "../imgs/wethands.jpg")], "Minecraft", "Luciana", "../imgs/minecraft.jpg", "Rock"),

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "Dry Hands", "Lian", "../imgs/dryhands.jpg"), 
    new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "Lian", "../imgs/haggstrom.jpg"), 
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "Lian", "../imgs/wethands.jpg")], "Minecraft", "Lian", "../imgs/minecraft.jpg", "Progressive Rock")
]

let preferenciasUsuario = JSON.parse(localStorage.getItem("preferenciasMusica")) || [];


/** guarda una cancion likeada por el usuario
 * @param url
 * @param title
 * @param author
 * @param img
 * @returns void
*/
function saveLikes(url, title, author, img) {
    let arrayLikes = JSON.parse(localStorage.getItem("likes")) || [];
    let likedObjSong = { url, title, author, img };
    let c = 0;
    let encontrado = false;
    while(c < arrayLikes.length && !encontrado){
        if(arrayLikes[c].title == likedObjSong.title){
            encontrado = true;
            console.log("true");
        }
        c++;
    }
    if(!encontrado){
        arrayLikes.push(likedObjSong);
        localStorage.setItem("likes", JSON.stringify(arrayLikes));
    }
}



function showAlbum() {
    for (let index = 0; index < albums.length; index++) {
        if(preferenciasUsuario && preferenciasUsuario.includes(albums[index].getCategoria)){
            let albumSpace = document.createElement("div");
            albumSpace.id = `album${index}`
            albumSpace.innerHTML = `
            <a id="button${index}" onclick="showModal(${index})">
                <img src="${albums[index].getImg}" alt="Album Cover">
                <h3>${albums[index].getTitle}</h3>
                <p>${albums[index].getAuthor}</p>
                <p>${albums[index].getCategoria}</p>
            </a>
                <button onclick="addAlbum(${index})">Añadir a biblioteca</button>
              `;
            lugarDeAlbumes.appendChild(albumSpace);
            let modal = document.getElementById("myModal");
            let span = document.getElementsByClassName("close")[0];
            let btn = document.getElementById("button"+index);
            btn.onclick = function() {
                showModal(index);
                modal.style.display = "block";
            }
        
            span.onclick = function() {
                modal.style.display = "none";
            }
        
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }else if(!preferenciasUsuario || preferenciasUsuario.length == 0){
            let albumSpace = document.createElement("div");
            albumSpace.id = `album${index}`
            albumSpace.innerHTML = `
            <a id="button${index}" onclick="showModal(${index})">
                <img src="${albums[index].getImg}" alt="Album Cover">
                <h3>${albums[index].getTitle}</h3>
                <p>${albums[index].getAuthor}</p>
                <p>${albums[index].getCategoria}</p>
            </a>
                <button onclick="addAlbum(${index})">Añadir a biblioteca</button>
              `;
            lugarDeAlbumes.appendChild(albumSpace);
            let modal = document.getElementById("myModal");
            let span = document.getElementsByClassName("close")[0];
            let btn = document.getElementById("button"+index);
            btn.onclick = function() {
                showModal(index);
                modal.style.display = "block";
            }
        
            span.onclick = function() {
                modal.style.display = "none";
            }
        
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    }
}

let historial = JSON.parse(localStorage.getItem("historial")) || [];

function guardarHistorial(index, i){
    // console.log(albums[index].getSongs[i]);
    historial.push(albums[index].getSongs[i]);
    localStorage.setItem("historial", JSON.stringify(historial));
}

function showModal(index) {
    let modalContent = document.getElementById("modal-content");
    let album = albums[index];
    let songSection = document.createElement("div");
    for (let i = 0; i < albums[index].getSongs.length; i++) {
        let objID = `obj${i}`;
        let songTitle = albums[index].getSongs[i].getTitle;
        songSection.innerHTML += `
            <h3>${songTitle}</h3>
            <audio onplay="guardarHistorial(${index}, ${i})" controls>
                <source src="${albums[index].getSongs[i].getSong.src}" type="audio/mpeg">
            </audio>
            <button onclick="saveLikes('${albums[index].getSongs[i].getSong.src}', '${songTitle}', '${album.getAuthor}', '${albums[index].getImg}', '${objID}')">Añadir a tus me gusta</button>
        `; 
    }
    
    modalContent.innerHTML = `
        <h3>${album.getTitle}</h3>
        <p>${album.getAuthor}</p>
    `;
    modalContent.appendChild(songSection);
}

function addAlbum(index) {
    let biblioteca = document.getElementById("biblioteca");
    if(!biblioteca.innerHTML.includes(albums[index].getAuthor)){
        let bibliotecaEspacio = document.createElement("a");
        bibliotecaEspacio.id = `albumBiblioteca${index}`
        bibliotecaEspacio.innerHTML = `
            <h3>${albums[index].getTitle}</h3>
            <p>${albums[index].getAuthor}</p>
            <p>${albums[index].getCategoria}</p>
        `;
        // console.log(albums[index].getTitle);
        // console.log();
        biblioteca.appendChild(bibliotecaEspacio);
        let albumsHtml = biblioteca.innerHTML;
        localStorage.setItem('biblioteca', albumsHtml);
        let modal = document.getElementById("myModal");
        let span = document.getElementsByClassName("close")[0];
        let btn = document.getElementById(`albumBiblioteca${index}`);
        btn.onclick = function() {
            showModal(index);
            modal.style.display = "block";
        }
    
        span.onclick = function() {
            modal.style.display = "none";
        }
    
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}

function getLocalStorage(){
    let biblioteca = document.getElementById("biblioteca");
    let savedAlbumsHtml = localStorage.getItem('biblioteca');
    if(savedAlbumsHtml){
        biblioteca.innerHTML = savedAlbumsHtml;
        console.log(biblioteca.childNodes);
        for (let index = 0; index < biblioteca.childNodes.length; index++) {
            let btn = document.getElementById(`albumBiblioteca${index}`);
            console.log(btn);
            let modal = document.getElementById("myModal");
            let span = document.getElementsByClassName("close")[0];
            btn.onclick = function() {
                showModal(index);
                modal.style.display = "block";
            }
        
            span.onclick = function() {
                modal.style.display = "none";
            }
        
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    }
    console.log(savedAlbumsHtml);
}

function cleanLibrary(){
    localStorage.removeItem("biblioteca")
    biblioteca.innerHTML = "";
}

function loadStylesLS(){
    let style = localStorage.getItem("style");
    document.body.style.background = style
}

loadStylesLS()
showAlbum();
document.addEventListener("DOMContentLoaded", getLocalStorage);

