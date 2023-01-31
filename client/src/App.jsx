import { SelectedDateProvider } from "./context/SelectedDateContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./layout/SharedLayout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import SingleCourse from "./protected/SingleCourse";
import ProtectRoute from "./routes/ProtectRoute";

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

          <Route element={<ProtectRoute />}>
            <Route path="/admin" element={<SharedLayout />}>
              <Route index element={<Home />} />
              <Route path="/admin/course/id" element={<SingleCourse />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </SelectedDateProvider>
  );
}
