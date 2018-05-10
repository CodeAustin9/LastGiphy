$(document).ready(function () {
  // Constructing a queryURL using the animal name -- api key and rating and limit are hard coded
  var animal = $(this).attr("data-animal");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dHWA4xaK8RoKsGZaoaS3ZssGZzx7V7VR&limit=25&rating=g";
var animals = [
   "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
   "bird", "ferret", "turtle", "sugar glider", "chinchilla",
   "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
   "capybara", "teacup pig", "serval", "salamander", "frog"
 ];
  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // After data comes back from the request
    .done(function (response) {
      console.log(response);
      var results = response.data;


      for (var i = 0; i < animals.length; i++) {
        var animalDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        p.text(results[i].rating);
        var animalImage = $("<img>");
        // TO DO:ADD TO; Setting the src attribute of the image to a property pulled off the result item
        animalImage.attr("src", results[i].images.fixed_height.url).attr("data-state", "animate");
        animalImage.addClass("animalImage");
        animalImage.attr("data-name", animals[i]);
        animalImage.attr("src", results[i].images.fixed_height.url);
        animalDiv.append(p);
        // ---------------------------------------------------------
        
      }

      // This function handles events where a animal button is clicked
      $("#add-animal").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding animal from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie-btn"
      // $(document).on("click", ".animal-btn", displayAnimal);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

//---------------------------------------------------------------

      $(".gif").on("click", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

      //----------------------------------------
  
      //TO DO: function for adding a button with an animal label

      // var animals = ["cat", "dog", "whale", "shark", "sloth", "tazmanian devil", "owl", "falcon", "snake", "hamster", "gerbil", "anteater", "mongoose", "bird", "goose"]

    })//END OF AJAX CALL

    function renderButtons() {
      $("#animals-buttons").empty();
     for (let index = 0; index < animals.length; index++) {
      var buttonTemplate = $(`
        <button class="btn btn-animal" id="${animals[index]}">${animals[index]}</button>
      `);

      $("#animals-buttons").append(buttonTemplate);  
     }
    }
    renderButtons();

  });