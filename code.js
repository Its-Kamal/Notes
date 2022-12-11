const NewNote = document.querySelector("#header #add-note");
const MainArea = document.querySelector("#main");
var NoteHTML = `<i class="fa-solid fa-expand" id="expand-note"></i><i class="fa-solid fa-trash" id="delete-note"></i><input type="text" id="note-title" placeholder="Title here"><textarea id="note-content" placeholder="Add Notes here" cols="30" rows="10"></textarea>`;
function localupdate(){
    var NoteDataTitle= MainArea.querySelectorAll("#note-title");
    var NoteDataContent= MainArea.querySelectorAll("#note-content");
    var TitleDataAR=[];
    var ContentDataAR=[];
    console.log(NoteDataTitle);
    NoteDataTitle.forEach(function (item) {
        TitleDataAR.push(item.value);
        // console.log(TitleDataAR);
    })
    NoteDataContent.forEach(function (item) {
        ContentDataAR.push(item.value);
        // console.log(ContentDataAR);
    })
    localStorage.setItem("Notes_Title",JSON.stringify(TitleDataAR));
    localStorage.setItem("Notes_Content",JSON.stringify(ContentDataAR));
    
}
const AddingNote=() => {
    var note = document.createElement("div");
    note.classList = "note";
    MainArea.appendChild(note);
    note.insertAdjacentHTML("afterbegin", NoteHTML);
    note.querySelector("#expand-note").addEventListener("click", function(){
      if (note.style.height == "6vh") {
        note.style.height = "30vh";
      } else {
        note.style.height = "6vh";
      }
    });
    note.querySelector("#delete-note").addEventListener("click", function(){
      note.remove();
      localupdate();
    });
    const NoteTitle=document.querySelector('#note-title');
    const NoteContent=document.querySelector('#note-content');
    NoteTitle.addEventListener('input',localupdate());
    NoteContent.addEventListener('input',localupdate());
}
function GetLocalData() {
    var GetTitle=[];
    var GetContent=[];
    JSON.parse(localStorage.getItem("Notes_Title")).forEach(function (name) {
        GetTitle.push(name);
    })
    JSON.parse(localStorage.getItem("Notes_Content")).forEach(function (name) {
        GetContent.push(name);
    })
    for (let index = 0; index < GetTitle.length; index++) {
        NoteHTML = `<i class="fa-solid fa-expand" id="expand-note"></i><i class="fa-solid fa-trash" id="delete-note"></i><input type="text" id="note-title" placeholder="Title here" value='${GetTitle[index]}'><textarea id="note-content" placeholder="Add Notes here" cols="30" rows="10">${GetContent[index]}</textarea>`;
        AddingNote();
    }
}
if (localStorage.length>0) {
    GetLocalData();
}
NoteHTML = `<i class="fa-solid fa-expand" id="expand-note"></i><i class="fa-solid fa-trash" id="delete-note"></i><input type="text" id="note-title" placeholder="Title here"><textarea id="note-content" placeholder="Add Notes here" cols="30" rows="10"></textarea>`;
NewNote.addEventListener("click", AddingNote);