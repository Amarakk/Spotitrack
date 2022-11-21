import { Injectable, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';

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
  spotify: Spotify.SpotifyWebApiJs = null;



  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { 
    this.spotify = new Spotify();
  }


login(){
  console.log(this.authEndpoint + this.clientId + this.redirect_uri + this.scopes + this.response_type)
  return(this.authEndpoint+this.clientId+this.redirect_uri+this.scopes+this.response_type)
}

getAccessToken(){
  if (window.location.hash) {
    const hash = window.location.hash.substring(1).split('&')
    console.log(hash[0].split('=')[1])
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
  console.log(token)
  this.spotify.setAccessToken(token);
  localStorage.setItem('token', token);
  }


async getAlbunsFromArtist(artist: string) {
  this.spotify.getArtistAlbums(artist)
}


async getTopArtists(){
  this.myArtist = await this.spotify.getMyTopArtists()
  return this.myArtist
}

  

}
