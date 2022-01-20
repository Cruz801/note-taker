const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000
const { v4: uuidv4 } = require('uuid');

app.use(express.static('public'))
app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.get('/api/notes',(req, res) => {
    fs.readFile(path.join(__dirname,'db/db.json'), (err, data) => {
        if(err) throw err
        res.send(data)
    }) 
}) 

app.post('/api/notes', (req, res) =>{
 //   console.log(req.body)
    const newNote = req.body
    newNote.id = uuidv4()
    // read json file 
    fs.readFile(path.join(__dirname,'db/db.json'), 'utf8', (err, data) => {
        if(err) throw err
        // add new note to datas
        const notesArray = JSON.parse(data)
        console.log(notesArray)
        notesArray.push(newNote)
        fs.writeFile('db/db.json', JSON.stringify(notesArray), (err) =>{
            if(err) throw err
            console.log('File created')
            res.send(newNote)
        })
    }) 
    
    //write json file with updated data
    // send response back with new note 
    
})

















app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


