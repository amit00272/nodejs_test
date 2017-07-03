/**
 * Created by noargs on 22/06/17.
 */

const expect=require('expect');
const request =require('supertest');
const {app}=require('../server');
const {Todo}=require('../models/todo');
const {User}=require('./../models/user');
const {todos,populateTodos,users,populateUsers}=require('./seed');


beforeEach(populateUsers);
beforeEach(populateTodos);

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



describe('GET /users/me',()=>{

    it('should return user if authenticated',(done)=>{

        request(app)
            .get('/users/me')
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .expect(res=>{

                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);

            })
            .end(done);

    });


    it('should return 401 if not authenticated',(done)=>{

        request(app)
            .get('/users/me')
            .set('x-auth','amit k')
            .expect(401)
            .expect(res=>{

                expect(res.body).toEqual({});

            })
            .end(done);
    });



});


describe('POST /users',()=>{

    it('Should create a user',(done)=>{

        var email="mki@gmail.com";
        var password="123mnb!";

        request(app)
            .post('/users')
            .send({email,password})
            .expect(200)
            .expect((res)=>{

                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);

            })
            .end((err)=>{

                if(err){
                    return done(err);
                }

                User.findOne({email}).then((user)=>{

                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                });
            });

    });


    it('Should return validation error if request invalid',(done)=>{

        request(app)
            .post('/users')
            .send({
                email:"abcs",
                password:"123"
            })
            .expect(400)
            .end(done);

    });


    it('Should not create a user if email is in use',(done)=>{

        var email=users[0].email;
        var password="123mnb!";

        request(app)
            .post('/users')
            .send({email,password})
            .expect(400)
            .end(done);

    });

});


describe('POST users/login',()=>{

    it('Should login user and return auth token',(done)=>{

        request(app)
            .post('/user/login')
            .send({
                email:users[1].email,
                password:users[1].password
            })
            .expect(200)
            .expect(res=>{

                expect(res.headers['x-auth']).toExist();

            })
            .end((err,res)=>{

                if(err)
                    return done(err);

                User.findById(users[1]._id).then((user)=>{

                    expect(user.tokens[0]).toInclude({

                        access:'auth',
                        token:res.headers['x-auth']

                    });
                    done();

                }).catch((e)=>done(e));

            });

    });


    it('should reject invalid login',(done)=>{

        request(app)
            .post('/user/login')
            .send({
                email:users[1].email,
                password:"hijlkjljkl"
            })
            .expect(400)
            .expect(res=>{

                expect(res.headers['x-auth']).toNotExist();

            })
            .end((err,res)=>{

                if(err)
                    return done(err);

                User.findById(users[1]._id).then((user)=>{

                    expect(user.tokens.length).toBe(0);
                    done();

                }).catch((e)=>done(e));

            });

    });


});