const fs = require('fs').promises

const cidadesJson = './Cidades.json';
const estadosJson = './Estados.json';

async function start() {

    console.log('Aplicação Iniciada...');
    // createFiles()
    // writeCities('1')

    // createFiles();

    // sumCities('AC');

    // statesLessCities()
    // statesMoreCities();    

    // qtyCitiesFromState('AC');

    // cityBiggerName('AC')

    // cityShorterName('AC');
    allStatesShorterCityName();

}

async function qtyCitiesFromState(abrevState) {
    const citiesFile = JSON.parse(await fs.readFile(`./${abrevState}.json`, "utf-8"));
    //debug
    return citiesFile.length;
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

        // let numCities = 0
        const filteredCity = [];
        const rowCities = await fs.readFile(cidadesJson, 'utf8');
    
        const cities = await JSON.parse(rowCities);
    
        cities.filter(city => {
            if (city.Estado === idState) {
                filteredCity.push(city)
            }
            
        });
  
        const filteredCityJson = JSON.stringify(filteredCity);
        return filteredCityJson;

    } catch (err) {
        console.error('Erro: ', err)
    }

}

async function abrevStates() {
    const abrevStates = [];

    const rowState = await fs.readFile(estadosJson, 'utf8');
    const states = JSON.parse(rowState);

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

async function statesLessCities() {

    const allStates = await abrevStates();
    const allStatesJson = JSON.parse(allStates)
    const stateCities = [];

    

    const pushCities = await allStatesJson.map(async state => {
        const qtyCities = await qtyCitiesFromState(state);
        stateCities.push({state, qtyCities});
        stateCities.sort((a,b) => {
            return a.qtyCities - b.qtyCities
        });
    });

    return Promise.all(pushCities).then(() => {
        console.log(`Os estados com as menores cidades são: 
        ${stateCities[0].state} - ${stateCities[0].qtyCities} | ${stateCities[1].state} - ${stateCities[1].qtyCities} | ${stateCities[2].state} - ${stateCities[2].qtyCities} | ${stateCities[3].state} - ${stateCities[3].qtyCities} | ${stateCities[4].state} - ${stateCities[4].qtyCities}`);
    })
}

async function statesMoreCities() {

    const allStates = await abrevStates();
    const allStatesJson = JSON.parse(allStates)
    const stateCities = [];

    

    const pushCities = await allStatesJson.map(async state => {
        const qtyCities = await qtyCitiesFromState(state);
        stateCities.push({state, qtyCities});
        stateCities.sort((a,b) => {
            return b.qtyCities - a.qtyCities
        });
    });

    return Promise.all(pushCities).then(() => {
        console.log(`Os estados com as maiores cidades são: 
        ${stateCities[0].state} - ${stateCities[0].qtyCities} | ${stateCities[1].state} - ${stateCities[1].qtyCities} | ${stateCities[2].state} - ${stateCities[2].qtyCities} | ${stateCities[3].state} - ${stateCities[3].qtyCities} | ${stateCities[4].state} - ${stateCities[4].qtyCities}`);
    })
}

async function cityBiggerName(state) {
    const citiesNames = [];

    const rowCitiesState = await fs.readFile(`./${state}.json`, 'utf8');
    const citiesState = JSON.parse(rowCitiesState)
    
    citiesState.map(city => {
        citiesNames.push(city.Nome)
    });
    
    citiesNames.sort((a,b) => {
        let al = a.toLowerCase();
        let bl = b.toLowerCase();

        return bl.length - al.length || al.localeCompare(bl)
    });

    console.log(citiesNames)

}

async function cityShorterName(state) {
    const citiesNames = [];

    const rowCitiesState = await fs.readFile(`./${state}.json`, 'utf8');
    const citiesState = JSON.parse(rowCitiesState)
    
    citiesState.map(city => {
        citiesNames.push(city.Nome)
    });
    
    citiesNames.sort((a,b) => {
        let al = a.toLowerCase();
        let bl = b.toLowerCase();

        return al.length - bl.length || al.localeCompare(bl)
    });

    console.log(citiesNames)

}

async function allStatesShorterCityName() {
    const allStates = await abrevStates();
    const allStatesJson = JSON.parse(allStates)
    const stateCities = [];

    const pushCityShorterName = await allStatesJson.map(async state => {
        const shortNameCity = await cityShorterName(state);
        stateCities.push({state, shortNameCity});
    })

    return Promisse.all(pushCityShorterName).then(() => {
        stateCities
    });

}


start();