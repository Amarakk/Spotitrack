import { Injectable, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService implements OnInit {
  private clientSecret="ecc7d29beac94666a6d2006c57d10bf2"
  private clientId="68d5f35a3490488abf0f4418be174135"
  private redirect_uri = 'https://localhost:4200/';
  
  private url = 'https://api.spotify.com/v1/'; 

  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': '*/*',
  });

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.login()
    
  }

async login(){
  await this.http.get('https://accounts.spotify.com/authorize?'+`&code=user-read-private&client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirect_uri}` , {headers: this.headers}).subscribe(
    (data) => {
      console.log(data);
    }
  );
}

async getAlbunsFromArtist(artist: string) {

  const url = `${this.url}search?q=${artist}&type=album&limit=50`;
  const  headers = new HttpHeaders({
    'Token':`Bearer AQBD6HVzvkbDD_xMYCBwNpcRyY7lt6nIcn8O1HCLI_vAie4LzHQu5Du9wClKe2mQC679LBqVHbAAO_MDsOaSHkOMbqO15zo3x3UctQ62sFZ1gm1Y_jeg9f9hq6jdYFXKuOFtqQvSFYST-mTDyWsgNfdHW3qzdFhkqlE`
})
  const response = await this.http.get(url, { headers:headers }).subscribe(
    (data) => {
      console.log(data);
    }
  );
  return response;
}
  

}
