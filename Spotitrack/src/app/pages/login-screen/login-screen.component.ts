import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/shared/services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router'


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  private code: any
  public user:any ;

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private router: Router


  ) { }

  ngOnInit(): void {
 
    this.getToken()

  }

  getAlbuns(){
    this.spotifyService.getAlbunsFromArtist("Metallica");
  }
  
  login(){
    window.location.href =  this.spotifyService.login();
  }
  async getToken(){
    const token = this.spotifyService.getAccessToken();
    if(!!token){
      this.spotifyService.setAccessToken(token)
      this.user = this.spotifyService.getUsername()
      this.router.navigate(['/main'])
    }

    
  }
}
