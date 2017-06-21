/**
 * Created by noargs on 21/06/17.
 */
const utils=require('./util');
const expect=require('expect');

it("should add two numbers",()=>{

    var res=utils.add(1,3);

    expect(res).toBe(4).toBeA('number');
    // throw new Error("value not correct");

});

it("Should test async function",(done)=>{

  utils.asyncAdd(10,20,(value)=>{

      expect(value).toBe(30).toBeA('number');
      done();
  });


});