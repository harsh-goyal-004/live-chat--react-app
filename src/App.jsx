import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import SignUp from "./components/SignUp";
import Protected from "./components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import authService from "./firebase/auth";
import { login, logout } from "./store/UserSlice";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            accessToken: user.accessToken,
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <>Loading....</>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protected authentication>
                <MainPage />
              </Protected>
            }
          />

          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
