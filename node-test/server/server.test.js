/**
 * Created by noargs on 21/06/17.
 */

const request=require('supertest');
const app=require('./server').app;
const expect=require('expect');


describe('Utils',()=>{

    it('Should return helloworld test',(done)=>{

        request(app).get('/').expect(200).expect('Hello World').end(done);

    });

});



it('Should return Users',(done)=>{

    request(app)
        .get('/users')
        .expect(200)
        .expect((res)=>{

          expect(res.body).toEqual([{name:"Amit"}]);

        })
        .end(done);

});