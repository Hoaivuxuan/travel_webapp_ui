"use client";
import SearchForm from "@/components/home/SearchForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

export default function Search({ params }: { params: { id: string } }) {
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
      <div className='bg-[#013B94] py-2'>
        <section className='bg-[#013B94] grid grid-cols-2 gap-2 p-6 mx-auto h-[300px] max-w-7xl'>
          <div className='col-span-1'>
            <h2 className='text-4xl font-bold text-white'>Địa điểm tham quan, hoạt động và trải nghiệm</h2>
            <h3 className='py-5 text-sm text-white'>
              Khám phá các hoạt động và địa điểm tham quan mới theo sở thích và gu du lịch của bạn
            </h3>
          </div>
        </section>
      </div>
      <div className="py-4 rounded-lg max-w-7xl lg:mx-auto">
        <div className="h-[25vh]">
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
      </div>
    </main>
  );
}