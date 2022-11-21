import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/shared/services/spotify.service';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  private code: any

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
 
      this.code = this.route.snapshot.queryParamMap.get('code');
      console.log(this.code);

    if(!this.code){
     console.log("error")
      this.spotifyService.login()
    }


  }

  getAlbuns(){
    this.spotifyService.getAlbunsFromArtist("Metallica");
  }
  
  login(){
  this.spotifyService.login()
  }
}
