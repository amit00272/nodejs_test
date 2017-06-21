
const expect=require('expect');
const rewire=require('rewire');

var app=rewire('./app');

describe('App',()=>{

    var  db={

        saveUser:expect.createSpy()

    };

    app.__set__('db',db);


it("Spy should called correctly",()=>{
    var spy=expect.createSpy();
    spy('Amit','26');
    expect(spy).toHaveBeenCalled('Amit','26');

});

it("Should called saved user with user object",()=>{

    var email='amit00272@hotmail.com';
    var password="password";

    app.handleSignup(email,password);
    expect(db.saveUser).toHaveBeenCalledWith({email,password});

});

});

