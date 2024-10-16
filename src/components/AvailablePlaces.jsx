import { useEffect, useState } from "react";

import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePLaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setAvailablePlaces(resData.places);
        console.log(resData);
      });
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePLaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
