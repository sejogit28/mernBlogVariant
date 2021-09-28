import React from 'react';
import './styles/css/globalStyles.css';
import Heading from './Heading';



function App(): JSX.Element {
  return (
    <div className="App">
      <Heading  h1aText='sup!' pText='This is a type script test!'/>
    </div>
  );
}

export default App;
