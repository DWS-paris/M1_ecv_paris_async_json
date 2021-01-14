// Declaration
const apiUrl = 'http://localhost:3000';
let postList = document.createElement('ul');
let postArticle = document.createElement('article');

// Functions
const fecthData = url => {
    return new Promise( (resolve, reject) => {
        // Get content from API with Fetch API (https://developer.mozilla.org/fr/docs/Web/API/Fetch_API)
        fetch(`${apiUrl}/${url}`)
        .then( response => {
            // Display response
            console.log(response);

            // Check response
            return response.ok
            ? response.json()
            : reject('Fetch error', response);
        })
        .then( data => {
            // Display json data
            console.log(data);

            // Resolve Promise
            return resolve(data);
        })
        .catch( fetchError => {
            return reject(fetchError);
        });
    });
};

const displayPostList = data => {
    // Loop on collection
    for( let item of data ){
        // Add li tag in postList
        postList.innerHTML += `
            <li>
                <figure>
                    <img src="${item.image}" alt="${item.title}"/>
                    <figcaption data-id="${item.id}">${item.title}</figcaption>
                </figure>
            </li>
        `;  
    };

    // Add postList in main tag
    document.querySelector('main').appendChild(postList);

    // Call function to delete one post
    deleteSinglePost( document.querySelectorAll('figcaption') )
};

const deleteSinglePost = postLinks => {
    console.log(postLinks)

    // Loop on postLinks collection
    for( let item of postLinks ){
        // Bind click event
        item.addEventListener('click', event => {
            // Get data-id attribute value
            const postId = event.target.getAttribute('data-id')

            // Delete post
            fetch(`${apiUrl}/posts/${postId}`, { method: 'DELETE' })
            .then( response => { 
                if( response.ok ){
                    // Reset DOM content
                    document.querySelector(`main`).innerHTML = '';
                    postList.innerHTML = '';

                    // Use Promise function
                    fecthData('posts')
                    .then( data => displayPostList(data))
                    .catch( err => console.log(err))
                }
            })
            .catch( fetchError => console.log(fetchError) );
        })
    }
}

// Wait for DOM content
document.addEventListener('DOMContentLoaded',  () => {
    // Use Promise function
    fecthData('posts')
    .then( data => displayPostList(data) )
    .catch( err => console.log(err))
});