const Joi = require('joi');             // return class

const express = require('express');     // return a function
const { response } = require('express');
const bodyParser = require('body-parser');

const app = express();                  // return an object
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.json());
///////////////////////////
//Courses Code///// Sorry for no Modularity //
const courses = [
    { id: 1, name: 'course1',code: 'cse432',description: '' },
    { id: 2, name: 'course2',code: 'cse981',description: ''},
    { id: 3, name: 'course3',code: 'cse404' ,description: 'Nice Course'}
];

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('The course with the given id was not found.');
        return;
    }
    res.send(course);
});

app.post('/api/courses',urlencodedParser , (req, res) => {
    // validate request
   
    const result = validateCourse(req.body);


 
    console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name, // assuming that request body there's a name property
        code: req.body.code,
        description : req.body.description

    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }
    const { error } = validateCourse(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update the course 
    // Return the updated course
    course.name = req.body.name;
    course.code = req.body.code;
    course.description = req.body.description;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});

app.get('/web/courses/create', (req, res) => {
    res.sendFile(__dirname + '/courses/index.html')
})

function validateCourse(course) {
    const schema = Joi.object({
        name : Joi.string().min(5).required(),
        code : Joi.string().pattern(new RegExp('^[a-zA-Z]{3}[0-9]{3}$')).required(),
        description : Joi.string().max(200).allow('')
    });

    return schema.validate(course);
}

///////////
//Students Code


const Students = [
    { id: 1, name: 'Ahmed',code: '1600A41' },
    { id: 2, name: 'Mohamed',code: '1012010'},
    { id: 3, name: 'Amr',code: '160xx0a1'}
];
app.get('/api/students', (req, res) => {
    res.send(Students);
});

app.get('/api/students/:id', (req, res) => {
    const student = Students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('The student with the given id was not found.');
        return;
    }
    res.send(student);
});
app.get('/web/students/create', (req, res) => {
    res.sendFile(__dirname + '/students/index.html')
})

app.post('/api/students',urlencodedParser, (req, res) => {
    // validate request
   
    const result = validateStudent(req.body);

    console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const student = {
        id: Students.length + 1,
        name: req.body.name, // assuming that request body there's a name property
        code: req.body.code

    };
    Students.push(student);
    res.send(student);
});

app.put('/api/students/:id', (req, res) => {

    const student = Students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return;
    }
    const { error } = validateStudent(req.body); // result.error
    if (error) {

        res.status(400).send(error.details[0].message);
        return;
    }

    // Update the student 
    // Return the updated student
    student.name = req.body.name;
    student.code = req.body.code;
    student.description = req.body.description;
    res.send(student);
});

app.delete('/api/students/:id', (req, res) => {
    // Look up the student 
    // If not existing, return 404
    const student = Students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return;
    }

    // Delete
    const index = Students.indexOf(student);
    Students.splice(index, 1);

    // Return the same student
    res.send(student);
});

function validateStudent(student) {
    const schema = Joi.object({
        name : Joi.string().pattern(new RegExp('^[a-zA-Z\'\-]*$')).required(),
        code : Joi.string().min(7).max(7).required()
    });

    return schema.validate(student);
}




const port = process.env.PORT || 3000

app.listen(port /*PortNumber*/, () => console.log(`Listeneing on port ${port}......`) /* optionally a function that called when the app starts listening to the given port */);

