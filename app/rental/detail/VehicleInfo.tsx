import {
  DashboardOutlined,
  TeamOutlined,
  CarryOutOutlined,
  FireOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const CarDetailInfo = ({ details }: { details: any }) => {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center">
        <DashboardOutlined className="mr-4 text-lg" />
        <span>{details.transmission}</span>
      </div>
      <div className="flex items-center">
        <TeamOutlined className="mr-4 text-lg" />
        <span>{details.seats} chỗ ngồi</span>
      </div>
      <div className="flex items-center">
        <CarryOutOutlined className="mr-4 text-lg" />
        <span>{details.baggage_capacity} hành lý</span>
      </div>
      <div className="flex items-center">
        <FireOutlined className="mr-4 text-lg" />
        <span>{details.fuel}</span>
      </div>
    </div>
  );
};

const MotorDetailInfo = ({ details }: { details: any }) => {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center">
        <ThunderboltOutlined className="mr-4 text-lg" />
        <span>{details.engine} phân khối</span>
      </div>
      <div className="flex items-center">
        <FireOutlined className="mr-4 text-lg" />
        <span>{details.fuel}</span>
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
