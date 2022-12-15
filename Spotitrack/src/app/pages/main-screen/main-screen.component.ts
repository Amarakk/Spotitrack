import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/shared/services/spotify.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DetailsComponent } from 'src/shared/components/details/details.component';
import { of } from 'rxjs/internal/observable/of';

/* Aqui iremos chamar a services/spotify.service.ts para montar
  as chamadas. Ademais, iremos tratar os dados recebidos utilizando
  funcoes do Javascript como map, slice, forEach.
*/

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
  public myRecommedations: any
  public options: any
  public seed_artists: any
  public seed_tracks: any
  public topFiveTracks: any;
  public period: any = 'short_term';
  public timespan: any = 'no último mês'


  constructor(
    public spotifyService: SpotifyService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { 

  }
  
  ngOnInit() {
    this.spotifyService.setAccessToken(localStorage.getItem('token'))
    this.getUsername();
    this.getTopArtists();
    this.getTopTracks();
    
  }

  getTopArtists(){
   this.spotifyService.getTopArtists(this.period).then((data) => {
      this.myArtists = data
      this.topThreeArtists = this.myArtists.items.slice(0,3)
      this.seed_artists = this.topThreeArtists.map((element: { id: string; }) => element.id)
      this.getRelatedArtists(this.topThreeArtists)
    })

  }

  getRecommendations(){
    let options = {
      seed_tracks: this.myTracks.items.slice(0,5).map((element: { id: string; }) => element.id)
    } 
    this.spotifyService.getRecommendations({seed_tracks: options.seed_tracks}).then((data) => {
      let response = data
      this.myRecommedations = response.tracks.slice(0,5) 

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
    this.spotifyService.getTopTracks(this.period).then((data) => {
      this.myTracks = data
      this.topFiveTracks = this.myTracks.items.slice(0,5)
      this.seed_tracks = this.topFiveTracks.map((element: { id: string; }) => element.id)
      this.getRecommendations()
    })
  }

  playRandomTrackFromArtist(artist:any){
    this.spotifyService.getArtistTopTracks(artist.id).then((data) => {
      let tracks = data.tracks
      let randomTrack = tracks[Math.floor(Math.random() * tracks.length)]
      this.spotifyService.playTrack(randomTrack)
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
  /* Funçao para mudar o período de tempo das buscas pelos dados
    na API do Spotify
  */
  changePeriod(period: any){
    if( period == 0){
      this.period = 'short_term'
      this.timespan = 'no último mês'
    }
    if( period == 1){
      this.period = 'medium_term'
      this.timespan = 'nos últimos 6 meses'
    }
    if( period == 2){
      this.period = 'long_term'
      this.timespan = 'de sempre'
    }
    this.getTopArtists();
    this.getTopTracks();
  }
}
