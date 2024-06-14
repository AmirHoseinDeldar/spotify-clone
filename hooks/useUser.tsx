import { SupabaseClient, User } from "@supabase/auth-helpers-nextjs";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { UserDetails, Subscription } from "@/types";
import { useState, createContext, useEffect, useContext } from "react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingDate, setIsLoadingDate] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from("users").select("*").single();
  const getSubscription = () =>
    supabase
      .from("Subscriptions")
      .select("* , prices(*,products(*))")
      .in("status", ["trialing", "active"])
      .single();

  useEffect(() => {
    if (user && !isLoadingDate && !userDetails && !subscription) {
      setIsLoadingDate(true);
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        ([userDetailsPromise, subscriptionPromise]) => {
          if (userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value?.data as UserDetails);
          } else {
            console.error(userDetailsPromise.reason);
          }
          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value?.data as Subscription);
          } else {
            console.error(subscriptionPromise.reason);
          }
          setIsLoadingDate(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingDate) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingDate,
    subscription,
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser bayad bashe ba MyUserProvider");
  }
  return context;
};
