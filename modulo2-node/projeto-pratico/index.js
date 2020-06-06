const fs = require('fs').promises

const cidadesJson = './Cidades.json';
const estadosJson = './Estados.json';

async function start() {

    console.log('Aplicação Iniciada...');
    // createFiles()
    // writeCities('1')

    // createFile();

    // sumCities('AC');

    statesMoreCities();    


}


async function createFiles() {

    try {

        let rowStates = await fs.readFile(estadosJson, 'utf-8');
        let states = await JSON.parse(rowStates);
        
        states.map(async state => {
    
            await fs.writeFile(`${state.Sigla}.json`, await writeCities(state.ID, state.Sigla)) 
            
        });

    } catch (err) {
        console.error('Erro: ', err)
    }

}


async function writeCities(idState,abrevState) {

    try {

        let numCities = 0
        const filteredCity = [];
        const rowCities = await fs.readFile(cidadesJson, 'utf8');
    
        const cities = await JSON.parse(rowCities);
    
        cities.filter(city => {
            if (city.Estado === idState) {
                filteredCity.push(city)
            }
            
        });

        filteredCity.forEach(city =>{
            numCities++
        });

        filteredCity.push(JSON.parse(`{"${abrevState}" : ${numCities}}`));
  
        const filteredCityJson = JSON.stringify(filteredCity);
        return filteredCityJson;

    } catch (err) {
        console.error('Erro: ', err)
    }


}

async function sumCities(stateName) {
    const rowState = await fs.readFile(`${stateName}.json`, 'utf8');
    const state = await JSON.parse(rowState);
    console.log(state[state.length-1])
}

async function abrevStates() {
    const abrevStates = [];

    const rowState = await fs.readFile(estadosJson, 'utf8');
    const states = await JSON.parse(rowState);

    const newStates = states.map(state => {
        const {Sigla} = state;
        return {
            Sigla
        }

    })

    newStates.map(sigla => {
        abrevStates.push(sigla.Sigla)
    })
    
    const abrevStatesJson = JSON.stringify(abrevStates)

    return abrevStatesJson;
}

async function statesMoreCities() {

    const allStates = await abrevStates();
    const allStatesJson = JSON.parse(allStates)
    const stateCities = [];

    allStatesJson.map(async state => {
        const cities = await fs.readFile(`${state}.json`,'utf8');
        const citiesJson = await JSON.parse(cities);

        
        stateCities.push(citiesJson[citiesJson.length-1])
    });

    setTimeout(() => stateCities.sort((a,b) => b-a),300)

    setTimeout(() => console.log(stateCities), 1000)
}

start();