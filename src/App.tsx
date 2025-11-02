import React from 'react';
import ConnectFour from './components/ConnectFour/ConnectFour';
// import 'antd/dist/reset.css'; // Или 'antd/dist/antd.css' для версий до 5.0

const App: React.FC = () => {
  return (
    <div className="App">
      <ConnectFour />
    </div>
  );
};

export default App;