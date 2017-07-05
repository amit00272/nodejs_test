const users = [

    {
        id:1,
        name:"Amit",
        school:'123'

    },{
        id:2,
        name:"Sumit",
        school:'999'

    },{
        id:3,
        name:"Mohit",
        school:'123'

    }
];

const grades = [{
    id:1,
    grade:80,
    school:'123'

},{
    id:2,
    grade:90,
    school:'999'

},{
    id:3,
    grade:100,
    school:'123'

}];

const getUser = (id) =>{

  return new Promise((resolve,reject)=>{

     const user=users.find((user)=>user.id===id);
     if(user){

         resolve(user);
     }else{
         reject(`unable to find user of Id  ${id}`);
     }
  });
};


const getGrades = (schoolId) =>{


    return new Promise((resolve,reject)=>{

        resolve(grades.filter(grade=>grade.school===schoolId));
    });
};

const getStatus = (userid)=>{
    var user;
    return getUser(userid).then(tempuser=>{
            user=tempuser;
            return getGrades(user.school);
    }).then((grades)=>{

        let  average = 0;
        if(grades.length>0){

            average=grades.map(grade=>grade.grade).reduce((a,b)=>a+b)/grades.length;
            return `${user.name} has ${average}% in the class `;
        }

    })


}


const getStatusAlt= async (userID) =>{

   const user = await getUser(userID);
   const grades=await  getGrades(user.school);
   let  average = 0;
   if(grades.length>0)
       average=grades.map(grade=>grade.grade).reduce((a,b)=>a+b)/grades.length;

   return `${user.name} has ${average}% in the class `;

}

getStatusAlt(1).then(name=>{

    console.log(name);

}).catch(e=>{

    console.log(e);
});

/*getUser(2).then((user)=>{

    console.log(user);

}).catch(e=>{
    console.log(e);

});


getGrades('123').then((users)=>{

    console.log(users);

}).catch(e=>{
    console.log(e);

});*/



/*
getStatus(2).then((status)=>{

    console.log(status);

}).catch(e=>{
    console.log(e);

});*/
