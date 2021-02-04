import { Component, OnInit } from '@angular/core';
import { NotesService} from '../notes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../models/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  _id:any;
  note:any = {_id:0, noteTitle:"", noteText:""};
  constructor(private route: ActivatedRoute, private router: Router, public notesService:NotesService) { }

  

  ngOnInit(): void {
    /*this.id = Number(this.route.snapshot.paramMap.get('id'));
this.note = this.notesService.getNote(this.id);*/
this.note = {noteTitle:"", noteText:"", color:""};
this._id = this.route.snapshot.paramMap.get('id');
console.log("id from comp"+this._id);
this.notesService.getNote(this._id).subscribe(
  (note:Note)=>{
    this.note = note;
  },
  (error)=>{
    console.log("Error")
  }
);
  }

  saveNote(): void {
    this.notesService.saveNote(this.note);
    this.router.navigate(["/notes"]);
  }
updateNote():void{
  this.notesService.updateNote(this.note).subscribe(
    (note:Note)=>{
      this.router.navigate(["/notes"]);
    },
    (error)=>{
      console.log("Error d'update de note");
    }
  )
}

}
