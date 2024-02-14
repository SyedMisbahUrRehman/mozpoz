import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import default CSS for react-confirm-alert
import DrawingCanvas from './DrawingCanvas';

function Alert({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full sm:max-w-xs">
        <h2 className="text-2xl font-semibold mb-4">Alert</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-slate-900 text-white px-4 py-2 rounded-md w-full hover:bg-slate-950"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function App() {
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');

  const correctPassword = '12345'; // Hardcoded password

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setShowPopup(false);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      sessionStorage.setItem('isLoggedIn', 'true');
      setShowPopup(false);
    } else {
      setPassword('');
      setAlertMessage('Incorrect password');
    }
  };

  const closeAlert = () => {
    setAlertMessage('');
  };

  return (
    <div className="bg-[url('./assets/doodlebg.jpg')] bg-cover min-h-screen flex justify-center items-center">
      {showPopup && alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
      {showPopup && !alertMessage && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full sm:max-w-xs">
            <h2 className="text-2xl font-semibold mb-4">Enter Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-slate-900 text-white px-4 py-2 rounded-md w-full hover:bg-slate-950"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {!showPopup && <DrawingCanvas />}
    </div>
  );
}

export default App;
