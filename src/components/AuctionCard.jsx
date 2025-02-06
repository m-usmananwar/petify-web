const AuctionCard = ({ auction }) => {
  const { id, name, tagline, age, color, expiryTime, medias, initialPrice } =
    auction;

  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden sm:max-w-[350px] w-full">
      <div className="relative h-48 overflow-hidden">
        <img
          src={medias[0]?.url || "/placeholder-animal.jpg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <span className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-slate-700 backdrop-blur-sm">
          {tagline}
        </span>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900 sm:text-lg">
            {name}
          </h3>
          <span className="bg-amber-100 text-amber-800 text-sm font-medium px-2.5 py-0.5 rounded">
            {age} years
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
            <span className="text-gray-600">{color}</span>
          </div>

          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-gray-600">
              {new Date(expiryTime).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div>
            <p className="text-xs text-gray-500">Starting Price</p>
            <p className="text-lg font-bold text-indigo-600">
              ${parseFloat(initialPrice).toFixed(2)}
            </p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95">
            Place Bid
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default AuctionCard;
