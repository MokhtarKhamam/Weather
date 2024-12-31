import {
  LayersControl,
  Map,
  Marker,
  Popup,
  TileLayer,
} from "react-windy-leaflet";
import "./App.css";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";

function App() {
  const [state, setState] = useState({
    lat: 51.505,
    lng: -0.09,
    zoom: 13,

    pickerOpen: true,
    pickerLat: -23,
    pickerLng: -42,

    overlay: "wind",
  });
  const { BaseLayer } = LayersControl;

  const position = [state.lat, state.lng];

  useEffect(() => {
    let interval = setInterval(() => {
      setState((s) => ({
        ...s,
        pickerLat: s.pickerLat + 1,
        pickerLng: s.pickerLng + 1,
      }));
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setState((s) => ({ ...s, pickerOpen: false }));
    }, 6000);

    setTimeout(() => {
      setState((s) => ({
        ...s,
        pickerOpen: true,
        pickerLat: 25,
        pickerLng: 40,
      }));
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const [data, setData] = useState()

  useEffect(() => {
    axios
      .get(
        `https://my.meteoblue.com/packages/basic-1h_basic-day?apikey=n4BG3KOJMAR8xE9t&lat=${state.lat}&${state.lng}&asl=13&format=json`
      )
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {/* <Map
        className="leaflet-container"
        style={{ width: "100%", height: "96vh" }}
        windyKey={"E7EPTGs6B1nzSEnvnz7hyPcw0XQHPcDd"}
        windyLabels={false}
        windyControls={false}
        overlay={state.overlay}
        overlayOpacity={0.5}
        particlesAnim={false}
        zoom={state.zoom}
        center={[state.lat, state.lng]}
        removeWindyLayers
        onWindyMapReady={() => {
          console.log("Windy Map Loaded!");
        }}
        pickerPosition={
          state.pickerOpen ? [state.pickerLat, state.pickerLng] : null
        }
        onPickerOpened={(latLng) => console.log("Picker Opened", latLng)}
        onPickerMoved={(latLng) => {
          console.log("Picker Moved", latLng);
          this.setState({
            pickerLat: latLng.lat,
            pickerLng: latLng.lon,
          });
        }}
        onPickerClosed={() => console.log("Picker Closed")}
        mapElements={
          <React.Fragment>
            <LayersControl>
              <BaseLayer checked name="OSM">
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </BaseLayer>
            </LayersControl>

            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </React.Fragment>
        }
      /> */}

      <Map
        className="leaflet-container"
        style={{ width: "100%", height: "96vh" }}
        windyKey="E7EPTGs6B1nzSEnvnz7hyPcw0XQHPcDd"
        center={[state.lat, state.lng]}
        zoom={state.zoom}
        windyLabels={false}
        windyControls={false}
        overlay={state.overlay}
        overlayOpacity={0.5}
        particlesAnim={false}
        removeWindyLayers
        onWindyMapReady={() => {
          console.log("Windy Map Loaded!");
        }}
        pickerPosition={
          state.pickerOpen ? [state.pickerLat, state.pickerLng] : null
        }
        onPickerOpened={(latLng) => console.log("Picker Opened", latLng)}
        onPickerMoved={(latLng) => {
          console.log("Picker Moved", latLng);
          setState((prevState) => ({
            ...prevState,
            pickerLat: latLng.lat,
            pickerLng: latLng.lng,
          }));
        }}
        onPickerClosed={() => console.log("Picker Closed")}
      >
        <LayersControl>
          <BaseLayer checked name="OSM">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
        </LayersControl>

        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
      <div className="expected"></div>
    </>
  );
}

export default App;
