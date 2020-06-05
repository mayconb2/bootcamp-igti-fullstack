const fs = require('fs').promises

const cidadesJson = './Cidades.json';
const estadosJson = './Estados.json';

async function start() {

    console.log('Aplicação Iniciada...');
    // createFile()
    // console.log(writeCities(100))

    // createFile();

    // sumCities('AC');

    // sumCitiesAllStates();

    writeCitisFile();

    


}


async function createFile() {

    try {

        let rowStates = await fs.readFile(estadosJson, 'utf-8');
        let states = await JSON.parse(rowStates);
        
        states.map(async state => {
    
            await fs.writeFile(`${state.Sigla}.json`, await writeCities(state.ID)) 
            
        });

    } catch (err) {
        console.error('Erro: ', err)
    }

}

async function writeCitisFile () {

    const modifyStatesstatesAndCities = [];

    const rowState = await fs.readFile(estadosJson, 'utf8');
    const states = JSON.parse(rowState);
    
    const rowCities = await fs.readFile(cidadesJson, 'utf8');
    const cities = await JSON.parse(rowCities);
    
    const modifyStates = states.map(state => {
        const {ID, Sigla, Nome} = state;
        return {
            idState : ID,
            Sigla: Sigla,
            stateName: Nome,
            cities : {}
        }
        
    });

    modifyStates.map(state => {
        modifyStatesstatesAndCities.push(state);
    });

    const modifyCities = cities.map(city => {
        const {ID, Nome, Estado} = city;
        return {
            idCity: ID,
            cityName: Nome,
            idState: Estado
        }
    });

    modifyCities.map(city => {
        
       if (city.idCity === '100') {
           const indexEstate = modifyStatesstatesAndCities.findIndex(state => {
                return state.idState === city.idState;
           });

           modifyStatesstatesAndCities[indexEstate].cities.push('a')
           console.log(modifyStatesstatesAndCities[indexEstate].cities)

        //    modifyStatesstatesAndCities[indexEstate].push(city)
       }

        // modifyStatesstatesAndCities[indexState].cities.push(city);


    });

    // console.log(modifyStatesstatesAndCities)
}


async function writeCities(idState) {

    try {

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

async function logSumCities(stateName) {
    
    const rowState = await fs.readFile(`${stateName}.json`, 'utf8');
    const state = JSON.parse(rowState);

    let sum = 0;

    state.map(city => {
        sum += 1;
    });
    console.log(`A soma das cidades do estado ${stateName} é ${sum}`);
    // return sum;
}

async function sumCities(stateName) {
    
    const rowState = await fs.readFile(`${stateName}.json`, 'utf8');
    const state = JSON.parse(rowState);

    let sum = 0;

    state.map(city => {
        sum += 1;
    });
    // console.log(`A soma das cidades do estado ${stateName} é ${sum}`);
    return sum;
}

// async function sumCitiesAllStates() {

//     const allStates = [];
//     const sumCitiesFromStates = [];

//     const rowAllStates = await fs.readFile(estadosJson, 'utf8');
//     const states = await JSON.parse(rowAllStates);

//     states.map(state => {
//         allStates.push(state.Sigla);
//     })

//     // console.log(allStates)
    
//      allStates.map(state => {
//       sumCitiesFromStates.push(await sumCities(state));
      
//     });
    
//     console.log(sumCitiesFromStates)
    

//     // console.log(allStates[0])

//     // let soma = await sumCities(allStates[0])

//     // console.log(soma)
// }


start();