const express = require('express');
const router = express.Router();
const fs = require('fs').promises;

const gradesJson = './grades/grades.json';

async function readGrades() {
    return await fs.readFile(gradesJson,'utf8');  
} 

router.get('/', (req,res) => {
    res.send('Starting Chalange 2!')
})

router.get('/all', async (req,res) => {
    const rowGrades = await fs.readFile(gradesJson,'utf8');

    const grades = JSON.parse(rowGrades)
    delete grades.nextId;

    res.send(grades)
});

router.get('/:id', async (req,res) => {
    const gradeId = req.params.id;

    const rowGrades = await readGrades();

    const grades = JSON.parse(rowGrades);

    const filteredGrade = grades.grades.filter(grade => {
        return grade.id == gradeId;
    })

    res.send(filteredGrade)

});

router.get('/studant-subject/:student/:subject',  async (req,res) => {
    const student = req.params.student;
    const subject = req.params.subject;

    const rowGrades = await readGrades();
    const grades = JSON.parse(rowGrades);

    const filteredGradesbyStudent = grades.grades.filter(grade => {
        return grade.student == student;
    })

    const filteredGradesbySubject = filteredGradesbyStudent.filter(grade => {
        return grade.subject == subject;
    })
    
    
    const valuesSubject = filteredGradesbySubject.reduce((acc,cur) => {
        return acc + cur.value;
    },0);

    const result = JSON.stringify(valuesSubject)
    
    res.send({student: student, subject: subject, totalValue: result});
});

router.get('/average/:subject/:type', async (req,res) => {
    const gradesSubject = req.params.subject;
    const gradeType = req.params.type;

    const rowGrades = await readGrades();
    const grades = JSON.parse(rowGrades);

    const filteredBySubject = grades.grades.filter(grade => {
        return grade.subject == gradesSubject;
    });

    const filteredByType = filteredBySubject.filter(grade => {
        return grade.type == gradeType;
    });

    const size = filteredByType.length;

    const totalValues = filteredByType.reduce((acc,cur) => {
        return acc + cur.value
    },0);

    const averageValues = totalValues/size;

    res.send({subject: gradesSubject, type: gradeType, average: averageValues});
});

router.get('/best-3/:subject/:type', async (req,res) => {
    const gradesSubject = req.params.subject;
    const gradeType = req.params.type;

    const rowGrades = await readGrades();
    const grades = JSON.parse(rowGrades);

    const filteredBySubject = grades.grades.filter(grade => {
        return grade.subject == gradesSubject;
    });

    const filteredByType = filteredBySubject.filter(grade => {
        return grade.type == gradeType;
    });

    const sortered = filteredByType.sort((a,b) => {
        return b.value - a.value;
    });

    const best3 = sortered.slice(0,3);

    res.send(best3)
});

router.post('/', async (req,res) => {
    const gradeFromReq = req.body;

    const rowGrades = await readGrades();
    const grades = JSON.parse(rowGrades);

    const newGrade = {id: grades.nextId, ...gradeFromReq, timestamp: new Date()};

    const nextId = grades.nextId += 1

    grades.grades.push(newGrade)

    await fs.writeFile(gradesJson, JSON.stringify(grades));

    res.status(201).send(newGrade);
});

router.put('/:id', async (req,res) => {
    const gradeId = req.params.id;
    const gradeFromReq = req.body;

    const rowGrades = await readGrades();
    const grades = JSON.parse(rowGrades);

    const indexGrade = grades.grades.findIndex(grade => grade.id == gradeId);

    if (indexGrade < 0) {
        res.status(400).send('Grade not found!');
        return;
    }

    grades.grades[indexGrade] = {id: grades.grades[indexGrade].id, ...gradeFromReq, timestamp: new Date()}

    await fs.writeFile(gradesJson, JSON.stringify(grades));

    res.status(204).send(grades.grades[indexGrade])

});

router.delete('/:id', async (req,res) => {
    const gradeId = req.params.id;

    const rowGrades = await readGrades();
    const grades = JSON.parse(rowGrades);

    const indexGradeToDelete = grades.grades.findIndex(grade => grade.id == gradeId);

    if (indexGradeToDelete < 0) {
        res.status(400).send('Grade not found!');
        return;
    }

    grades.grades.splice(indexGradeToDelete,1);

    res.status(202).send(grades)
});

module.exports = router;