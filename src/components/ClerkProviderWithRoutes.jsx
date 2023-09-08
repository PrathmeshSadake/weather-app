import {
  ClerkProvider,
  RedirectToSignIn,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import Navbar from "./Navbar";

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
    >
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/sign-in/*'
          element={<SignIn routing='path' path='/sign-in' />}
        />
        <Route
          path='/sign-up/*'
          element={<SignUp routing='path' path='/sign-up' />}
        />
        <Route
          path='/favorites'
          element={
            <>
              <SignedIn>
                <Favorites />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

export default ClerkProviderWithRoutes;
