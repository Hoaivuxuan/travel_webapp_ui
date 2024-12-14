import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[#472f91] animate-pulse">
          Đang tải dữ liệu...
        </h1>
        <p className="text-gray-500 mt-2">Vui lòng chờ trong giây lát</p>
      </div>

      <div className="relative flex items-center justify-center mb-10">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#472f91]"></div>
        <div className="absolute w-10 h-10 bg-[#472f91] rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl w-full">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="w-full h-36 rounded-lg bg-gray-200" />
            <Skeleton className="w-3/4 h-4 rounded bg-gray-200" />
            <Skeleton className="w-1/2 h-4 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Loading;
