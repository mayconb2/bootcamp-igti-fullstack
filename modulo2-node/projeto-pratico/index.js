const fs = require('fs').promises

const cidadesJson = './Cidades.json';
const estadosJson = './Estados.json';
const statesJson = './states_json'

async function start() {

    console.log('Aplicação Iniciada...');
    
    // método que cria JSON pra cada estado com as cidades dentro    
    // createFiles()

    // método que recebe como parâmetro o UF do estado e retorna quantidade de cidades
    logQtyCitiesFromState('AC');

    // método que imprima no console um array com o UF dos cinco estados que mais possuem cidades
    // statesMoreCities();    
    
    // método que imprima no console um array com o UF dos cinco estados que menos possuem cidades    
    // statesLessCities();
    
    // método que imprima no console um array com a cidade de maior nome de cada estado
    // allStatesBiggerCityName();
    
    //método que imprima no console um array com a cidade de menor nome de cada estado
    // allStatesShorterCityName();

    // método que imprima no console a cidade de maior nome entre todos os estados
    // biggerNameCity()    
    
    // método que imprima no console a cidade de menor nome entre todos os estados
    // shortNameCity()

}

async function logQtyCitiesFromState(abrevState) {

    try {

        const citiesFile = JSON.parse(await fs.readFile(`./${statesJson}/${abrevState}.json`, "utf-8"));
        
        return Promise.all(citiesFile).then(() =>{
            console.log(citiesFile.length)
        }).catch((err) => {
            console.error(err)
        })

    } catch (err) {
        console.error(err)
    }
    
}

async function qtyCitiesFromState(abrevState) {
    try {

        const citiesFile = JSON.parse(await fs.readFile(`./${statesJson}/${abrevState}.json`, "utf-8"));
        return citiesFile.length;

    } catch (err) {
        console.error(err)
    }
}

async function createFiles() {

    try {

        let rowStates = await fs.readFile(estadosJson, 'utf-8');
        let states = await JSON.parse(rowStates);
        
        states.map(async state => {
    
            await fs.writeFile(`./${statesJson}/${state.Sigla}.json`, await writeCities(state.ID, state.Sigla)) 
            
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

    try {

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
    } catch (err) {
        console.error('Erro: ', err)
    }
}

async function statesLessCities() {

    try {

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

    } catch (err) {
        console.error('Erro: ', err)
    }

}

async function statesMoreCities() {

    try {

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

    } catch (err) {
        console.error('Erro: ', err)
    }
}

async function cityBiggerName(state) {
    
    try {

        const citiesNames = [];
    
        const rowCitiesState = await fs.readFile(`./${statesJson}/${state}.json`, 'utf8');
        const citiesState = JSON.parse(rowCitiesState)
        
        citiesState.map(city => {
            citiesNames.push(city.Nome)
        });
        
        citiesNames.sort((a,b) => {
            let al = a.toLowerCase();
            let bl = b.toLowerCase();
    
            return bl.length - al.length || al.localeCompare(bl)
        });
    
        return citiesNames[0];

    } catch (err) {
        console.error('Erro: ', err)
    }

}

async function cityShorterName(state) {

    try {

        const citiesNames = [];
    
        const rowCitiesState = await fs.readFile(`./${statesJson}/${state}.json`, 'utf8');
        const citiesState = JSON.parse(rowCitiesState)
        
        citiesState.map(city => {
            citiesNames.push(city.Nome)
        });
        
        citiesNames.sort((a,b) => {
            let al = a.toLowerCase();
            let bl = b.toLowerCase();
    
            return al.length - bl.length || al.localeCompare(bl)
        });
    
        return citiesNames[0];

    } catch (err) {
        console.error('Erro: ', err)
    }
}

async function allStatesShorterCityName() {
    
    try {

        const allStates = await abrevStates();
        const allStatesJson = JSON.parse(allStates)
        const stateCities = [];
    
        const pushCityShorterName = await allStatesJson.map(async state => {
            const shortNameCity = await cityShorterName(state);
            stateCities.push({state, shortNameCity});
        })
    
        return Promise.all(pushCityShorterName).then(() => {
            console.log(stateCities)
        });

    } catch (err) {
        console.error('Erro: ', err)
    }

}

async function allStatesBiggerCityName() {

    try {
        const allStates = await abrevStates();
        const allStatesJson = JSON.parse(allStates)
        const stateCities = [];
    
        const pushCityBiggerName = await allStatesJson.map(async state => {
            const biggerCityName = await cityBiggerName(state);
            stateCities.push({state, biggerCityName});
        })
    
        return Promise.all(pushCityBiggerName).then(() => {
            console.log(stateCities)
        });

    } catch (err) {
        console.error('Erro: ', err)
    }

}


async function biggerNameCity() {

    try {

        const allStates = await abrevStates();
        const allStatesJson = JSON.parse(allStates)
        const stateCities = [];
    
        const pushCityBiggerName = await allStatesJson.map(async state => {
            const biggerCityName = await cityBiggerName(state);
            stateCities.push({state, biggerCityName});
            
            stateCities.sort((a,b) => {
                let al = a.biggerCityName.toLowerCase();
                let bl = b.biggerCityName.toLowerCase();
                return bl.length - al.length 
            });
        });
    
    
        return Promise.all(pushCityBiggerName,stateCities).then(() => {
            console.log(stateCities)
        });

    } catch (err) {
        console.error('Erro: ', err)
    }

}

async function shortNameCity() {

    try {

        const allStates = await abrevStates();
        const allStatesJson = JSON.parse(allStates)
        const stateCities = [];
    
        const pushCityShorterName = await allStatesJson.map(async state => {
            const shortNameCity = await cityShorterName(state);
            stateCities.push({state, shortNameCity});
            stateCities.sort((a,b) => {
                let al = a.shortNameCity.toLowerCase();
                let bl = b.shortNameCity.toLowerCase();
                return al.length - bl.length 
            });
        })
    
        return Promise.all(pushCityShorterName).then(() => {
            console.log(stateCities)
        });

    } catch (err) {
        console.error('Erro: ', err)
    }
}

start();