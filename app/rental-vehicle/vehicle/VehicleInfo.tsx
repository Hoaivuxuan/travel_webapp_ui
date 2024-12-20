import { FaCar, FaMotorcycle, FaUsers, FaLuggageCart, FaGasPump } from 'react-icons/fa';

interface VehicleDetailsProps {
  details: Record<string, any>;
}

const CarDetailInfo = ({ details }: VehicleDetailsProps) => (
  <InfoGrid
    items={[
      { icon: <FaCar className="mr-4 text-sm" />, text: details.transmission },
      { icon: <FaUsers className="mr-4 text-sm" />, text: `${details.seats} chỗ ngồi` },
      { icon: <FaLuggageCart className="mr-4 text-sm" />, text: `${details.baggage_capacity} hành lý` },
      { icon: <FaGasPump className="mr-4 text-sm" />, text: details.fuel },
    ]}
  />
);

const MotorDetailInfo = ({ details }: VehicleDetailsProps) => (
  <InfoGrid
    items={[
      { icon: <FaMotorcycle className="mr-4 text-sm" />, text: `${details.engine} phân khối` },
      { icon: <FaGasPump className="mr-4 text-sm" />, text: details.fuel },
    ]}
  />
);

interface InfoGridProps {
  items: { icon: JSX.Element; text: string }[];
}

const InfoGrid = ({ items }: InfoGridProps) => (
  <div className="text-sm space-y-2">
    {items.map((item, index) => (
      <div className="pl-2 flex items-center" key={index}>
        {item.icon}
        <span>{item.text}</span>
      </div>
    ))}
  </div>
);

interface VehicleDetailInfoProps {
  type: 'car' | 'motor';
  details: Record<string, any>;
}

const VehicleDetailInfo = ({ type, details }: VehicleDetailInfoProps) => {
  const componentMap: Record<string, JSX.Element> = {
    car: <CarDetailInfo details={details} />,
    motor: <MotorDetailInfo details={details} />,
  };

  return componentMap[type] || null;
};

export default VehicleDetailInfo;
