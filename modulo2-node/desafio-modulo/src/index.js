const express = require('express');
const router = express.Router();
const fs = require('fs').promises;


const app = express();
app.use(express.json());

const gradesJson = '../grades/grades.json'

app.get('/', (req,res) => {
    res.send('Starting Chalange 2!')
})

app.get('/all', async (req,res) => {
    const rowGrades = await fs.readFile(gradesJson,'utf8');

    const grades = JSON.parse(rowGrades)
    delete grades.nextId;

    res.send(grades)
});

app.get('/grades/:id', async (req,res) => {
    const gradeId = req.params.id;

    const rowGrades = await fs.readFile(gradesJson,'utf8');

    const grades = JSON.parse(rowGrades);

    const filteredGrade = grades.grades.filter(grade => {
        return grade.id == gradeId;
    })

    res.send(filteredGrade)

});

app.listen(3100, () => {
    console.log('Grandes on port 3100')
})