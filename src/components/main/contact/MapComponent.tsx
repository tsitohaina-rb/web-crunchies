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
import { useTranslations } from "next-intl";

// French overseas territories
const markers = [
  { name: "Malaysia", coordinates: [101.9, 4.2] },
  { name: "Thailand", coordinates: [100.9, 15.8] },
];

const MapComponent = () => {
  const t = useTranslations('components.main.contact.MapComponent');
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [popupCoord, setPopupCoord] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!mapRef.current || map) return;

    // Create marker features
    const features = markers.map((marker) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(marker.coordinates)),
        name: marker.name,
      });

      // Use red pin marker style matching the image
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
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 10, // Ensure markers appear above map tiles
    });

    // Base layers matching the image style
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
        attributions: "Map data: © Geopolynesie",
      }),
      visible: false,
      zIndex: 0,
    });

    // Create and set up the map
    const newMap = new Map({
      target: mapRef.current,
      layers: [osmLayer, satelliteLayer, reliefLayer, vectorLayer],
      controls: defaultControls({ zoom: false, rotate: false }).extend([]),
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
        minZoom: 2,
        maxZoom: 18,
      }),
    });

    // Handle popup on click
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

  // Layer switching handler
  const handleLayerChange = (layerName: string) => {
    if (!map) return;

    // Get all base layers (excluding vector layer)
    const layers = map.getLayers().getArray();
    const osmLayer = layers[0] as TileLayer<OSM>;
    const satelliteLayer = layers[1] as TileLayer<XYZ>;
    const reliefLayer = layers[2] as TileLayer<XYZ>;

    // Hide all base layers first
    osmLayer.setVisible(false);
    satelliteLayer.setVisible(false);
    reliefLayer.setVisible(false);

    // Show the selected layer
    if (layerName === "Plan") osmLayer.setVisible(true);
    if (layerName === "Satellite") satelliteLayer.setVisible(true);
    if (layerName === "Relief") reliefLayer.setVisible(true);
  };

  return (
    <div className="relative">
      {/* Map controls matching the image layout */}
      <div className="absolute top-2 left-2 z-1 bg-white rounded-md p-1 flex">
        <button
          onClick={() => handleLayerChange("Plan")}
          className="px-3 py-1 text-sm rounded-sm mr-1 focus:outline-none cursor-pointer"
          style={{
            backgroundColor: map?.getLayers().getArray()[0].getVisible()
              ? "#e6e6e6"
              : "transparent",
          }}
        >
          {t('text1')}
        </button>
        <button
          onClick={() => handleLayerChange("Satellite")}
          className="px-3 py-1 text-sm rounded-sm mr-1 focus:outline-none cursor-pointer"
          style={{
            backgroundColor: map?.getLayers().getArray()[1].getVisible()
              ? "#e6e6e6"
              : "transparent",
          }}
        >
          {t('text2')}
        </button>
        <button
          onClick={() => handleLayerChange("Relief")}
          className="px-3 py-1 text-sm rounded-sm focus:outline-none cursor-pointer"
          style={{
            backgroundColor: map?.getLayers().getArray()[2].getVisible()
              ? "#e6e6e6"
              : "transparent",
          }}
        >
          {t('text3')}
        </button>
      </div>

      {/* Zoom controls matching the image */}
      <div className="absolute right-2 top-20 z-1 bg-white rounded-md flex flex-col">
        <button
          className="p-2 focus:outline-none border-b border-gray-200 cursor-pointer"
          onClick={() =>
            map?.getView().setZoom((map?.getView().getZoom() || 0) + 1)
          }
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
        <button
          className="p-2 focus:outline-none cursor-pointer"
          onClick={() =>
            map?.getView().setZoom((map?.getView().getZoom() || 0) - 1)
          }
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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
        className="rounded-lg"
        style={{ height: 500, width: "100%" }}
      ></div>

      {/* Popup for marker when clicked */}
      {popupCoord && selectedName && (
        <div
          className="absolute z-50 bg-white rounded-md shadow-lg p-3 transform -translate-x-1/2"
          style={{
            left: "50%",
            bottom: "60px",
            minWidth: "100px",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="font-medium text-gray-800">{selectedName}</div>
            <button
              onClick={() => setPopupCoord(null)}
              className="ml-4 text-red-500 hover:text-red-700 cursor-pointer"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
