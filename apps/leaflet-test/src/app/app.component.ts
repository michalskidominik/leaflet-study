import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { circle, icon, latLng, Marker, marker, markerClusterGroup, polygon, tileLayer } from 'leaflet';

Marker.prototype.options.icon = icon({
  iconRetinaUrl: 'assets/marker-icon-2x.png',
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

@Component({
  selector: 'leaflet-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  options;
  leafletLayers;
  layersControl;
  markerClusterOptions;

  ngOnInit(): void {
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 14,
      center: latLng(50.233277465610236, 19.85915853096661)
    };

    this.layersControl = {
      baseLayers: {
        'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
        'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      },
      overlays: {
        'Big Circle': circle([ 50.233277465610236, 19.85915853096661 ], { radius: 5000 }),
        'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
      }
    }

    const markers = markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true
    });

    markers.addLayers([
      L.marker(L.latLng(50.233277465610236, 9.85915853096661)),
      L.marker(L.latLng(50.23348335046508, 19.857034221461547)),
      L.marker(L.latLng(50.231383283232894, 19.855746761155448)),
      L.marker(L.latLng(50.23237156168737, 19.851841464893617)),
    ]);

    const markers2 = markerClusterGroup();
    markers2.addLayers([
      L.marker(L.latLng(50.24269235695117, 19.782297150692518)),
      L.marker(L.latLng(50.24658952286159, 19.773799912672267)),
      L.marker(L.latLng(50.250817942066206, 19.787359067889604)),
      L.marker(L.latLng(50.24608792335604, 19.784875823387996)),
    ]);

    this.leafletLayers = [markers, markers2];



  }
}
