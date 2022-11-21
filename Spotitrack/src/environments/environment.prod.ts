export const environment = {
  production: true
};

export const SpotifyConfiguration = {
  clientId: '48c11a4c27874137bf970a2fd475cd9d',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'http://localhost:4200/',
  scopes: [
    "ugc-image-upload", // upload de imagens
    "user-read-playback-state", // ler estado do player do usuario
    "user-modify-playback-state", // alterar do player do usuario.
    "user-read-currently-playing", // musica tocando agora.
    "app-remote-control", // controle remoto
    "streaming", // streaming
    "playlist-read-private", // ler playlists privadas
    "playlist-read-collaborative", // ler playlists colaborativas
    "playlist-modify-private", // modificar playlists privadas
    "playlist-modify-public", // modificar playlists publicas
    "user-follow-modify", // modificar seguidores
    "user-follow-read", // ler seguidores
    "user-read-playback-position", // ler posicao de reproducao
    "user-top-read", // ler top artistas e musicas
    "user-read-recently-played", // ler musicas tocadas recentemente
    "user-library-modify", // modificar biblioteca
    "user-library-read", // ler biblioteca
    "user-read-email", // ler email
    "user-read-private" // ler dados privados
  ]
}