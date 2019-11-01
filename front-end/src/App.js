import React from 'react';
import './App.css';

function App() {
  return (
    <Router>
      <Route exact path="/" component={() => <div></div>} />
      <Route path="/:questionnaire" component={Page} />
    </Router>
  );
}

export default App;
