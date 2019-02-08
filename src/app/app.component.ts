import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

const EMPTY_SLOTS = {
  slot1: "",
  slot2: "",
  slot3: ""
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  playing = false
  blueScore = 0
  redScore = 0
  constructor(
    private db: AngularFireDatabase
  ){
  }

  ngOnInit(){
    this.db.object('rooms/default/_state')
      .valueChanges().subscribe((_state: any) => {
        this.playing = _state.play
        if(_state.blue)
          this.blueScore = (_state.blue.slot1 || 0) + (_state.blue.slot2 || 0) + (_state.blue.slot3 || 0)
        if(_state.red)
          this.redScore = (_state.red.slot1 || 0) + (_state.red.slot2 || 0) + (_state.red.slot3 || 0)
      })
  }

  togglePlay(){
    this.db.object('rooms/default/_state/play').set(!this.playing)
  }

  clearSlot(){
    this.db.object('rooms/default/blue/slots').set(EMPTY_SLOTS);
    this.db.object('rooms/default/red/slots').set(EMPTY_SLOTS);
  }
}
