import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from '../models/note';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  noteTitle: string;
  notes:any;
  noteText: string;
  //notes:Array<any> = new Array<any>();
  colors: Array<any> = ["red","yellow","blue"];
  constructor(public notesService: NotesService, private router: Router) { }

  ngOnInit(): void {
    this.getNotes();
  }

  /*addNote(): void{
    var note: any = {
      id:Math.random(),
      noteTitle:this.noteTitle,
      noteText:this.noteText,
      color:this.colors[Math.floor(Math.random() * Math.floor(2))]
    }
    this.noteText = "";
    this.noteTitle ="";
    this.notes.push(note);
  }*/
  addNote(){
    var note: Note = new Note();
      note._id=Math.random();
      note.noteTitle=this.noteTitle;
      note.noteText=this.noteText;
      note.color=this.colors[Math.floor(Math.random() * Math.floor(2))];
    
    this.noteText = "";
    this.noteTitle ="";
    console.log(note)
    this.notesService.addNote(note).subscribe(
      (notes:any)=>{
        console.log(notes)
        //this.notes = notes.data;
        this.notes.push(note);
      },
      (error)=>{
        console.log("Error")
      }
    )
  }
  deleteNote(note:Note){
    this.notesService.deleteNote(note._id).subscribe(
      ()=> {
        var index = this.notes.indexOf(note);
    this.notes.splice(index,1);
  },
  (error)=>{
    console.log("Delete error");
  }
    );
}

  getNotes(){
    this.notesService.getNotes().subscribe((notes:any)=>{
     // this.notes = notes.data;
     this.notes = notes;
    },
    (error)=>{
      console.log("Error")
    }
    )
  }
}
