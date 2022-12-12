export const environment = {
  production: true
};

export const SpotifyConfiguration = {
  clientId: '48c11a4c27874137bf970a2fd475cd9d',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'https://spotitrack-app.herokuapp.com/',
  scopes: [
    "user-modify-playback-state", // alterar do player do usuario.
    "app-remote-control", // controle remoto
    "streaming", // streaming
    "user-top-read", // ler top artistas e musicas
  ]

}