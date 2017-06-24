/**
 * Created by noargs on 22/06/17.
 */

const expect=require('expect');
const request =require('supertest');
const {app}=require('./server');
const {Todo}=require('./models/todo');
const {ObjectID} = require('mongodb');

const todos=[{
    _id:new ObjectID(),
    text:"Fist to do"

},{
    _id:new ObjectID(),
    text:'second text todo',
    completed:true,
    completedAt:333
}]

beforeEach((done)=>{

    Todo.remove({}).then(()=>{

       return  Todo.insertMany(todos);

    }).then(()=>done());
});

describe('POST /todos',()=>{

   it('Should create a new todo',(done)=>{

       var text="Test todo text";
       request(app)
           .post('/todos')
           .send({text})
           .expect(200)
           .expect((res)=>{
             expect(res.body.text).toBe(text);
           })
           .end((err,res)=>{
               if(err){
                   return done(err);
               }
                Todo.find({text}).then((todos)=>{

                   expect(todos.length).toBe(1);
                   expect(todos[0].text).toBe(text);
                   done();

                }).catch((e)=>{
                   done(e);
                });
           });

   }) ;



    it('Should save only valid data',(done)=>{


        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.find().then((todos)=>{

                    expect(todos.length).toBe(2);
                    done();

                }).catch((e)=>{
                    done(e);
                });
            });

    }) ;

});

describe('Get /todos',()=>{

   it('should get all todos',(done)=>{
       request(app).get('/todos').expect(200)
           .expect((res)=>{
                    expect(res.body.todos.length).toBe(2);
           }).end(done);

   });
});



describe('Get /todos',()=>{

    it('Should take only valid object',(done)=>{

        request(app).get('/todos/123')
                    .expect(404)
                    .end(done);

    });

    it('Should take empty object if there is nothing with this id',(done)=>{

        request(app).get('/todos/594cbc976abf5a06055e3238')
                    .expect(404)
                    .end(done);

    });


    it('Should take valid object with  id',(done)=>{

        request(app).get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect(res=>{
                 expect(res.body.todo.text).toBe(todos[0].text);
            }).end(done);

    });
});


describe("Delete /todo/:id",()=>{

    it('Shoul delete only valid object',(done)=>{

        request(app).get('/todos/delete/123')
            .expect(404)
            .end(done);

    });

    it('Should return 404 if object not found',(done)=>{

        request(app).get('/todos/delete/594cbc976abf5a06055e3238')
            .expect(404)
            .end(done);

    });


    it('Should Delete valid object with  id',(done)=>{

        request(app).get(`/todos/delete/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect(res=>{
                expect(res.body.todo.text).toBe(todos[0].text);
            }).end(done);

    });


});


describe("Patch /todos/:id",()=>{

    it('Shoul Update to do',(done)=>{

        var hexID=todos[0]._id.toHexString();
        var text='This should be the new text';

        request(app).patch(`/todos/${hexID}`)
                    .send({completed:true,text})
                    .expect(200)
                    .expect(res=>{

                        expect(res.body.todo.text).toBe(text);
                        expect(res.body.todo.completed).toBe(true);
                        expect(res.body.todo.completedAt).toBeA('number');
                    })
                    .end(done);

    });

    it('Should clear completed At wehen todo is not completed ',(done)=>{

        var hexID=todos[1]._id.toHexString();
        var text='This should be the new text!!';

        request(app).patch(`/todos/${hexID}`)
            .send({completed:false,text})
            .expect(200)
            .expect(res=>{

                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.cmpletedAt).toNotExist();
            })
            .end(done);

    });

    });



