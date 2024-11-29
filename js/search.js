document.getElementById("search-button").addEventListener("click", async () => {
    const query = document.getElementById("search-input").value.trim();
    const resultsGrid = document.getElementById("search-results");
    resultsGrid.innerHTML = ""; // Clear previous results
  
    if (!query) {
      alert("Please enter a search query!");
      return;
    }
  
    // Fetch search results
    try {
      const response = await fetch(`https://movies-backend-api.vercel.app/search?query=${query}&maxResults=10`);
      const data = await response.json();
  
      // Display results
      if (data.movies.length === 0) {
        resultsGrid.innerHTML = "<p>No movies found! Try another query.</p>";
        return;
      }
  
      data.movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
          <img src="${movie.thumbnail}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p>${movie.description || "No description available."}</p>
          <button onclick="window.open('${movie.video_url}', '_blank')">Watch Now</button>
        `;
        resultsGrid.appendChild(movieCard);
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
      resultsGrid.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    }
  });
  