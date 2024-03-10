import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';

function DrawingCanvas() {
  const canvasRef = useRef(null); // Reference to the HTML canvas element
  const fabricCanvasRef = useRef(null); // Reference to the fabric.Canvas instance
  const [penWidth, setPenWidth] = useState(2); // State to track pen thickness

  useEffect(() => {
    // Create the fabric.Canvas instance only after the canvas element is available
    if (canvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
        width: window.innerWidth, // Set initial canvas width
        height: window.innerHeight, // Set initial canvas height
        freeDrawingBrush: new fabric['PencilBrush'](fabricCanvasRef.current), // Set default brush to PencilBrush
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

  const handleChangePenWidth = (width) => {
    setPenWidth(width);
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.freeDrawingBrush.width = width;
    }
  };

  const handleDownloadCanvas = () => {
    if (!fabricCanvasRef.current) {
      console.warn('fabric.Canvas instance not yet available. Cannot download canvas.');
      return;
    }

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = fabricCanvasRef.current.width;
    tempCanvas.height = fabricCanvasRef.current.height;
    const tempCtx = tempCanvas.getContext('2d');

    // Set white background
    tempCtx.fillStyle = '#ffffff'; // White color
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw main canvas contents onto temp canvas
    const objects = fabricCanvasRef.current.getObjects();
    objects.forEach(object => {
      object.setCoords();
      object.render(tempCtx);
    });

    // Convert temp canvas to data URL
    const dataURL = tempCanvas.toDataURL('image/png');

    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        className="w-full h-full cursor-pointer "
      />
      <div className="absolute top-4 left-4 flex flex-col space-y-2">
        <button
          onClick={() => handleChangePenWidth(2)}
          className={`px-2 py-1 rounded-md ${penWidth === 2 ? 'bg-blue-200' : 'bg-gray-200'}`}
        >
          Thin
        </button>
        <button
          onClick={() => handleChangePenWidth(5)}
          className={`px-2 py-1 rounded-md ${penWidth === 5 ? 'bg-blue-200' : 'bg-gray-200'}`}
        >
          Medium
        </button>
        <button
          onClick={() => handleChangePenWidth(10)}
          className={`px-2 py-1 rounded-md ${penWidth === 10 ? 'bg-blue-200' : 'bg-gray-200'}`}
        >
          Thick
        </button>
        <button
          onClick={handleDownloadCanvas}
          className="px-2 py-1 bg-slate-900 text-white rounded-md shadow-md cursor-pointer"
        >
          Download
        </button>
      </div>
      <button
        onClick={handleClearCanvas}
        className="absolute top-4 right-4 px-3 py-1 bg-slate-900 text-white rounded-md shadow-sm cursor-pointer"
      >
        Clear
      </button>
    </div>
  );
}

export default DrawingCanvas;
