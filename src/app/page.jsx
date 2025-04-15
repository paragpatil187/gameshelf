"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { setUser } from "@/redux/features/authSlice";
import { fetchGames } from "@/redux/features/gamesSlice";
import GameStoreApp from "@/components/GameStoreApp";

export default function Home() {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  // Set user in Redux store when session changes
  useEffect(() => {
    if (session?.user) {
      dispatch(setUser(session.user));
    }
  }, [session, dispatch]);

  // Fetch games when component mounts
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  return <GameStoreApp />;
}
