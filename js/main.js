const film_recomendations = [
  "lotr_fellowship1.jpg",
  "lotr_twotowers.jpg",
  "lotr_return.jpg",
  "schindlers_list.jpg",
  "sleepy_hollow.jpg",
  "from_hell.jpg"
];

let index = 0;
let intervalId;

function setImage(index) {
  const filmIntro = document.getElementById("filmIntro");
  filmIntro.style.backgroundImage = `url(${film_recomendations[index]})`;
  filmIntro.dataset.currentImage = film_recomendations[index];
  console.log("Current image set to:", film_recomendations[index]);
}

function showNextImage() {
  const filmIntro = document.getElementById("filmIntro");
  filmIntro.classList.add("fade-out");

  setTimeout(() => {
    setImage(index);
    filmIntro.classList.remove("fade-out");
    index = (index + 1) % film_recomendations.length;
  }, 700); 
}

function startImageRotation() {
  intervalId = setInterval(showNextImage, 5000);
}

function stopImageRotation() {
  clearInterval(intervalId);
}

const filmIntro = document.getElementById("filmIntro");
setImage(index);
index = (index + 1) % film_recomendations.length;
startImageRotation();

filmIntro.addEventListener("mouseenter", stopImageRotation);
filmIntro.addEventListener("mouseleave", startImageRotation);


//get info from database and send it to "More info" button

document.getElementById("fa-circle-info").closest("button").addEventListener("click", async () => {

  const currentImage = filmIntro.dataset.currentImage;
  console.log("Button clicked, currentImage:", currentImage);
  const infoBox = document.getElementById("infoExplained");

  if (currentImage) {

    const response = await fetch(`http://localhost:3000/film-info/${currentImage}`);
    const data = await response.json();

    if (data.description) {
        infoBox.innerHTML = `<h2>${data.title}</h2><p>${data.description}</p>`;
        infoBox.style.display = "block";
    } else {
        infoBox.innerHTML = `<p>No info available for this film.</p>`;
        infoBox.style.display = "block";
    }
  }
});



