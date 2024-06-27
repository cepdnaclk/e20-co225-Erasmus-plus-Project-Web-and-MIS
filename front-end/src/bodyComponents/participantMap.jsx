import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


const ParticipantMap =({partnerInfo})=>{
return (
<>
<MapContainer center={[51.505, -0.09]} zoom={1.3} scrollWheelZoom={false} style={{ height: '50vh', width: '80vh' }}>
<TileLayer
  noWrap={true}
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

{partnerInfo.map((partners, index) => (
  
    <Marker position={partners.position}>
      <Popup>
           {partners.caption}
      </Popup>
    </Marker>
  ))} 


</MapContainer>
</>
)
}

export default ParticipantMap;