export const environment = {
  production: true
};

export const SpotifyConfiguration = {
  clientId: 'b9fa12fc25ed482290cc99be869a9089',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'https://spotitrack-app.herokuapp.com/',
  scopes: [
    "user-modify-playback-state", // alterar do player do usuario.
    "app-remote-control", // controle remoto
    "streaming", // streaming
    "user-top-read", // ler top artistas e musicas
  ]

}