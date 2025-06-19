"use client";

import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";
import { defaults as defaultControls } from "ol/control";
import { X } from "lucide-react";

export interface MapShopProps {
  name: string;
  coordinates: [number, number];
}

interface MapShopComponentProps {
  markersDynamic?: MapShopProps[];
}

const markersDefault = [
  { name: "China", coordinates: [104.195397, 35.86166] },
  { name: "South Korea", coordinates: [127.766922, 35.907757] },
  { name: "Vietnam", coordinates: [108.277199, 14.058324] },
  { name: "Thailand", coordinates: [100.992541, 15.870032] },
  { name: "Indonesia", coordinates: [113.921327, -0.789275] },
  { name: "Philippines", coordinates: [121.774017, 12.879721] },
  { name: "Malaysia", coordinates: [101.975766, 4.210484] },
  { name: "Colombia", coordinates: [-74.297333, 4.570868] },
  { name: "France", coordinates: [2.213749, 46.227638] },
];

const MapShop = ({ markersDynamic }: MapShopComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [popupCoord, setPopupCoord] = useState<[number, number] | null>(null);

  const markers = markersDynamic || markersDefault;

  useEffect(() => {
    if (!mapRef.current || map) return;

    const features = markers.map((marker) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(marker.coordinates)),
        name: marker.name,
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            src: "/map/marker-icon.png",
            scale: 1,
            anchor: [0.5, 1],
          }),
        })
      );

      return feature;
    });

    const vectorSource = new VectorSource({ features });
    const vectorLayer = new VectorLayer({ source: vectorSource, zIndex: 10 });

    const osmLayer = new TileLayer({
      source: new OSM(),
      visible: true,
      zIndex: 0,
    });

    const satelliteLayer = new TileLayer({
      source: new XYZ({
        url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      }),
      visible: false,
      zIndex: 0,
    });

    const reliefLayer = new TileLayer({
      source: new XYZ({
        url: "https://tile.opentopomap.org/{z}/{x}/{y}.png",
      }),
      visible: false,
      zIndex: 0,
    });

    const newMap = new Map({
      target: mapRef.current,
      layers: [osmLayer, satelliteLayer, reliefLayer, vectorLayer],
      controls: defaultControls({ zoom: false, rotate: false }).extend([]),
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 3,
        minZoom: 2,
        maxZoom: 20,
      }),
    });

    newMap.on("click", (e: any) => {
      const feature = newMap.forEachFeatureAtPixel(e.pixel, (f: any) => f);
      if (feature && feature.get("name")) {
        setSelectedName(feature.get("name"));
        setPopupCoord([e.coordinate[0], e.coordinate[1]]);
      } else {
        setSelectedName(null);
        setPopupCoord(null);
      }
    });

    setMap(newMap);

    return () => {
      newMap.setTarget(undefined);
    };
  }, []);

  return (
    <div className="relative space-y-4 p-4">
      {/* Radio group for filtering */}
      <div className="flex flex-wrap gap-3 items-center">
        {[
          { name: "All", value: null },
          ...markers.map((marker) => ({
            name: marker.name,
            value: marker.name,
          })),
        ].map((option) => (
          <label
            key={option.name}
            className={`relative cursor-pointer rounded-full px-4 py-2 border text-sm font-medium transition-all
        ${
          selectedName === option.value
            ? "bg-primary text-white border-primary shadow"
            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
        }
      `}
          >
            <input
              type="radio"
              name="marker-filter"
              value={option.name}
              checked={selectedName === option.value}
              onChange={() => {
                setSelectedName(option.value);
                if (option.value === null) {
                  setPopupCoord(null);
                  if (map) {
                    const extent = new VectorSource({
                      features: markers.map(
                        (marker) =>
                          new Feature({
                            geometry: new Point(fromLonLat(marker.coordinates)),
                          })
                      ),
                    }).getExtent();
                    map.getView().fit(extent, { padding: [50, 50, 50, 50] });
                  }
                } else {
                  const marker = markers.find((m) => m.name === option.value);
                  if (marker && map) {
                    const coord = fromLonLat(marker.coordinates);
                    setPopupCoord(coord as [number, number]);
                    map.getView().animate({ center: coord, zoom: 6 });
                  }
                }
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {option.name}
          </label>
        ))}
      </div>

      {/* Zoom buttons */}
      <div className="absolute right-6 top-32 z-1 bg-white rounded-md flex flex-col shadow">
        <button
          className="p-2 border-b border-gray-200 hover:bg-gray-50"
          onClick={() =>
            map?.getView().setZoom((map?.getView().getZoom() || 0) + 1)
          }
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v12m6-6H6"
            />
          </svg>
        </button>
        <button
          className="p-2 hover:bg-gray-50"
          onClick={() =>
            map?.getView().setZoom((map?.getView().getZoom() || 0) - 1)
          }
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
      </div>

      {/* Map container */}
      <div
        ref={mapRef}
        className="rounded-lg border border-gray-200 shadow-sm"
        style={{ height: 300, width: "100%" }}
      />

      {/* Popup when marker is clicked */}
      {popupCoord && selectedName && (
        <div
          className="absolute z-50 bg-white rounded-md shadow-lg p-3 transform -translate-x-1/2"
          style={{
            left: "50%",
            bottom: "60px",
            minWidth: "120px",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="font-medium text-gray-800">{selectedName}</div>
            <button
              onClick={() => setPopupCoord(null)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapShop;
