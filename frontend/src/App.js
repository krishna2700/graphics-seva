import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import OwnerDashboard from "./components/OwnerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/owner-dashboard" component={OwnerDashboard} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/user-dashboard" component={UserDashboard} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
