var youtube_Key = "AIzaSyBcY7xBC8qSNeUQv39-csOZ6sWqitZ1BJw";

// Access Yoga JSON API
function listOfAllYogaPoses() {
  fetch("https://raw.githubusercontent.com/rebeccaestes/yoga_api/master/yoga_api.json")
    .then((result) => result.json())
    .then((newResult) => {
      getVariableforAllPoses(newResult);
      var newResult = newResult;
    })
    .catch((error) => console.log(error));
}

// Access YouTube API
function callYoutubeAPI(valueSelected) {
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=how+to+do+${valueSelected}+yoga+pose&maxResults=1&&safeSearch=moderate&key=${youtube_Key}`)
    .then((youtubeResult) => youtubeResult.json())
    .then((youtubeResult) => {
      displayOtherResults(youtubeResult.items[0]);
    })
    .catch((error) => console.log(error));
}

// Create Dropdown Menu
function getVariableforAllPoses(newResult) {
  for (let i = 0; i < newResult.length; i++) {
    let allPoses = newResult[i].english_name;
    $(".select-dropdown").append(
      `
      <option class="dropdown-style" id="move-dropdown" value="${allPoses}">
        ${allPoses}
      </option>
      `
    );
    if (allPoses === newResult[i].english_name) {
      let sanskritName = newResult[i].sanskrit_name;
      let poseImage = newResult[i].img_url;
    }
  }
  submitButton(newResult);
}

// Enter/Submit Button
function submitButton(newResult) {
  $(".dropdown-form").submit((event) => {
    event.preventDefault();
    let valueSelected = $(".dropdown-style:selected").val();
    callYoutubeAPI(valueSelected);
    for (let i = 0; i < newResult.length; i++) {
      if (valueSelected === newResult[i].english_name) {
        let objectSelected = newResult[i];
        cssChanges();
        displayResults(objectSelected);
      }
    }
  });
}

// jQuery changes to CSS
function cssChanges() {
  $("#yoga-explanation").hide();
  $("#intro-background").hide();
}

// Results Displayed - Yoga
function displayResults(objectSelected) {
  $(".results").empty();
  $(".results").append(`
      <div class='position-rel'>
      <div id="sanskrit-div"><p>${objectSelected.sanskrit_name}</p></div>
      </div>
      <div class='results-inline'>
      <img id="pose-img" src="${objectSelected.img_url}"></img>
      </div>

    `);
}

// Results Displayed - YouTube
function displayOtherResults(video) {
  $(".results-inline").append(`
      <iframe width="500" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `);
}

// START HERE
function init() {
  listOfAllYogaPoses();
}

$(init); //document on ready
