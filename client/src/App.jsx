import { SelectedDateProvider } from "./context/SelectedDateContext";
import Home from "./pages/Home";

export default function App() {
  return (
    <SelectedDateProvider>
    <h1 className="text-2xl font-bold underline">
      Hello world!
      <Home/>
    </h1>
    </SelectedDateProvider>
  )
}