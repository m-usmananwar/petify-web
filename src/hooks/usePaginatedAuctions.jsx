import { useEffect, useState } from "react";
import apiClient from "../helpers/apiClient";

const usePaginatedAuctions = (initialFilters = {}) => {
  const [auctions, setAuctions] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    (async () => {
      const { auctionsData, next_page_url } = await fetchPaginatedAuctions(
        "/auctions",
        filters
      );
      setAuctions(auctionsData);
      setNextPageUrl(next_page_url);
    })();
  }, [filters]);

  const fetchPaginatedAuctions = async (url = "/auctions", filters = {}) => {
    const response = await apiClient.get(url, { params: filters });

    const { data: auctionsData, next_page_url } = response.data;

    return { auctionsData, next_page_url };
  };

  const loadMore = async () => {
    if (!nextPageUrl) return;

    const { auctionsData, next_page_url } = await fetchPaginatedAuctions(
      nextPageUrl,
      filters
    );

    setAuctions((prevState) => {
      return [...prevState, ...auctionsData];
    });

    setNextPageUrl(next_page_url);
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return { auctions, nextPageUrl, loadMore, updateFilters, filters };
};

export default usePaginatedAuctions;
