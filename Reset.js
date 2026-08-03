// Array used to store the movie titles
let movieTitles = [];

// Connect the JavaScript to the HTML elements
const movieInput = document.getElementById("movieTitle");
const addButton = document.getElementById("addButton");
const displayButton = document.getElementById("displayButton");
const resetButton = document.getElementById("resetButton");
const movieList = document.getElementById("movieList");
const message = document.getElementById("message");

// Add a movie title to the array
function addMovie() {
    // Remove extra spaces from the beginning and end
    const title = movieInput.value.trim();

    // Make sure the user entered a title
    if (title === "") {
        message.textContent = "Please enter a movie title.";
        movieInput.focus();
        return;
    }

    // Add the title to the array
    movieTitles.push(title);

    message.textContent = `"${title}" was added to the list.`;

    // Clear the input and return the cursor to it
    movieInput.value = "";
    movieInput.focus();
}

// Sort and display the complete movie list
function displayMovies() {
    movieList.innerHTML = "";

    if (movieTitles.length === 0) {
        movieList.innerHTML = "<p>No movies have been entered.</p>";
        message.textContent = "";
        return;
    }

    // Create a sorted copy so the original array is not changed
    const sortedMovies = [...movieTitles].sort((firstMovie, secondMovie) =>
        firstMovie.localeCompare(secondMovie)
    );

    // Create a paragraph for each movie title
    sortedMovies.forEach(function (movie) {
        const movieParagraph = document.createElement("p");
        movieParagraph.textContent = movie;
        movieList.appendChild(movieParagraph);
    });

    message.textContent = `${sortedMovies.length} movie(s) displayed alphabetically.`;
}

// Clear the array and the displayed list
function resetMovies() {
    movieTitles = [];

    movieInput.value = "";
    movieList.innerHTML = "<p>No movies have been displayed yet.</p>";
    message.textContent = "The movie list was reset.";

    movieInput.focus();
}

// Run the appropriate function when each button is clicked
addButton.addEventListener("click", addMovie);
displayButton.addEventListener("click", displayMovies);
resetButton.addEventListener("click", resetMovies);

// Allow the Enter key to add a movie
movieInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addMovie();
    }
});