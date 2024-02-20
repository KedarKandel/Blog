import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Toast from "./components/Toast";
import Create from "./pages/Create";
import { useEffect } from "react";
import { currentUserAsync } from "./redux/reducers/userSlice";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(currentUserAsync());
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<Login />} />
          <Route path="register" element={<Register />} />
          {isLoggedIn && (
            <>
              <Route path="create" element={<Create />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toast />
    </Router>
  );
}
