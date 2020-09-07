fetch('people.json')
	 response => {throw 3.14159} )
	.then( json => 
		json.forEach((person) => {
            const div = document.createElement("div");
            div.innerHTML = `${person.name} is ${person.age}`;
            document.body.appendChild(div);
        })
    )
    .catch(err => console.error(err));
    
fetch('people.json')
.then( response => response.json() )
.then( json => 
    json.forEach((person) => {
        const div = document.createElement("div");
        div.innerHTML = `${person.name} is ${person.age}`;
        document.body.appendChild(div);
    })
)
.catch(err => console.error(err));
    
const getData = async () => {
    const response = await fetch('people.json');
    const data = await response.json();
        
    data.forEach( person => {
        const div = document.createElement('div');
        div.innerHTML = person.name;
        document.body.appendChild(div);
    })
}

getData();

async function getPosts() {
    const postsPromise = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await postsPromise.json();
    let html = "";
    
    posts.slice(0, 5).forEach( post => {
        const title = post.title;
        const body = post.body;
        html += `
            <div class='post'>
                <h3>${title}</h3>
                <p>${body}</p>
            </div>
        `;
    });
    document.body.innerHTML = html;
    console.log(`${posts.length}`)
}

getPosts();

// error handling
// async function getPosts() {
//     const postsPromise = await fetch(
//         "https://jsonplaceholder.typicode.com/posts"
//     );
    
//     if(postsPromise.ok) {
//         const posts = await postsPromise.json();
//         let html = "";

//         posts.slice(0, 5).forEach((post) => { 
//             const title = post.title;
//             const body = post.body;
//             html += `
//             <div class='post'>
//                 <h3>${title}</h3>
//                 <p>${body}</p>
//             </div>
//             `;
//         });

//         document.body.innerHTML = html;
//     } else {
//         console.error(`Error: ${postsPromise.status}`)
//     }
// }

// getPosts();