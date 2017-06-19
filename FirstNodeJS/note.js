/**
 * Created by noargs on 04/06/17.
 */
/*
console.log("Starting notes.js");

module.exports.age=25;

module.exports.addNotes=() =>{

    console.log("ad notes");
    return "returning thing from adnotes";
}

module.exports.addNotes = (a,b) => {



};
*/

const fs=require('fs');

var fetchnotes=()=>{

    try {

        return JSON.parse(fs.readFileSync("notes-data.json"));
    }catch(e){
        return [];
    }

};
var savenotes=(notes)=>{

    fs.writeFileSync("notes-data.json",JSON.stringify(notes));


};

var deletenotes = (title) =>{

    var notes=fetchnotes();
    var remainingnotes= notes.filter( note => note.title != title );
    savenotes(remainingnotes);
    return notes.length != remainingnotes.length;

}

var adNotes = (title,body) =>{

    var notes=fetchnotes();

    var note={
        title,
        body
    };

  var duplicateNotes=notes.filter( note=> note.title === title );


    if(duplicateNotes.length>0)return;

    notes.push(note);
    savenotes(notes);
    return note;


}
var getNotes=(title)=>{

    var notes=fetchnotes();
    var duplicateNotes=notes.filter( note=> note.title === title );
    return duplicateNotes[0];
}

var getAllNotes = () =>{

    return fetchnotes();
}

var removeNote = (title) =>{

    return deletenotes(title);
}

var logNote=(note)=>{

console.log("-----------------");
console.log(`Title=${note.title}`);
console.log(`Body=${note.body}`);
console.log("-------------------");

};

module.exports = {adNotes ,getAllNotes,removeNote,getNotes,logNote};