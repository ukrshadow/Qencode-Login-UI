import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import ResetPassword from "../pages/ResetPassword";
import NewPassword from "../pages/NewPassword";

const Routing = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route index path="/" element={<SignIn />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="*" element={<p>404 not found</p>} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routing;
