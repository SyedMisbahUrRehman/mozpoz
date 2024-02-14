import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

function DrawingCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ border: '1px solid #ccc' }}
    />
  );
}

export default DrawingCanvas;
