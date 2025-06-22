import { Injectable, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ActivatedRoute, TitleStrategy } from '@angular/router';

import { SpotifyConfiguration } from '../../environments/environment';

import Spotify from 'spotify-web-api-js';


/* Aqui são chamadas e instanciadas todas as chamadas HTTP necessárias para
  o carregamento das informações fornecidas pela APP. Para a construcao das
  chamadas, utilizamos a lib spotify-web-api-js
  O nome das funções já indica o que está sendo feito
*/

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
  private clientId= `client_id=${SpotifyConfiguration.clientId}&`
  private redirect_uri= `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
  private scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`; 
  private response_type = 'response_type=token&show_dialog=true&';
  /* Declaração das variáveis que serão retornadas quando
  solicitadas
  */
  public myName: any
  public myImage: any
  public myArtist: any
  public myTracks: any
  public artistTopTracks: any
  public relatedArtist: any
  public audioFeatures: any
  public myRecommendations: SpotifyApi.RecommendationsFromSeedsResponse
  spotify: Spotify.SpotifyWebApiJs = null;
  audio = new Audio();



  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { 
    this.spotify = new Spotify();

  }

// Função para fazer o login do usuário
login(){
  return(this.authEndpoint+this.clientId+this.redirect_uri+this.scopes+this.response_type)
}
// Função para pegar o token do usuário
getAccessToken(){
  if (window.location.hash) {
    const hash = window.location.hash.substring(1).split('&')
    return(hash[0].split('=')[1])
  }
  else{
    return null
  }
}

// Função para pegar o nome do usuário
async getUsername(){
  this.setAccessToken(localStorage.getItem('token'))
  this.myName = await this.spotify.getMe()
  return this.myName

}
// Função para settar o token do usuário no localStorage do navegador
setAccessToken(token: string) {
  this.spotify.setAccessToken(token);
  localStorage.setItem('token', token);
  }

// Função para pegar os albuns do artista (não está sendo usada)
async getAlbunsFromArtist(artist: string) {
  this.spotify.getArtistAlbums(artist)
}

// Função para pegar os top artistas do usuário (retorna 20 artistas)
async getTopArtists(time_range: string){
  this.myArtist = await this.spotify.getMyTopArtists({
    time_range: time_range,
  })
  return this.myArtist
}
// Função para pegar os top tracks do usuário (retorna 20 tracks)
async getTopTracks(time_range: string){
  this.myTracks = this.spotify.getMyTopTracks({
    time_range: time_range,
  })
  return this.myTracks
}
// Função para tocar as track
async playTrack(track:any){
  this.audio.pause();
  this.spotify.pause();
    this.spotify.play({
      uris: [track.uri]
    }).then(() => {
    }).catch((err) => {

    this.audio.src = track.preview_url;
    this.audio.volume = 0.1;
    this.audio.play();
    });
}
// Função pára pegar os artistas relacionados ao artista selecionado
async getRelatedArtist(artist_Id: string){
  this.relatedArtist = await this.spotify.getArtistRelatedArtists(artist_Id)
  return this.relatedArtist
}
// Função para pegar as features de uma track
async getTrackAudioFeatures(track: string){
  this.audioFeatures = await this.spotify.getAudioFeaturesForTrack(track)
  return this.audioFeatures
}
// Função para pegar a análise de uma track (não está sendo usada)
async getTrackAudioAnalysis(track: string){
  this.audioFeatures = await this.spotify.getAudioAnalysisForTrack(track)
  return this.audioFeatures
}
// Função para pegar as recomendações de tracks baseado nas mais ouvidas do usuário
async getRecommendations(options: SpotifyApi.RecommendationsOptionsObject){
  this.myRecommendations = await this.spotify.getRecommendations(options)
  return this.myRecommendations
}
// Função para pegar as tracks mais ouvidas de um artista
async getArtistTopTracks(artist: string){
  this.artistTopTracks = await this.spotify.getArtistTopTracks(artist, 'US')
  return this.artistTopTracks
}

}
