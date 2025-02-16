// Function to fetch all the queries done by the user
async function fetchQueries() {
    try {
        const response = await axios.get('/queries');
        const queries = response.data;
        if(!Array.isArray(queries)) {
            throw new Error('Invalid data');
        }
        const tableBody = document.getElementById('queries-table-body');
        tableBody.innerHTML = '';
        queries.forEach(query => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${query.source}</td>
                <td>${query.destination}</td>
                <td>${query.distance.toFixed(2)}</td>
                <td>${new Date(query.timestamp).toLocaleString()}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching queries:', error);
    }
}

// Fetch queries when the page loads
window.onload = fetchQueries;

document.getElementById('btn-mainView').addEventListener('click', async (event) => {
    window.location.href = '/';
});