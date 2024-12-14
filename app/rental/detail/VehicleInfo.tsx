import { FaCar, FaMotorcycle, FaUsers, FaLuggageCart, FaGasPump } from 'react-icons/fa';

const CarDetailInfo = ({ details }: { details: any }) => {
  return (
    <div className="text-sm grid grid-cols-2 gap-1">
      <div className="flex items-center">
        <FaCar className="mr-4 text-lg" />
        <span>{details.transmission}</span>
      </div>
      <div className="flex items-center">
        <FaUsers className="mr-4 text-lg" />
        <span>{details.seats} chỗ ngồi</span>
      </div>
      <div className="flex items-center">
        <FaLuggageCart className="mr-4 text-lg" />
        <span>{details.baggage_capacity} hành lý</span>
      </div>
      <div className="flex items-center">
        <FaGasPump className="mr-4 text-lg" />
        <span>{details.fuel}</span>
      </div>
    </div>
  );
};

const MotorDetailInfo = ({ details }: { details: any }) => {
  return (
    <div className="text-sm grid grid-cols-2 gap-1">
      <div className="flex items-center">
        <FaMotorcycle className="mr-4 text-lg" />
        <span>{details.engine} phân khối</span>
      </div>
      <div className="flex items-center">
        <FaGasPump className="mr-4 text-lg" />
        <span>{details.fuel}</span>
      </div>
    </div>
  );
};

const VehicleDetailInfo = ({
  type,
  details,
}: {
  type: string;
  details: any;
}) => {
  if (type === "car") {
    return <CarDetailInfo details={details} />;
  } else if (type === "motor") {
    return <MotorDetailInfo details={details} />;
  } else {
    return null;
  }
};

export default VehicleDetailInfo;
