"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface UserData {
  authed: boolean;
  signedIn: boolean;
  userId: string | null;
  email: string | null;
  actorKey: string | null;
  guestName: string | null;
  displayName: string | null;
  hasPassword?: boolean;
  referralCount?: number;
  guest: { id: string; createdAt: string } | null;
  /** true once the /api/me fetch has settled (success or failure) */
  loaded: boolean;
}

const defaultUser: UserData = {
  authed: false, signedIn: false, userId: null, email: null,
  actorKey: null, guestName: null, displayName: null,
  referralCount: 0, guest: null, loaded: false,
};

const UserContext = createContext<UserData>(defaultUser);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData>(defaultUser);
  useEffect(() => {
    fetch("/api/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setUser({ ...data, loaded: true }))
      .catch(() => setUser({ ...defaultUser, loaded: true }));
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser(): UserData {
  return useContext(UserContext);
}
