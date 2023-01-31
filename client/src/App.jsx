import { SelectedDateProvider } from "./context/SelectedDateContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./layout/SharedLayout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";

export default function App() {
  return (
    <SelectedDateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </SelectedDateProvider>
  );
}
