const form = document.querySelector('#frm');
const inputText = document.querySelector('#input-text');
const searchButton = document.querySelector('#search-button');
let filteredPerson = document.querySelector('#filtered-person');

let globalAllPerson = [];

window.addEventListener ('load' , () => {

    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    fetchFromAPI();
});

function search(textValue) {
    
    renderPerson(textValue);
}

inputText.addEventListener('keyup', (event) => {

    if (event.target.value == '') {
        searchButton.disabled = true;
    }

    if (event.target.value != '') {
        searchButton.disabled = false;
    }

    if (event.key == 'Enter' && event.target.value != '') {
        search();
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

function renderPerson(textValue) {
    let personHTML = '';
    
    globalAllPerson.map(person => {
        const {name, gender, age, picture} = person;
        
        let peopleHTML = `
            <div class="people">

                <div class="people-picture">
                    <img src="${person.picture}">
                </div>

                <div class="people-info">
                    ${person.name}, ${person.gender}, ${person.age } years old
                </div>

            </div>
        `;

        personHTML += peopleHTML;

    });

    filteredPerson.innerHTML = personHTML;
}

function renderSummary() {

}

function clearResults() {
    filteredPerson.innerHTML = '';
    inputText.value = '';
    inputText.focus();
}