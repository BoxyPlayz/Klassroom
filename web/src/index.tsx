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
const Home =  lazy(() => import("./pages/Home/index.jsx"));
const NotFound = lazy(() => import("./pages/_404.jsx"));
const Login = lazy(() => import("./pages/Login/index.jsx"));
const Account = lazy(() => import("./pages/Account/index.jsx"));

export function App() {
  return (
    <LocationProvider>
      <Header />
      <main>
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
