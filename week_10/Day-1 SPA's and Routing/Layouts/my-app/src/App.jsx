import { BrowserRouter, Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPageComponent />} />
            <Route path="class-11" element={<Class11Component />} />
            <Route path="class-12" element={<Class12Component />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Layout() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" , alignItems : "center"}}>
      <Header />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Outlet />
      </div>
      <div style={ {height : "20vh"}}>
        <Footer/>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header style={{ backgroundColor: "#f5f5f5", padding: "10px" }}>
      <nav style={{ display: "flex", gap: "10px" }}>
        <Link to="/">ALLEN</Link>
        <Link to="/class-11">CLASS 11</Link>
        <Link to="/class-12">CLASS 12</Link>
      </nav>
    </header>
  );
}

function Class11Component() {
  return <h1>Welcome to Class 11 Courses</h1>;
}

function Class12Component() {
  const navigate = useNavigate();

  function redirectUser() {
    navigate("/");
  }

  return (
    <div>
      <h1>Welcome to Class 12 Courses</h1>
      <button onClick={redirectUser}>Go Back to Landing Page</button>
    </div>
  );
}

function LandingPageComponent() {
  return <h1>Welcome to ALLEN</h1>;
}

function Footer() {
  return (
    <footer style={{ backgroundColor: "#f5f5f5", padding: "10px", textAlign: "center" }}>
      Footer Content Here
    </footer>
  );
}

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Sorry, page not found</h1>
      <button onClick={() => navigate("/")}>Go Back to Landing Page</button>
    </div>
  );
}

export default App;
