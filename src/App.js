import React from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  let apikey = process.env.REACT_APP_NEWS_API;
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<News key="general" pageSize={5} apikey={apikey} country="in" category="General" />} />
          <Route path="/General" element={<News key="general" pageSize={5} apikey={apikey} country="in" category="General" />} />
          <Route path="/Business" element={<News key="business" pageSize={5} apikey={apikey} country="in" category="Business" />} />
          <Route path="/Entertainment" element={<News key="entertainment" pageSize={5} apikey={apikey} country="in" category="Entertainment" />} />
          <Route path="/Health" element={<News key="health" pageSize={5} apikey={apikey} country="in" category="Health" />} />
          <Route path="/Science" element={<News key="science" pageSize={5} apikey={apikey} country="in" category="Science" />} />
          <Route path="/Sports" element={<News key="sports" pageSize={5} apikey={apikey} country="in" category="Sports" />} />
          <Route path="/Technology" element={<News key="technology" pageSize={5} apikey={apikey} country="in" category="Technology" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

