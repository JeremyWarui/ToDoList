const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
const cors = require('cors');
require('dotenv').config()
const port = 8000;
app.use(cors())
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json({ limit: '1mb' }));
app.listen(port,()=>{
 console.log(`i am listening at ${(port)}`)
})

const dburi = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.xhbj8.mongodb.net/testdb?retryWrites=true&w=majority`
 
mongoose.connect(dburi)
.then((result)=> console.log('connected to db') )
.catch((err)=>console.log(err))

const Schema = mongoose.Schema;
const notesSchema = new Schema({
    notes: {
        type: String,
        required: true
    },
   
},{timestamps:true});

const Note = mongoose.model('Note',notesSchema);

 
app.get('/getAll',(request,response)=>{
    Note.find()
    .then((result)=>{response.send(result)
    }).catch((err)=> console.log(err))    
})

app.post('/send',(request,response)=>{
    console.log("i got a post")
  const item = request.body.newItem;
  console.log(item )
    const note = new Note ({
        notes: item 
    })
    note.save()
    .then((result)=>{response.end()
    }).catch((err)=> console.log(err))  

    response.writeHead(301, {"Location": "/"});
    return response.end();

});


