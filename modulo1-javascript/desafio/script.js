const form = document.querySelector('#frm');
const inputText = document.querySelector('#input-text');
const searchButton = document.querySelector('#search-button');
const filteredPerson = document.querySelector('#filtered-person');
const personPummary = document.querySelector('#person-summary');
const searchResult = document.querySelector('#search-result');
const searchSummary = document.querySelector('#search-summary');
const summaryNumbers = document.querySelector('#summary-numbers');

let globalAllPerson = [];

window.addEventListener ('load' , () => {

    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    fetchFromAPI();
    inputText.focus();

});

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

searchButton.addEventListener('click', () => {

    let nameToSearch = inputText.value.toLowerCase();

    if (inputText.value == '' || inputText.value == null) {
        return;
    }
    //to do = DRY
    search(nameToSearch)

});

inputText.addEventListener('keyup', (event) => {
    let nameToSearch = inputText.value.toLowerCase();

    if (event.target.value == '') {
        searchButton.disabled = true;
    }

    if (event.target.value != '') {
        searchButton.disabled = false;
    }

    if (event.key == 'Enter' && event.target.value != '') {
        //to do = DRY
        search(nameToSearch);
    };
})

function search(textValue) {
    renderPerson(textValue);
    renderSummary(textValue);
}

function renderPerson(textValue) {

    let personHTML = '';

    let filteredFromAll = filterArray(textValue).sort((a,b) => {
        return a.name.localeCompare(b.name);
    });

    //render filtered array in html
    filteredFromAll.map(person => {
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

function renderSummary(textValue) {

    let filteredFromAll = filterArray(textValue);

    const sumMale = filteredFromAll.reduce((acc,cur) => {
        if (cur.gender == 'male') {
            acc += 1;
        }
        return acc;
    },0);

    const sumFemale = filteredFromAll.reduce((acc,cur) => {
        if (cur.gender == 'female') {
            acc += 1;
        }
        return acc;
    },0);

    const sumAges = filteredFromAll.reduce((acc,cur) => {
        return acc + cur.age;
    },0);

    let averageAges = (sumAges / filteredFromAll.length).toFixed(2)
    
    if(averageAges == 'NaN') {
        averageAges = 0;
    }
    
    // (sumAges / filteredFromAll.length).toFixed(2) === NaN ? 0 : (sumAges / filteredFromAll.length).toFixed(2);
    console.log(averageAges)
    const totalPerson = sumMale + sumMale;

    summaryNumbers.innerHTML = `

        <div>
            Gender Male: <b>${sumMale}</b>
        <div>

        <div>
            Gender Female: <b>${sumFemale}</b>
        <div>

        <div>
            Sum Ages: <b>${sumAges}</b>
        <div>

        <div>
            Average Ages: <b>${averageAges}</b>
        <div>

    `;

    searchSummary.innerHTML = `Summary: `
    searchResult.innerHTML = `${totalPerson} people found: `


}

function filterArray(text) {
    let filteredFromAll = globalAllPerson.filter(people => {
        return people.name
            .toLowerCase()
            .includes(text)
    });

    return filteredFromAll;
}

function clearResults() {
    filteredPerson.innerHTML = '';
    summaryNumbers.innerHTML = '';
    searchResult.innerHTML = 'No Results';
    searchSummary.innerHTML = 'No Summary';
    inputText.value = '';
    searchButton.disabled = true;
    inputText.focus();
}