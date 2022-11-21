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
  public user:any ;
  public image: any;
  constructor(
    public spotifyService: SpotifyService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.spotifyService.getUsername()
    this.spotifyService.setAccessToken(localStorage.getItem('token'))
    this.spotifyService.getUserImage();
    this.spotifyService.getTopArtists()
  }

}
