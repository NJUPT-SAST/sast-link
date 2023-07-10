"use client";

import { useAppSelector } from "@/redux";

const Home = () => {
  const userProfile = useAppSelector((state) => state.currentUserProfile);
  return <>{userProfile.username}, You have logged!
  </>;
};

export default Home;
