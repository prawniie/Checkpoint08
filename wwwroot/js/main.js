getAllObservations();
let allObservations = "";
let species = "";

async function getAllSpecies() {

    let response = await fetch(`/observation/getalluniquespecies/`, { method: "GET" });

    if (response.status === 200) {

        species = await response.json();
        console.log("species", species)

        printAllSpecies();

    } else {
        console.log('Something went wrong..')
    }
}

function printAllSpecies() {
    let html = "<table>"

    for (let s of species) {
        html += `<tr><td>${s}</td></tr>`;
    }
    document.getElementById("allSpecies").innerHTML = html + `</table>`;
}

async function getAllObservations() {

    let response = await fetch(`/observation/`, { method: "GET" });

    if (response.status === 200) {
        allObservations = await response.json();
        console.log("allObservations", allObservations)

        printAllObservations();
        getAllSpecies();

    } else {
        console.log('Something went wrong..');
    }
}

function printAllObservations() {
    let html = "<table><tr><th>Date</th><th>Species</th><th>Location</th><th>Notes</th></tr>";

    for (let o of allObservations) {
        html += `<tr>
                        <td>${formatDate(o.date)}</td>
                        <td>${o.species}</td>
                        <td>${o.location === null ? "" : o.location}</td>
                        <td>${o.notes === null ? "" : o.notes}</td>
                    </tr>`;
    }

    document.getElementById("observations").innerHTML = html + `</table>`;
}

function formatDate(date) {
    return date.slice(0, 19).replace("T", " ");
}

async function addSpecies() {
    let date = document.getElementById("date").value;
    let species = document.getElementById("species").value;
    let location = document.getElementById("location").value;
    let notes = document.getElementById("notes").value;

    let response = await fetch(`/observation/`, {
        method: "POST",
        body: JSON.stringify(
            {
                species: species,
                date: date,
                location: location,
                notes: notes
            }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.status === 200) {
        console.log('New species added!');
        getAllSpecies();
        getAllObservations();
    } else {
        console.log('Something went wrong..');
    }
}

async function recreateDatabase() {
    document.getElementById("recreateButton").style.display = "none";
    document.body.style.backgroundColor = "blue";
    let response = await fetch("/observation/recreate", {
        method: "POST"
    });

    if (response.status === 200) {
        document.getElementById("recreateButton").style.display = "block";
        document.body.style.backgroundColor = "green";
        
    } else {
        document.getElementById("recreateButton").style.display = "block";
        document.body.style.backgroundColor = "red";

    }

}
