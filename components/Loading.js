export default function Loading() {

    return (
        <div className="w-full h-[80vh] flex items-center justify-center bg-white">
            <div className="relative flex items-center justify-center w-[320px] h-[320px]">
                <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>
                <p className="text-text-dark text-[22px] font-semibold">Loading...</p>
                <div className="absolute inset-0 rounded-full border-4 border-white border-t-custom-blue border-b-custom-blue animate-spin-smooth"></div>
            </div>
        </div>
    )

}
