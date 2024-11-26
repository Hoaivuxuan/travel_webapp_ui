import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faGasPump,
  faSuitcase,
  faUserFriends,
  faMotorcycle,
} from "@fortawesome/free-solid-svg-icons";

const CarDetailInfo = ({ details }: { details: any }) => {
  return (
    <div className="px-2 space-y-2">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faUserFriends} className="mr-4 w-4" />
        <span>{details.seats} chỗ ngồi</span>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faCar} className="mr-4 w-4" />
        <span>{details.transmission}</span>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faSuitcase} className="mr-4 w-4" />
        <span>{details.baggage_capacity} hành lý</span>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faGasPump} className="mr-4 w-4" />
        <span>{details.fuel_type}</span>
      </div>
    </div>
  );
};

const MotorDetailInfo = ({ details }: { details: any }) => {
  return (
    <div className="px-2 space-y-2">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faMotorcycle} className="mr-4 w-4" />
        <span>{details.engine} phân khối</span>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faGasPump} className="mr-4 w-4" />
        <span>{details.fuel_type}</span>
      </div>
    </div>
  );
};

const VehicleInfo = ({
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

export default VehicleInfo;
