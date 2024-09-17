import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

/**
 * ParticipantMap Component
 *
 * This component renders an interactive map using the Leaflet library.
 * The map displays markers representing various partner locations passed
 * via the `partnerInfo` prop. Each marker has a popup showing relevant information.
 *
 * @component
 * @param {Object[]} partnerInfo - Array of partner information, where each partner has a position and caption.
 * @param {Object} partnerInfo[].position - Array representing latitude and longitude [lat, lng].
 * @param {string} partnerInfo[].caption - Text to display in the popup for each partner.
 * @returns {JSX.Element} An interactive map with partner locations marked.
 */

const ParticipantMap =({partnerInfo})=>{
  return (
    <>
    <MapContainer 
      center={[51.505, -0.09]} 
      zoom={1.3} 
      scrollWheelZoom={false} 
      style={{ height: '50vh', width: '80vh' }}
    >

      {/* TileLayer is the base map layer, using tiles from OpenStreetMap */}  
      <TileLayer
      noWrap={true}
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {/* Iterate over the partnerInfo array to render markers for each partner location */}
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