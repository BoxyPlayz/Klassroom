import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
  lazy,
} from "preact-iso";

import "./style.css";

import Header from "./components/Header.jsx";
import { useLocalStorage } from "@reactuses/core";
import { theme } from "./lib/theme";
const Home = lazy(() => import("./pages/Home/index.jsx"));
const NotFound = lazy(() => import("./pages/_404.jsx"));
const Login = lazy(() => import("./pages/Login/index.jsx"));
const Account = lazy(() => import("./pages/Account/index.jsx"));

export function App() {
  const [themeColor] = useLocalStorage("theme", "light")
  return (
    <LocationProvider>
      <Header />
      <main style={{
        backgroundColor: theme.colors[themeColor].background,
        margin: 0,
        padding: 0,
        width: "100vw",
        color: theme.colors[themeColor].textContrast
      }}>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login}></Route>
          <Route path="/account" component={Account}></Route>
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
