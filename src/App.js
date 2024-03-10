import React from 'react';
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import default CSS for react-confirm-alert
import DrawingCanvas from './DrawingCanvas';

function App() {
  return (
    <div className="bg-[url('../public/assets/bgmozpoz1.jpg')] bg-cover min-h-screen flex justify-center items-center">
      <DrawingCanvas />
      <div className='fixed bottom-4 left-0 right-0 text-center text-white w-full opacity-90 hover:underline'>
        Made with ❤️ by msb
      </div>
    </div>
  );
}

export default App;
