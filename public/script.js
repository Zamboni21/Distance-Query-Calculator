document.getElementById('form-distance').addEventListener('submit', async (event) => {
    event.preventDefault();

    let source = document.getElementById('source').value.replace(/ /g, '+');
    let destination = document.getElementById('destination').value.replace(/ /g, '+');

    let result = document.getElementById('result').innerHTML;
    let errorMessage = document.getElementById('error-message').innerHTML;

    if (result !== '' || errorMessage !== '') {
        document.getElementById('result').innerHTML = '';
        document.getElementById('result').style.display = 'none';
        document.getElementById('error-message').innerHTML = '';
        document.getElementById('error-message').style.display = 'none';
    }

    try {
        const sourceResponse = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: source,
                format: 'json',
                polygon_kml: 1
            }
        });
        if (sourceResponse.data.length === 0) {
            throw new Error('Source address not found');
        }
        const sourceCoords = sourceResponse.data[0];

        const destinationResponse = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: destination,
                format: 'json',
                polygon_kml: 1
            }
        });
        if (destinationResponse.data.length === 0) {
            throw new Error('Destination address not found');
        }
        const destinationCoords = destinationResponse.data[0];

        const distance = calculateDistance(
            parseFloat(sourceCoords.lat), parseFloat(sourceCoords.lon),
            parseFloat(destinationCoords.lat), parseFloat(destinationCoords.lon)
        );

        document.getElementById("result").innerHTML = `Distance: ${distance.toFixed(2)} km`;
        document.getElementById("result").style.display = 'block';

        // Send the query to the server
        await axios.post('/query', {
            source: source,
            destination: destination,
            distance: distance
        });
    }
    catch (error) {
        console.error(error);
        document.getElementById("error-message").innerHTML = 'Error: ' + error.message;
        document.getElementById("error-message").style.display = 'block';
    }
});

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

document.getElementById('btn-historicalQueriesView').addEventListener('click', async () => {
    window.location.href = '/queriesView';
});