import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/shared/services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router'

/* Componetes angular para obter os tokens de autorizaçao da API. */
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
    // Verifica se o usuário já está logado
    this.getToken()

  }

  //Função de login, que redireciona o usuário para a página de autorização da API do Spotify e retorna o token de acesso
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
