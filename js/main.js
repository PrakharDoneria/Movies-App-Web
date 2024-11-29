document.addEventListener("DOMContentLoaded", async () => {
  const moviesGrid = document.getElementById("trending-movies");

  // Fetch trending movies
  try {
    const response = await fetch("https://movies-backend-api.vercel.app/trending?country=IN");
    const data = await response.json();

    data.trending.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");
      movieCard.innerHTML = `
        <img src="${movie.thumbnail}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.views} views</p>
        <a href="${movie.video_url}" target="_blank">Watch Now</a>
      `;
      moviesGrid.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }

  // Navigate to search page
  document.getElementById("search-button").addEventListener("click", () => {
    window.location.href = "search.html";
  });
});
