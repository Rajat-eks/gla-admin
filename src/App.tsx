import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SignIn } from "./pages";
import Dashboard from "./pages/Dahsboard";
import Event from "./pages/Event";
import Speaker from "./pages/Speaker";
import Partner from "./pages/Partner";
import Sponsor from "./pages/Sponsor";
import Magzine from "./pages/Magzine";
import { Toaster } from "react-hot-toast";
import Registeration from "./pages/Registeration";
import Agenda from "./pages/Agenda";

function App() {
  return (
    <>
      <Toaster />
      {/* <SignIn /> */}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event" element={<Event />} />
        <Route path="/speaker" element={<Speaker />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/sponsor" element={<Sponsor />} />
        <Route path="/magzine" element={<Magzine />} />
        <Route path="/registeration" element={<Registeration />} />
        <Route path="/agenda" element={<Agenda />} />
      </Routes>
    </>
  );
}

export default App;
