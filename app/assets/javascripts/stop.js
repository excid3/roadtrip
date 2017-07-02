document.addEventListener("turbolinks:load", function() {
  var geocode_form = document.querySelector("[data-behavior~='geocode-form']")
  if (geocode_form != undefined) { getLocation() }
});

function getLocation() {
  // If browser supports geolocation and we don't already have coords, try to get it
  if (navigator.geolocation) {
    if (document.getElementById("stop_latitude").value == "") {
      showLoadingCoords()
      navigator.geolocation.getCurrentPosition(setPosition);
    }
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function setPosition(position) {
  hideLoadingCoords()
  document.getElementById("stop_latitude").value  = position.coords.latitude
  document.getElementById("stop_longitude").value = position.coords.longitude
}

function showLoadingCoords() {
  document.querySelector("[data-behavior='loading-coordinates']").style.display = 'block'
}

function hideLoadingCoords() {
  document.querySelector("[data-behavior='loading-coordinates']").style.display = 'none'
}
