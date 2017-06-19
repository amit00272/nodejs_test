

const fs= require("fs");
const os =require("os");
const notes=require("./note.js");
const _=require("lodash");
const yargs=require('yargs');
const http=require('http');
//1 way to concat the string
//var str="Hello Mr. "+os.userInfo().username+"\n";
//2 otherway to concat the string using templete string
/*
var str= `Hello ! ${os.userInfo().username} .You are ${notes.age} years old.\n`;
fs.appendFile("greet.txt",str);
*/
//console.log(notes.add(10,20));
//console.log(_.isString("true"));

const titleOptions={

                    describe:'title of the note',
                    demand:true,
                    alias:'t'
                  };

const bodyOptions={

                    describe:'body of the note',
                    demand:false,
                    alias:'b'
                 };
const argv=yargs
           .command('add',"Add a new note",{title:titleOptions, body:bodyOptions})
           .command('get',"Get a indivisual note",{title:titleOptions})
           .command('list',"List all Notes")
           .command('remove',"Remove a note",{title:titleOptions,})
           .help()
           .argv;

var command = argv._[0];

if(command ===  'add'){

   var note= notes.adNotes(argv.title,argv.body);
   if(note==undefined){

       console.log(`Notes of title ${argv.title} is already exist`);
   }else{

       console.log(`Notes of title ${argv.title} is added to the file`);

   }
}else if(command ===  'get'){

   var note=notes.getNotes(argv.title);
    if(note==undefined){

        console.log(`Notes of title ${argv.title} doesn't exist`);
    }else{

        console.log(`Notes of title ${argv.title} has written ${note.body}`);

    }

}else if(command ===  'list'){

    var notesAr=notes.getAllNotes();
    console.log(`Printing ${notesAr.length} number of notes`);
    notesAr.forEach(notes.logNote);

}else  if(command ===  'remove'){

   var note=notes.removeNote(argv.title);
    if(note){

        console.log(`Notes of title ${argv.title} is removed from file`);
    }else{

        console.log(`Notes of title ${argv.title} is not exist`);

    }
}




