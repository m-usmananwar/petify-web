import appBgImg from "/assets/bg-squirrel.jpg";
import usePaginatedAuctions from "../hooks/usePaginatedAuctions";
import AuctionList from "../components/AuctionList";

const Landing = () => {
  const { auctions, nextPageUrl, loadMore, updateFilters, filters } =
    usePaginatedAuctions();

  return (
    <div>
      <img
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        alt="fixed-bg"
        src={appBgImg}
      />
      <h1 className="font-bold text-3xl my-2 ml-36 font-noto text-white">Latest Auctions</h1>
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

export default Landing;
