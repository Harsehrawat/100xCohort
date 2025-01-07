import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* Navigation Links */}
        <nav>
          <Link to="/">ALLEN</Link> | 
          <Link to="/class-11">CLASS 11</Link> | 
          <Link to="/class-12">CLASS 12</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/class-11" element={<Class11Component />} />
          <Route path="/class-12" element={<Class12Component />} />
          <Route path="/" element={<LandingPageComponent />} />
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Class11Component() {
  return (
    <h1>Welcome to Class 11 Courses</h1>
  );
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
  return (
    <h1>Welcome to ALLEN</h1>
  );
}

function ErrorPage(){
  return <div>Sorry page not found</div>
}

export default App;
