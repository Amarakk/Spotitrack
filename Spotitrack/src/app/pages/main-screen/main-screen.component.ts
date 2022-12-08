import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/shared/services/spotify.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DetailsComponent } from 'src/shared/components/details/details.component';
import { of } from 'rxjs/internal/observable/of';

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
  public myRecommedantions: any
  public options: any
  public seed_artists: any
  public seed_tracks: any
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
    this.getRecommendations()
  }

  getTopArtists(){
   this.spotifyService.getTopArtists().then((data) => {
      this.myArtists = data
      this.topThreeArtists = this.myArtists.items.slice(0,3)
      this.seed_artists = this.topThreeArtists.map((element: { id: string; }) => element.id)
      this.getRelatedArtists(this.topThreeArtists)
    })

  }

  async getRecommendations(){
    let options = {
      seed_artists: '0L8ExT028jH3ddEcZwqJJ5,6FBDaR13swtiWwGhX1WQsP,7GDDTwiPJnrechnyJ83BXb',
      seed_tracks: '1sP4VgrC59urtEcshdEgb1,3nqm3DdVskqbHhmb8S8hMd,5SlKhaPcdIfSjpoM2QtM4C,10Nmj3JCNoMeBQ87uw5j8k,0aGQHMr7bc23Y9Ts84ffop'
    } 
    this.spotifyService.getRecommendations({seed_tracks: options.seed_tracks}).then((data) => {
      let response = data
      this.myRecommedantions = response.tracks.slice(0,5) 
      console.log(this.myRecommedantions);
      

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
      this.seed_tracks = this.topFiveTracks.map((element: { id: string; }) => element.id)
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
