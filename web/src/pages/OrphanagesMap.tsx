import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mapMarkerImg from "../images/map-marker.svg";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import "../styles/pages/orphanages-map.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  MapConsumer,
  Popup,
} from "react-leaflet";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Orphanage {
  name: string;
  id: number;
  latitude: number;
  longitude: number;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("/orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="happy-marker" />
          <h2>Escolha um orfanato no mapa.</h2>
          <p>Muitas crianças estão esperando sua visita :)</p>
        </header>
        <footer>
          <strong>Juiz de Fora</strong>
          <span>Santa Catarina</span>
        </footer>
      </aside>

      <MapContainer
        style={{ width: "100%", height: "100%" }}
        center={[-21.7481216, -43.3717248]}
        zoom={15}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {orphanages.map((orphanage) => {
          const { id, latitude, longitude, name } = orphanage;

          return (
            <Marker key={id} position={[latitude, longitude]} icon={mapIcon}>
              <Popup
                className="map-popup"
                closeButton={false}
                minWidth={240}
                maxWidth={240}
              >
                <Link to={`/orphanages/${id}`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
                {name}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
