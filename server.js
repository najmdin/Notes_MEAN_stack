const express = require('express');
const session = require('express-session')
const app = express();//
var cors = require('cors');
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Note = require('./models/note');
const User = require('./models/user');
mongoose.connect('mongodb+srv://root:root@cluster0.0bqu9.mongodb.net/NOTEAPP?retryWrites=true&w=majority')
    .then(()=>{
        console.log('Successfully connected to DB!');
    })
    .catch((error)=>{
        console.log('Unable to connect to DB!');
        console.error(error);
    });

app.use(cors({credentials: true, origin:'http://localhost:4200'}));
app.use((req, res,next) => { 
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.set('Access-Control-Allow-Credentials', true);
    next();
    });

let notes = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// GET /notes
app.get('/notes', (request, response) => {
    if(!request.session.userId) return response.status(200).json([ ]);
    Note.find({}).sort({_id:-1}).exec((error, notes)=>{
        if(error) return console.error(err);
        response.status(200).json(notes);
    });
});

// GET /notes/:id
app.get('/notes/:id', (request, response) => {

      Note.findOne({_id: request.params.id},(error, note) =>{
          if (error){
              return response.status(404).json({error: error});
          }
          response.status(200).json(note);
      });

});

// POST /notes/:id
app.post('/notes', (request, response) => {
    let requestNote = request.body;

    let newNote = new Note({
        noteTitle: requestNote.noteTitle,
        noteText: requestNote.noteText,
        noteColor: requestNote.noteText
    });

    newNote.save((error, note)=>{
        if(error)return console.error(err);
        console.log(note);
        response.json(note);
    })
})
        
// PUT /notes/:id
app.put('/notes/:id', (request, response) => {
let requestNote = request.body;

let newNote = new Note({
    _id: request.params.id,
    noteTitle: requestNote.noteTitle,
    noteText: requestNote.noteText,
    noteColor: requestNote.noteText
});
Note.updateOne({_id:request.params.id}, newNote, (error, note)=>{
    if(error) return response.status(400).json({error:error});
    response.status(201).json(note);
});
}
    );

// DELEET /notes/:id
app.delete('/notes/:id', (request, response) => {
   Note.deleteOne({_id:request.params.id}, (error)=>{
       if(error) return response.status(400).json({error:error});
       response.status(201).json({msg:"ok"});
   });
});
app.listen(3000, ()=>{console.log("listening on port 3000")});
app.use(session({secret:"ma3rfch",resave: true, saveUninitialized: true,cookie:{maxAge: 24 * 60 * 60 * 1000}}));


app.post('/login', (request, response) => {
    User.findOne({login: request.body.login, password: request.body.password},(error,user)=>{
        if(error) return response.status(401).json({msg: "Error"});
        if(!user) return response.status(401).json({msg: "Wrong login"});
        request.session.userId = user._id;
        response.status(200).json({login:user.login, fullName: user.fullName});
    }

  );
});

app.post('/register', (request, response) => {

    let newUser = new User({
        login: request.body.login,
        password: request.body.password,
        fullName: request.body.fullName,
    });
User.countDocuments({login: newUser.login}, function (err, count){
    if(err) return response.status(401).json({msg:"Error"});
    if(count>0){
      return response.status(409).json({msg:"This login already exists"});
    }
    else{
        newUser.save((error, user)=>{
            if(error) return console.error(err);
            request.session.userId = user._id;
            response.status(200).json({loin: user.login, fullName : user.fullName});
        })
    }
})
    
})

app.post('/logout', (request, response) =>  {
     request.session.destroy(error=>{
         if(error) return response.status(409).json({msg:"error"});
         response.status(200).json({msg:"Logout OK"});
     })

     })

app.get('/islogged', (request, response) => {
    if(!request.session.userId) return response.status(401).json();

        User.findOne({_id: request.body.userId},(error,user)=>{
            if(error) return response.status(401).json({msg: "Error"});
            if(!user) return response.status(401).json({msg: "Wrong login"});
            request.session.userId = user._id;
            response.status(200).json({login:user.login, fullName: user.fullName});
        });
    });