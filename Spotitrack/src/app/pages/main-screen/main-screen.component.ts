import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/shared/services/spotify.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DetailsComponent } from 'src/shared/components/details/details.component';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {
  private code: any
  public lista = [1,2,3,4,5,6,7,8,9,0]
  popupUrl: any;
  public user:any
  public image: any;
  public myArtists: any;
  public topThreeArtists: any;
  public topThreeRelatedArtist: any;
  public myTracks: any;
  public topFiveTracks: any;
  public period: any;

  constructor(
    public spotifyService: SpotifyService,
    private route: ActivatedRoute,
    public dialog: MatDialog

  ) { 

  }
  
  ngOnInit() {
    this.spotifyService.setAccessToken(localStorage.getItem('token'))
    this.getUsername();
    this.getTopArtists();
    this.getTopTracks();
  }

  getTopArtists(){
   this.spotifyService.getTopArtists().then((data) => {
      this.myArtists = data
      this.topThreeArtists = this.myArtists.items.slice(0,3)
      this.getRelatedArtists(this.topThreeArtists)
    })

  }

  async getRelatedArtists(topThreeArtists: any){
    const artistId = topThreeArtists.map((element: { id: string; }) => element.id)
    let listOfArtist: any[] = []
  
    artistId.forEach((artist: string) =>  this.spotifyService.getRelatedArtist(artist).then((data) => {
      listOfArtist.push(data.artists.slice(0,3))
    }))
    this.topThreeRelatedArtist = listOfArtist
  }

  getTopTracks(){
    this.spotifyService.getTopTracks().then((data) => {
      this.myTracks = data
      this.topFiveTracks = this.myTracks.items.slice(0,5)
    })
  }

  playTrack(track:any){

      this.spotifyService.playTrack(track)
    
  }


  async getUsername(){
    this.spotifyService.getUsername().then((data) => {
      this.user = data
      this.image = this.user.images[0].url
    })
  }

  seeDetails(obj:any, type:string){
    this.dialog.open(DetailsComponent, {
      data: {
        obj: obj,
        type: type
      }})
  }
}
