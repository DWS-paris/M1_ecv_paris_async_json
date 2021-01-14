// Declaration
const apiUrl = 'http://localhost:3000';

// Function
const getFormSubmit = formTag => {
    // Get form submit
    formTag.addEventListener('submit', event => {
        event.preventDefault();

        // TODO: check input value

        // Use fetch API to post data
        fetch( `${apiUrl}/posts`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title: document.querySelector('[name="title"]').value,
                image: document.querySelector('[name="image"]').value,
                body: document.querySelector('[name="body"]').value
            })
        })
        .then( response => {
            console.log(response);
        })
        .catch( fetchError => {
            console.log(fetchError);
        });
    });
};


// Wait for DOM content
document.addEventListener('DOMContentLoaded',  () => {
   getFormSubmit( document.querySelector('form') );
});