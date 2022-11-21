import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/shared/services/spotify.service';


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

  constructor(
    public spotifyService: SpotifyService,
    private route: ActivatedRoute

  ) { 

  }
  
  ngOnInit() {
    this.spotifyService.setAccessToken(localStorage.getItem('token'))
    this.getUsername();
    this.getTopArtists()
    
  }

  getTopArtists(){
   this.spotifyService.getTopArtists().then((data) => {
      this.myArtists = data
      this.topThreeArtists = this.myArtists.items.slice(0,3)
    })

  }


  async getUsername(){
    this.spotifyService.getUsername().then((data) => {
      this.user = data
      this.image = this.user.images[0].url
    })
  }
}
