import SearchForm from "@/components/SearchForm";
import { destination } from "@/data/fakeData";

export default function Home() {
  const trendingDestinations = destination.slice(0, 5);

  return (
    <main className="bg-white">
      <div className="bg-[#013B94] py-2">
        <section className="bg-[#013B94] p-6 mx-auto h-[300px] max-w-7xl">
          <h2 className="text-5xl font-bold text-white">
            Tìm Kiếm Chỗ Ở Tiếp Theo
          </h2>
          <h3 className="py-5 text-xl text-white">
            Tìm giá thấp trên khách sạn, nhà và nhiều hơn nữa...
          </h3>
        </section>
      </div>

      <section className="py-4 px-2 m-4 mt-0 -mb-14 lg:px-4">
        <SearchForm />
      </section>

      <section className="p-6 mx-auto mt-10 bg-white rounded-t-lg max-w-7xl">
        <div className="pt-5">
          <h3 className="text-xl font-bold">Điểm Đến Đang Thịnh Hành</h3>
          <p className="font-light">
            Du khách tìm kiếm về Việt Nam cũng đặt chỗ ở những nơi này
          </p>
        </div>

        <div className="py-5 grid grid-cols-5 gap-4">
          {trendingDestinations.map((item) => (
            <div key={item.id} className="cursor-pointer">
              <img
                key={item.id}
                className="object-cover rounded-lg w-full h-72"
                src={item.src}
                alt=""
              />
              <div className="pt-3">
                <p className="font-bold">{item.title}</p>
                <p className="">{item.location}</p>
                <p className="text-sm font-light">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-5">
          <h3 className="text-xl font-bold">Khám Phá Việt Nam</h3>
          <p className="font-light">
            Các điểm đến phổ biến này có nhiều điều chờ đón bạn
          </p>
        </div>

        <div className="flex py-5 space-x-4 overflow-x-scroll">
          {destination.map((item) => (
            <div key={item.id} className="space-y-1 cursor-pointer shrink-0">
              <img
                key={item.id}
                className="object-cover rounded-lg w-80 h-72"
                src={item.src}
                alt=""
              />
              <div className="pt-3">
                <p className="font-bold">{item.title}</p>
                <p className="">{item.location}</p>
                <p className="text-sm font-light">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
