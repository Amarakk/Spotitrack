import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpotifyService } from 'src/shared/services/spotify.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public trackInfo:any
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    private dialog: MatDialog,
    public spotifyService: SpotifyService,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    if(this.data.type == 'track'){
      this.getTrackInfo()
      console.log(this.trackInfo)
    const audio = new Audio(this.data.obj.preview_url);
    this.spotifyService.audio.pause();
    audio.volume = 0.1;
    audio.play();
    this.dialog.afterAllClosed.subscribe(() => {
    audio.pause();
    })
    }
  }

  getTrackInfo(){
    this.spotifyService.getTrackAudioFeatures(this.data.obj.id).then((data) => {
      this.trackInfo = data

    })
  }


}
