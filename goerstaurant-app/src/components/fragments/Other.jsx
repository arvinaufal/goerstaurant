export const LoadingSpinner = () => (
    <div className="flex flex-col justify-center items-center content-center h-full gap-20">
        <span className="loading loading-spinner text-red-800  w-36"></span>
        <div className="flex justify-center items-center content-center">
            <span>Mohon tunggu...</span>
        </div>
    </div>
);

export const NoDataAvailable = () => (
    <div className="flex flex-col justify-center items-center h-full">
        <img src={"/public/images/no-data.png"} alt="Data illustrations by Storyset" style={{ width: 400 }} />
        <span className="text-gray-500 italic">No data available</span>
    </div>
);