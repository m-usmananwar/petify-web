import { useEffect, useState } from "react";
import apiClient from "../helpers/apiClient";

const useFetchSingleAuction = (id) => {
  const [auction, setAuction] = useState(null);

  useEffect(() => {
    fetchAuction(id);
  }, []);

  const fetchAuction = async (id) => {
    const response = await apiClient.get(`auctions/${id}`);
    setAuction(response.data);
  };

  return { auction };
};

export default useFetchSingleAuction;
