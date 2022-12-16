import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpotifyService } from 'src/shared/services/spotify.service';

import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexTitleSubtitle,ApexYAxis, ApexPlotOptions, ApexDataLabels, ApexResponsive} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  responsive: any;
}

/* Tais chamdas só são realizadas quando clicamos no ícone de algum artista
  ou música.
*/

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public trackInfo:any
  public chartData: { name: string; data: any[]; }[];

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    private dialog: MatDialog,
    public spotifyService: SpotifyService,
  ) { }
  // Inicializa o modal, onde é feita a verificação se o tipo de dado é uma música ou artista, se for música, é chamada a função para gerar os gráficos de informações sobre a música,
  // se for artista, é chamada a função para tocar uma música aleatória do artista
  ngOnInit(): void {
    if(this.data.type == 'track'){
      this.getTrackInfo()
    const audio = new Audio(this.data.obj.preview_url);
    this.spotifyService.playTrack(this.data.obj)
    this.dialog.afterAllClosed.subscribe(() => {
    audio.pause();
    this.spotifyService.spotify.pause();
    })
    } else {
      this.playRandomTrackFromArtist(this.data.obj[0])
    }
  }
  //função para tocar uma música aleatória do artista
  playRandomTrackFromArtist(artist:any){
    this.spotifyService.getArtistTopTracks(artist.id).then((data) => {
      let tracks = data.tracks
      let randomTrack = tracks[Math.floor(Math.random() * tracks.length)]
      this.spotifyService.playTrack(randomTrack)
    })
  }
  // Função para gerar os gráficos de informações sobre a música, como dançabilidade, positividade, etc.
  getTrackInfo(){
    this.spotifyService.getTrackAudioFeatures(this.data.obj.id).then((data) => {
      this.trackInfo = data
      this.chartData = [
        {
          name: 'Energia',
          data: this.trackInfo.energy
        },
        {
          name: 'Dançabilidade',
          data: this.trackInfo.danceability
        },
        {
          name: 'Positividade',
          data: this.trackInfo.valence
        },
        {
          name: 'Acusticidade',
          data: this.trackInfo.acousticness
        },
        {
          name: 'Instrumentalidade',
          data: this.trackInfo.instrumentalness
        },
        {
          name: 'Vivacidade',
          data: this.trackInfo.liveness
        },
        {
          name: 'Falabilidade',
          data: this.trackInfo.speechiness
        }]
        this.chartOptions = {
          series: [
            {
              name:"0-1",
              data: this.chartData.map((element) => element.data)
            }
          ],
          chart: {
            height: 400,
            width: 400,
            type: "radar",
           
            redrawOnParentResize: true,
            toolbar: {
              show: false
            },
          },
          xaxis: {
            categories: this.chartData.map((element) => element.name),
          },
          yaxis: {
            show: false,
            forceNiceScale: true ,
            tickAmount: 4,
            min: 0,
            max: 1,
          },
          plotOptions: {
            radar: {
              polygons: {
                fill: {
                    colors: ['#f8f8f8', '#fff']
                }
              }
            }
          },
          responsive: [{
            breakpoint: undefined,
            options: {},
            
        }]
        };
    })
  }
}
