"use client";
"use client";
import SearchForm from "@/components/home/SearchForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

export default function Search({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    if (params) {
      fetchDestinationDetails(params);
    }
  }, [params]);

  const fetchDestinationDetails = async (params: any) => {
    try {
      console.log("check params:", params);
    } catch (error) {
      console.error("Failed to fetch destination details:", error);
    }
  };

  const defaultProps = {
    center: {
      lat: 21.028511,
      lng: 105.804817,
    },
    zoom: 11,
  };

  return (
    <main className="bg-white">
      <section className="py-4 px-2 m-4 mt-0 mb-14 lg:px-4">
        <SearchForm />
      </section>
      <section className="max-w-7xl lg:mx-auto">
        Trang chủ {">"} Việt Nam {">"} Khu vực TP {">"} TP {">"} Kết quả tìm
        kiếm
      </section>
      <section className="py-4 rounded-lg max-w-7xl lg:mx-auto">
        <div style={{ height: "20vh", width: "30%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </section>
    </main>
  );
}
