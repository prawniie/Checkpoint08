
async function getAllSpecies() {
    let observations = document.getElementById("observations");

    let response = await fetch(`/observation/`, { method: "GET" });

    if (response.status === 200) {
        let allObservations = await response.json();
        console.log("allObservations", allObservations)

        observations.innerHTML = `<h3>All observations</h3>`;

        for (let o of allObservations) {
            observations.innerHTML += `${o.name}<br>`;
        }

    } else {
        console.log('Something went wrong..');
    }
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
