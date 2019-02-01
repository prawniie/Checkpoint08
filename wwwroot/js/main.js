
async function addSpecies() {
    let species = document.getElementById("input").value;

    let response = await fetch(`/observation/`, {
        method: "POST",
        body: JSON.stringify(
            {
                name: species
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
