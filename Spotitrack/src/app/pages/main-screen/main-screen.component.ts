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
