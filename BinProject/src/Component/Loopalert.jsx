import React from 'react';
import loopalert from './Img/loopalert.png';

function Loopalert({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-red-200 border-4 border-red-400 p-4 rounded shadow-lg">
        {/* ใช้รูปภาพแทนข้อความ */}
        <img 
          src={loopalert} 
          alt="แจ้งเตือนถังขยะติด" 
          className="max-w-full h-auto" 
        />
        <button 
          onClick={onClose} 
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800 transition duration-300">
          ปิด
        </button>
      </div>
    </div>
  );
}

export default Loopalert;
