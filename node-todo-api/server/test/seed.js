const {ObjectID} = require('mongodb');
const {Todo}=require('./../models/todo');
const {User}=require('./../models/user');
const jwt=require('jsonwebtoken');

const userOneID=new ObjectID();
const userTwoId=new ObjectID();

const users=[{

    _id:userOneID,
    email:'amit@example.com',
    password:"mypassqw",
    tokens:[{

         access:'auth',
         token:jwt.sign({_id:userOneID,access:'auth'},'abc123').toString()

        }]

},{
    _id:userTwoId,
    email:'suresh@gmail.com',
    password:'madhavram'
}];


const todos=[{
    _id:new ObjectID(),
    text:"Fist to do"

},{
    _id:new ObjectID(),
    text:'second text todo',
    completed:true,
    completedAt:333
}];

const populateTodos=(done)=>{

    Todo.remove({}).then(()=>{

        return  Todo.insertMany(todos);

    }).then(()=>done());
};

const populateUsers=(done)=>{

    User.remove({}).then(()=>{

        var userOne=new User(users[0]).save();
        var userTwo=new User(users[1]).save();

        return Promise.all([userOne,userTwo]).then(()=>done());

    });
};

module.exports={todos,populateTodos,users,populateUsers};