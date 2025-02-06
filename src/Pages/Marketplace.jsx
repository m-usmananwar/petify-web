import AuctionList from "../components/AuctionList.jsx";
import usePaginatedAuctions from "../hooks/usePaginatedAuctions.jsx";

const Marketplace = () => {
  const { auctions, nextPageUrl, loadMore, filters } = usePaginatedAuctions();

  return (
    <div className="bg-custom-gray">
      <h1 className="font-bold text-3xl my-2 ml-36 font-noto text-white">
        Auctions
      </h1>
      {auctions && <AuctionList auctions={auctions} />}
      <div className="text-center mb-2">
        {nextPageUrl && (
          <button
            onClick={loadMore}
            className=" cursor-pointer bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-4 py-2 rounded-sm font-medium transition-all duration-200 active:scale-95"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
