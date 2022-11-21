// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const SpotifyConfiguration = {
  clientId: '48c11a4c27874137bf970a2fd475cd9d',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'https://localhost:8080/',
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
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
