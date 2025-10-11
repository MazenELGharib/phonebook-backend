const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
let morgan = require('morgan');
dotenv.config();
const app = express();

app.use(express.static("dist"))
app.use(express.json());

// Enable CORS for all origins (for development purposes)
// app.use(cors({
//     origin: (origin,callback)=>{
//         if(!origin || origin === process.env.CLIENT_URL){
//            return callback(null,true);
//         }
//         return callback(new Error("Not allowed by CORS"))

//     }
// }))


morgan.token('body', (req,res) => req.body? JSON.stringify(req.body) :'')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons",(req,res)=>{
    console.log("Returning all persons in phonebook");
    return res.json(persons);
})

app.get("/info",(req,res)=>{
    const time = new Date(Date.now());
    return res.send(`Phonebook has info for ${persons.length} people <br> ${time}`);

})

app.get("/api/persons/:id",(req,res)=>{
    const {id} = req.params
    const person = persons.find(p=> p.id === id)
    if (!person){
        return res.status(404).send({error: "Person not found"})
    }
    return res.send(person)
})

app.delete("/api/persons/:id",(req,res)=>{
    const {id}= req.params
    const person = persons.find(p => p.id === id)
    if(!person){
        return res.status(404).send({error: "Person already deleted"})
    }
    persons = persons.filter(p => p.id !== id)
    return res.status(200).send("Deleted successfully")
})

app.post("/api/persons",(req,res)=>{
    const{name,number} = req.body;
    if(!name || !number){
        return res.status(400).send({error: "Name or number is missing"})
    }
    const existingPerson = persons.find(p=> p.name === name)
    if(existingPerson){
       return res.status(400).send({error: "Name must be unique"})
    }
    const newPerson ={
        id: Math.floor(Math.random()*10000000).toString(),
        name,
        number
    }
    persons = [...persons, newPerson]
    return res.status(201).send(newPerson)
})

app.put("/api/persons/:id",(req,res)=>{
    console.log(`req body : ${JSON.stringify(req.body)}
    params : ${JSON.stringify(req.params)}`);
    const{id} = req.params;
    const{number} = req.body || {};
    const person = persons.find(p => p.id === id)
    if (!person){
        return res.status(404).send("Person not found")
    }
    person.number = number ?? person.number;

    return res.send(person)
})

app.use((req,res)=>{
    return res.sendFile(path.resolve(__dirname ,"dist","index.html"))
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})