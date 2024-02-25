import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "./redux/store";
import { currentUserAsync, editUserProfileAsync } from "./redux/reducers/userSlice";

import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import SearchPage from "./pages/SearchPage";
import Toast from "./components/Toast";
import MyProfile from "./pages/MyProfile";


export default function App() {
  const dispatch = useDispatch<AppDispatch>();
   const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  // const isLoggedIn = true;

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(currentUserAsync());
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SearchPage />} />
          <Route path="sign-in" element={<Login />} />
          <Route path="register" element={<Register />} />
          {isLoggedIn && (
            <>
              <Route path="create" element={<Create />} />
              <Route path="my-profile" element={<MyProfile />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toast />
    </Router>
  );
}
