
function DetailSkeleton() {
    return (
        <div className="bg-[#00050D] h-auto min-h-screen w-screen flex justify-start items-start text-white pt-[100px]">
            <div className="w-[70%] h-auto flex flex-col justify-center px-[50px] gap-3 pt-[100px] mb-[500px]">
                <div className="h-12 bg-gray-700 rounded-md mb-6"></div>
                <div className="h-8 bg-gray-700 rounded-md mb-4"></div>
                <div className="h-8 bg-gray-700 rounded-md mb-4"></div>
                <div className="flex gap-4">
                    <div className="h-6 bg-gray-700 rounded-md w-20"></div>
                    <div className="h-6 bg-gray-700 rounded-md w-16"></div>
                    <div className="h-6 bg-gray-700 rounded-md w-12"></div>
                </div>
                <div className="h-8 bg-gray-700 rounded-md mt-6 w-1/2"></div>
                <div className="flex gap-4 mt-8">
                    <div className="h-12 bg-gray-700 rounded-md w-40"></div>
                    <div className="h-12 bg-gray-700 rounded-md w-40"></div>
                </div>
            </div>
            <div className="w-[40%] h-screen flex justify-end items-center absolute z-0 right-0">
                <div className="h-full w-full bg-gray-800 fade-overlay"></div>
            </div>
        </div>
    )
}

export default DetailSkeleton