import { useEffect, useState } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePLaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
        setIsFetching(false);
      }

      // setIsFetching(false); //should stay outside the try/catch block bcos I wanna end this loading state no matter if I get an error or not...
    };

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePLaces}
      isLoading={isFetching}
      loadingText="Fetching places data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
