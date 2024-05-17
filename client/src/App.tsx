import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { Auth } from "./pages/auth";
import { Dashboard } from "./pages/dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/">Dashboard</Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Navigate to="/auth" />
          </SignedOut>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordsProvider>
                <Dashboard />
              </FinancialRecordsProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
