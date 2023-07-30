import "./App.css";

import { useEffect, useState } from "preact/hooks";

import { getRosterSheet } from "../parseGoogleSheet";
import Loader from "./Loader";
import MainLayout from "./MainLayout";

export default function App() {
  const [element, setElement] = useState(<Loader />);

  useEffect(() => {
    getRosterSheet().then((data) => setElement(<MainLayout data={data} />));
  }, []);

  return element;
}
