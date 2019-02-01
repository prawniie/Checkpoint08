
async function getAllSpecies() {
    let allSpecies = document.getElementById("allSpecies");

    let response = await fetch(`/observation/`, { method: "GET" });

    if (response.status === 200) {
        let allObservations = await response.json();
        console.log("allObservations", allObservations)

        for (let o of allObservations) {
            allSpecies.innerHTML += `<p>${o.name}</p></br>`;
        }
    } else {
        console.log('Something went wrong..')
    }
}

async function getAllObservations() {
    let observations = document.getElementById("observations");

    let response = await fetch(`/observation/`, { method: "GET" });

    if (response.status === 200) {
        let allObservations = await response.json();
        console.log("allObservations", allObservations)

        let html = "<table><tr><th>Date</th><th>Species</th><th>Location</th><th>Notes</th></tr>";

        for (let o of allObservations) {
            html += `<tr>
                        <td>${formatDate(o.date)}</td>
                        <td>${o.name}</td>
                        <td>${o.location === null ? "" : o.location}</td>
                        <td>${o.notes === null ? "" : o.notes}</td>
                    </tr>`;
        }

        observations.innerHTML = html + `</table>`;

    } else {
        console.log('Something went wrong..');
    }
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
                name: species,
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
