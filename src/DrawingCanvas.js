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
        width: window.innerWidth, // Set initial canvas width
        height: window.innerHeight, // Set initial canvas height
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

  // Prevent scrolling on the canvas element
  const preventScroll = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // Add event listener to prevent scrolling on the canvas
    const canvas = canvasRef.current;
    canvas.addEventListener('touchmove', preventScroll, { passive: false });
    canvas.addEventListener('mousewheel', preventScroll, { passive: false });

    return () => {
      // Remove event listener on component unmount
      canvas.removeEventListener('touchmove', preventScroll);
      canvas.removeEventListener('mousewheel', preventScroll);
    };
  }, []);

  // Dynamically update canvas dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = fabricCanvasRef.current;
      if (canvas) {
        canvas.setDimensions({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="border border-gray-300"
        style={{ width: '100%', height: '100%' }}
      />
      <button
        onClick={handleClearCanvas}
        className="absolute top-4 right-4 px-5 py-2 bg-slate-900 text-white rounded-md shadow-sm cursor-pointer"
      >
        Clear
      </button>
    </div>
  );
}

export default DrawingCanvas;
