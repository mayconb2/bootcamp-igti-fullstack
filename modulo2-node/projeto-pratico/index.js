const fs = require('fs').promises

const cidadesJson = './Cidades.json';
const estadosJson = './Estados.json';

async function start() {

    console.log('Aplicação Iniciada...');
    // createFile()
    // console.log(writeCities(100))

    // createFile();

    sumCities('AC');

    


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

async function sumCities(stateName) {
    
    const rowState = await fs.readFile(`${stateName}.json`, 'utf8');
    const state = JSON.parse(rowState);

    let sum = 0;

    state.map(city => {
        sum += 1;
    });

    console.log(`A soma das cidades do estado ${stateName} é ${sum}`);
}



start();