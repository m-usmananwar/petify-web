import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchSingleAuction from "../hooks/useFetchSingleAuction.jsx";
import { BIDDABLE_TYPES } from "../utils/constant.jsx";
import apiClient from "../helpers/apiClient.jsx";
import BidCard from "../components/BidCard.jsx";
import Pusher from "pusher-js";
import {
  API_BASE_URL,
  PUSHER_APP_KEY,
  PUSHER_CHANNEL,
  PUSHER_CLUSTER,
} from "../utils/config.js";

const AuctionDetail = () => {
  const { id } = useParams();
  const { auction } = useFetchSingleAuction(id);
  const [bids, setBids] = useState([]);
  const [minimumBidAmount, setMinimumBidAmount] = useState(null);
  const [pusher, setPusher] = useState(null);
  const [pusherChannel, setPusherChannel] = useState(null);
  const [pusherChannelName, setPusherChannelName] = useState(null);
  const [bidError, setBidError] = useState(null);

  const bidRef = useRef(null);

  if (!pusher) {
    const pusherAuth = new Pusher(PUSHER_APP_KEY, {
      cluster: PUSHER_CLUSTER,
      channelAuthorization: {
        endpoint: `${API_BASE_URL}/authenticate-pusher`,
        transport: "ajax",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    });
    setPusher(pusherAuth);
  }

  useEffect(() => {
    fetchInitialBids(id);
    subscribeChannel();

    return () => unSubscribeChannel();
  }, [id]);

  useEffect(() => {
    if (auction && !bids.length) {
      setMinimumBidAmount(auction.initialPrice);
    }
  }, [auction]);

  const fetchInitialBids = async (auctionId) => {
    try {
      const params = {
        biddableType: BIDDABLE_TYPES.Auction,
        biddableId: auctionId,
      };
      const response = await apiClient.get("/bids", { params });
      if (response?.data?.length) {
        setBids(response.data);
        setMinimumBidAmount(response?.data[0]?.amount);
      }
    } catch (error) {
      //Todo handle errors gracefully
    }
  };

  const subscribeChannel = () => {
    if (pusher) {
      let channelName = `private-bid.${BIDDABLE_TYPES.Auction}.${id}`;
      setPusherChannelName(channelName);
      const channelPusher = pusher.subscribe(channelName);
      setPusherChannel(channelPusher);

      channelPusher.bind("pusher:subscription_error", function (status) {
        console.log("Subscription Error:", status);
      });

      channelPusher.bind(`${PUSHER_CHANNEL}`, (data) => {
        try {
          setBids((prevState) => {
            return [data.bid, ...prevState];
          });
          setMinimumBidAmount(data.bid.amount);
        } catch (error) {
          console.error("Error handling event:", error);
        }
      });
    }
  };

  const unSubscribeChannel = () => {
    if (pusherChannel) {
      pusherChannel.unbind();
      pusher.unsubscribe(pusherChannelName);
    }
  };

  if (!auction) return <p className="text-center mt-10">Loading...</p>;

  const placeBidSubmit = async (e) => {
    e.preventDefault();
    const bidAmount = bidRef.current.value;
    if (!bidAmount) {
      setBidError("Please enter right value");
      return;
    }

    const minimumAmount = parseInt(minimumBidAmount) + 1;
    if (bidAmount < minimumAmount) {
      setBidError(`The minimum bidding amount is ${minimumAmount}`);
      bidRef.current.value = minimumAmount;
      return;
    }

    try {
      const data = {
        biddableType: BIDDABLE_TYPES.Auction,
        biddableId: auction?.id,
        amount: bidAmount,
      };
      const response = await apiClient.post("/bids", data);
    } catch (error) {
      //Todo handle errors gracefully
    } finally {
      bidRef.current.value = null;
      if (bidError) setBidError(null);
    }
  };

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
            {bids.length === 0 ? (
              <p className="font-noto font-lg">No bids</p>
            ) : (
              <div className="flex flex-col space-y-2">
                {bids.map((b) => (
                  <BidCard key={`${b.amount}-${b.id}`} bid={b} />
                ))}
              </div>
            )}
          </div>
          {!is_own && (
            <>
              <form onSubmit={placeBidSubmit} className="flex space-x-2 ">
                <input
                  ref={bidRef}
                  type="number"
                  className="px-4 py-2 border-amber-500 bg-white rounded-md"
                />
                <button className="w-full cursor-pointer bg-amber-600 text-white py-3 px-4 rounded-lg shadow-lg hover:bg-amber-700 transition">
                  Bid Now
                </button>
              </form>

              {bidError && <p className="text-red-500">{bidError}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
