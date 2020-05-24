const inputForm = document.querySelector('#frm');
const inputText = document.querySelector('#input-text');
const searchButton = document.querySelector('#search-button');

let globalAllPerson = [];


window.addEventListener ('load' , () => {
    
    inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    fetchFromAPI();
        
});

function search() {
    console.log(globalAllPerson);
}

inputText.addEventListener('keyup', (event) => {

    if (event.target.value == '') {
        searchButton.disabled = true;
    }

    if (event.target.value != '') {
        searchButton.disabled = false;
    }

    if (event.key == 'Enter' && event.target.value != '') {
        // search();
        // console.log(event)
        console.log(event);
    };
    
})

async function fetchFromAPI() {

    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();

    globalAllPerson = json.results.map(people => {

        const {name, gender, dob ,picture } = people;

        return {
            name: name.first + ' ' + name.last,
            gender: gender,
            age: dob.age,
            picture: picture.thumbnail
        };

    });
}