import React from "react";

const BidCard = ({ bid }) => {
  const { amount, bidder, created_at } = bid;
  const { first_name, last_name, image } = bidder;

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={image}
        alt={first_name}
        className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
      />
      <div>
        <p className="text-lg font-semibold text-gray-800">{`${first_name} ${last_name}`}</p>
        <p className="text-sm text-gray-600">
          Bid: <span className="text-indigo-600 font-bold">${amount}</span>
        </p>
        <p className="text-sm text-gray-600">
          Placed at:
          <span className="text-indigo-600 font-bold ml-1">{created_at}</span>
        </p>
      </div>
    </div>
  );
};

export default BidCard;
