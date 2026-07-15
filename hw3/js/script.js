// Adds a click listener to the search button
document.querySelector("#searchButton").addEventListener("click", searchEarthquakes);

function searchEarthquakes(event) {
    // Prevents the form from refreshing the page when submitted
    event.preventDefault();

    // Retrieve the values entered by the user
    let startDate = document.querySelector("#startDate").value;
    let endDate = document.querySelector("#endDate").value;
    let minMag = document.querySelector("#minMag").value;

    // Validate that all input fields have been completed
    if (startDate === "" || endDate === "" || minMag === "") {
        alert("Please complete all fields");
        return;
    }
    // Validate that the end date is after the start date
    if (endDate < startDate) {
        alert("End Date must be after the Start Date");
        return;
    }

    // Build the USGS Earthquake API URL using the user's input
    let url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&minmagnitude=${minMag}`;
    
    // Send the API request
    fetchData(url);

}

// Retrieves earthquake data from the USGS Web API
async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();

        // Select the results container and clear any previous search results
        let resultsDiv = document.querySelector("#results");
        resultsDiv.innerHTML = "";
        resultsDiv.innerHTML = `<h3>${data.features.length} Earthquake(s) Found</h3>`;

        // Display a message if no earthquakes match the search criteria
        if (data.features.length === 0) {
            resultsDiv.innerHTML = "<h3>No Earthquakes Found For That Search.</h3>";
            return;
        }

        // Loop through each earthquake returned by the API
        for (let i = 0; i < data.features.length; i++) {

            // Store the current earthquake object
            let earthquake = data.features[i];

            // Determine the display color based on earthquake magnitude
            let magColor = "green";
            if (earthquake.properties.mag >= 6) {
                magColor = "red";
            }
            else if (earthquake.properties.mag >= 4) {
                magColor = "orange";
            }

            // Convert the earthquake timestamp into a readable date and time
            let quakeDate = new Date(earthquake.properties.time);

            // Display the earthquake information on the webpage
            resultsDiv.innerHTML += `
                <div class="earthquake-card">
                    <h3>${earthquake.properties.place}</h3>
                    <p>Magnitude: <span style="color:${magColor}; font-weight:bold;">${earthquake.properties.mag}</span></p>
                    <p>Depth: ${earthquake.geometry.coordinates[2]} km</p>
                    <p>Date: ${quakeDate.toLocaleString()}</p>
                    <p><a href="${earthquake.properties.url}" target="_blank">USGS Details</a></p>
                </div>
            `;
        }
    } catch (error) {
        console.error(error);
        document.querySelector("#results").innerHTML = "<h3>Unable to retrieve earthquake data. Please try again later.</h3>";
    }
}
