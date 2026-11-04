// Get the checkboxes
//
const dictionary = document.getElementById('dictionary');
const quotes = document.getElementById('quotes');

// Toggle the checkboxes
dictionary.addEventListener('change', () => {
    if (dictionary.checked) {
        quotes.checked = false;
    }
});

quotes.addEventListener('change', () => {
    if (quotes.checked) {
        dictionary.checked = false;
    }
});

const form = document.getElementById('api-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const input = document.getElementById('input').value.trim();
    const response = document.getElementById('response');

    if (!dictionary.checked && !quotes.checked) {
        response.textContent = 'Please select an API.';
        return;
    }

    if (!input) {
        response.textContent = 'Please enter a word or category.';
        return;
    }

    // Dictionary API
    if (dictionary.checked) {
        const url = 'https://api.api-ninjas.com/v1/dictionary?word=' + encodeURIComponent(input);

        response.textContent = 'Loading...';

        fetch(url, {
            headers: { 'X-Api-Key': apiKey }
        })
        .then(result => {
            if (!result.ok) {
                throw new Error('API request failed.');
            }
            return result.json();
        })
        .then(data => {
            if (data.valid) {
                response.textContent = data.definition;
            } else {
                response.textContent = 'Word not found.';
            }
        })
        .catch(error => {
            response.textContent = error.message;
        });
    }

    // Quotes API
    else if (quotes.checked) {
        const url = 'https://api.api-ninjas.com/v2/quotes?categories=' + encodeURIComponent(input);

        response.textContent = 'Loading...';

        fetch(url, {
            headers: { 'X-Api-Key': apiKey }
        })
        .then(result => {
            if (!result.ok) {
                throw new Error('API request failed.');
            }
            return result.json();
        })
        .then(data => {
            if (data.length > 0) {
                response.textContent =
                    '"' + data[0].quote + '" — ' + data[0].author;
            } else {
                response.textContent = 'No quotes found.';
            }
        })
        .catch(error => {
            response.textContent = error.message;
        });
    }
});