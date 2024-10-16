import React from "react";

export const fetchAvailablePlaces = async () => {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places!");
  }

  return resData.places;
};

export const fetchUserPlaces = async () => {
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch user places!");
  }

  return resData.places;
};

export const updateUserPlaces = async (places) => {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places: places }), //converts the places array into a JSON format to be sent to the backend...
    headers: {
      "Content-Type": "application/json", // this is a meta-data attached to the request - this informs the backend that the data attached to this request will be in JSON format. It's required to ensure that the data is extracted successfully on the backend...
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data");
  }

  return resData.message;
};