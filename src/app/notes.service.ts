import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Note } from './models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  updateNote(note: Note):Observable<any> {
    return this.http.put("http://localhost:3000/notes/"+note._id, note);
  }
  noteTitle: string;
  noteText: string;
  notes:Array<any> = new Array<any>();
  colors: Array<any> = ["red","yellow","blue"];
  //constructor() { }
  constructor(private http: HttpClient) { }

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
  deleteNote(noteId:any):Observable<any>{
    /*var index = this.notes.indexOf(note);
    this.notes.splice(index,1);*/
    return this.http.delete("http://localhost:3000/notes/"+noteId)
  }
  getNote(noteId:any):Observable<any>{
    /*for(let i=0; i<this.notes.length;i++){
      var note = this.notes[i];
      if(note.id == noteId){
        return note;
      }
    }
    return null;*/
    console.log(noteId);
    return this.http.get("http://localhost:3000/notes/"+noteId);
  }
  saveNote(note:any):any{
    var index = this.notes.indexOf(note);
    this.notes.splice(index,1);
    this.notes.push(note);
  }
  getNotes(): any{
    return this.http.get("http://localhost:3000/notes");
  }
  addNote(note):any{
    return this.http.post("http://localhost:3000/notes",note);
  }

}
