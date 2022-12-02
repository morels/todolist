import { useState, useEffect, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { useAuth } from "context/auth";
import { allowedPaths } from "../../../config";

const RouteGuard = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const { currentUser } = useAuth();

  const authCheck = (url:string) => {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split("?")[0];
    if (!currentUser && !allowedPaths.includes(path)) {
      console.log("currentUser", currentUser)
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  };

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    console.log("currentUser>", currentUser)
    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      {authorized && children}
      ;
    </>
  );
};

export { RouteGuard };
