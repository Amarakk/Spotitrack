import { Injectable, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ActivatedRoute, TitleStrategy } from '@angular/router';

import { SpotifyConfiguration } from '../../environments/environment';

import Spotify from 'spotify-web-api-js';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
  private clientId= `client_id=${SpotifyConfiguration.clientId}&`
  private redirect_uri= `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
  private scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`; 
  private response_type = 'response_type=token&show_dialog=true&';
  
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


login(){
  return(this.authEndpoint+this.clientId+this.redirect_uri+this.scopes+this.response_type)
}

getAccessToken(){
  if (window.location.hash) {
    const hash = window.location.hash.substring(1).split('&')
    return(hash[0].split('=')[1])
  }
  else{
    return null
  }
}


async getUsername(){
  this.setAccessToken(localStorage.getItem('token'))
  this.myName = await this.spotify.getMe()
  return this.myName

}

setAccessToken(token: string) {
  this.spotify.setAccessToken(token);
  localStorage.setItem('token', token);
  }


async getAlbunsFromArtist(artist: string) {
  this.spotify.getArtistAlbums(artist)
}


async getTopArtists(time_range: string){
  this.myArtist = await this.spotify.getMyTopArtists({
    time_range: time_range,
  })
  return this.myArtist
}

async getTopTracks(time_range: string){
  this.myTracks = this.spotify.getMyTopTracks({
    time_range: time_range,
  })
  return this.myTracks
}

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

async getRelatedArtist(artist_Id: string){
  this.relatedArtist = await this.spotify.getArtistRelatedArtists(artist_Id)
  return this.relatedArtist
}

async getTrackAudioFeatures(track: string){
  this.audioFeatures = await this.spotify.getAudioFeaturesForTrack(track)
  return this.audioFeatures
}

async getTrackAudioAnalysis(track: string){
  this.audioFeatures = await this.spotify.getAudioAnalysisForTrack(track)
  return this.audioFeatures
}

async getRecommendations(options: SpotifyApi.RecommendationsOptionsObject){
  this.myRecommendations = await this.spotify.getRecommendations(options)
  return this.myRecommendations
}

async getArtistTopTracks(artist: string){
  this.artistTopTracks = await this.spotify.getArtistTopTracks(artist, 'US')
  return this.artistTopTracks
}

}
