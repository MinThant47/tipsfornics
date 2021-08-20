import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import AllTips from "./components/AllTips/AllTips";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TipDetail from "./components/TipDetail/TipDetail";
import Login from "./components/Admin/Login";
import SignUp from "./components/Admin/SignUp";
import ErrorPage from "./components/NotFoundPage/ErrorPage";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import EditTipCard from "./components/Admin/Dashboard/EditTipCard/EditTipCard";
import NewCard from "./components/Admin/Dashboard/NewCard/NewCard";
import Profile from "./components/Admin/Dashboard/Profile/Profile";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import TipProvider from "./contexts/TipContext";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <TipProvider>
          <Router>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/all-tips" component={AllTips} />
              <Route path="/tip-detail/:id" component={TipDetail} />

              <Route
                path={`/${process.env.REACT_APP_TFN_PASSCODE}/login`}
                component={Login}
              />
              <Route
                path={`/${process.env.REACT_APP_TFN_PASSCODE}/sign-up`}
                component={SignUp}
              />
              <PrivateRoute
                path={`/${process.env.REACT_APP_TFN_PASSCODE}/dashboard`}
                component={Dashboard}
              />

              <PrivateRoute
                path={`/${process.env.REACT_APP_TFN_PASSCODE}/add-new-tip`}
                component={NewCard}
              />

              <PrivateRoute
                path={`/${process.env.REACT_APP_TFN_PASSCODE}/edit-tip/:id`}
                component={EditTipCard}
              />

              <PrivateRoute
                path={`/${process.env.REACT_APP_TFN_PASSCODE}/profile`}
                component={Profile}
              />

              <Route path="/*">
                <ErrorPage
                  type={"Error 404"}
                  secondary={"This page is not available."}
                />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </TipProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
