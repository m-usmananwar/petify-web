import { useParams } from "react-router-dom";
import useFetchSingleAuction from "../hooks/useFetchSingleAuction.jsx";

const AuctionDetail = () => {
  const { id } = useParams();
  const { auction } = useFetchSingleAuction(id);

  if (!auction) return <p className="text-center mt-10">Loading...</p>;

  const {
    age,
    color,
    description,
    expiryTime,
    name,
    tagline,
    is_own,
    type,
    medias,
    owner,
  } = auction;

  const { fullName, email, imageUrl } = owner;

  return (
    <div className="container mx-auto p-6 bg-custom-gray">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-2/3 space-y-6">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={medias[0].url}
              alt={name}
              className="w-full object-cover"
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-2">{name}</h2>
            <p className="text-lg text-gray-500 italic mb-4">{tagline}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <span className="font-semibold">Age:</span> {age}
                </p>
                <p>
                  <span className="font-semibold">Color:</span> {color}
                </p>
                <p>
                  <span className="font-semibold">Type:</span> {type}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Expiry Time:</span>{" "}
                  {expiryTime}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-700">{description}</p>
            </div>
          </div>
          <div className="bg-white flex items-center p-6 rounded-lg shadow-md">
            <img
              src={imageUrl}
              alt={fullName}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="text-xl font-bold">{fullName}</h3>
              <p className="text-gray-600">{email}</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/3 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Bids</h3>
            <p className="text-gray-600">Coming soon</p>
          </div>
          {!is_own && (
            <button className="w-full cursor-pointer bg-amber-600 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-amber-700 transition">
              Bid Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
