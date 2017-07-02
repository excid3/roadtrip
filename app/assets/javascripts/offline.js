var pendingStopsKey = "pendingStops";
var pending = [];

function pendingStops() {
  return JSON.parse(localStorage.getItem(pendingStopsKey)) || [];
}

function addStop(stop) {
  pending.push(stop);
  localStorage.setItem(pendingStopsKey, JSON.stringify(pending));
  return true
}

function formToObject(form){
  var formData = new FormData(form), json = {};
  for (const [key, value]  of formData.entries()) { json[key] = value; }
  return json;
}

function renderPendingStops() {
  var table = document.getElementById('pending_stops').getElementsByTagName('tbody')[0];
  table.innerHTML = "";

  pending.forEach(function(stop) {
    var row  = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    var text = document.createTextNode(stop.latitude + ", " + stop.longitude);
    cell.appendChild(text);

    var cell = row.insertCell(1);
    var text = document.createTextNode(stop.name);
    cell.appendChild(text);

    var cell = row.insertCell(2);
    var text = document.createTextNode(stop["[visited_at(1i)]"] + "/" + stop["[visited_at(2i)]"] + "/" + stop["[visited_at(3i)]"]);
    cell.appendChild(text);
  });
}

function handleOfflineForm(form) {
  renderPendingStops();

  fetch('/trips.json', {
    method: 'get'
  }).then(function(response) {
    return response.json().then(function(json) {
      console.log(json);
    });
  }).catch(function(err) {
    // Error :(
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    addStop(formToObject(e.target));
    renderPendingStops();

    return false;
  });
}

document.addEventListener("turbolinks:load", function() {
  pending = pendingStops()

  var form = document.querySelector("[data-behavior~='offline-stop-form']")
  if (form != undefined) { handleOfflineForm(form); }
});
