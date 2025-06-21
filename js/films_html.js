function sortFilms(container, order) { 
  const filmsDiv = container.querySelector(".films");
  const filmsArray = Array.from(filmsDiv.children);

  filmsArray.sort((a, b) => {
    const yearA = parseInt(a.dataset.year);
    const yearB = parseInt(b.dataset.year);

    if (order === "asc") {
      return yearA - yearB;
    } else {
      return yearB - yearA;
    }
  });

  filmsDiv.innerHTML = "";
  filmsArray.forEach(film => filmsDiv.appendChild(film));
}

document.querySelectorAll(".slider_container").forEach(container => {
  const prevBtn = container.querySelector(".prevBtn");
  const nextBtn = container.querySelector(".nextBtn");
  const filmRow = container.querySelector(".films");

  if (prevBtn && filmRow) {
    prevBtn.addEventListener("click", () => {
      filmRow.scrollBy({ left: -filmRow.offsetWidth, behavior: "smooth" });
    });
  }

  if (nextBtn && filmRow) {
    nextBtn.addEventListener("click", () => {
      filmRow.scrollBy({ left: filmRow.offsetWidth, behavior: "smooth" });
    });
  }
});

document.querySelectorAll(".orderSelect").forEach(select => {
  select.addEventListener("change", (e) => {
    const targetId = e.target.dataset.target; 
    if (!targetId) return;

    const container = document.getElementById(targetId);

    if (container && container.classList.contains("slider_container")) {
      sortFilms(container, e.target.value);
    } else {
      console.warn("No slider_container found with id:", targetId);
    }
  });
});