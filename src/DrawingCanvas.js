import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

function DrawingCanvas() {
  const canvasRef = useRef(null); // Reference to the HTML canvas element
  const fabricCanvasRef = useRef(null); // Reference to the fabric.Canvas instance

  useEffect(() => {
    // Create the fabric.Canvas instance only after the canvas element is available
    if (canvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
      });
    }

    // Dispose of the fabric.Canvas instance on unmount
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
      }
    };
  }, [canvasRef]); // Re-run useEffect when canvasRef changes

  const handleClearCanvas = () => {
    // Ensure fabric.Canvas instance exists before clearing
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear();
    } else {
      console.warn('fabric.Canvas instance not yet available. Cannot clear canvas.');
    }
  };

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} className="border border-gray-300" />
      <button onClick={handleClearCanvas} className="absolute top-4 right-4 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm cursor-pointer">
        Clear
      </button>
    </div>
  );
}

export default DrawingCanvas;
