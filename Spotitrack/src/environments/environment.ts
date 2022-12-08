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
    "user-modify-playback-state", // alterar do player do usuario.
    "app-remote-control", // controle remoto
    "streaming", // streaming
    "user-top-read", // ler top artistas e musicas
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
