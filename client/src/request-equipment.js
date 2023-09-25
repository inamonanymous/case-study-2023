import { useParams } from 'react-router-dom';

function RequestEquipment() {
  // Get the unique_key parameter from the URL
  const { equip_id } = useParams();

  return (
    <h1>{equip_id}</h1>
    )
}

export default RequestEquipment;
