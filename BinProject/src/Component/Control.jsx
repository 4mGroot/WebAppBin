import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import uparrow from './Img/arrow-up.png';
import downarrow from './Img/arrow-down.png';
import leftarrow from './Img/arrow-left.png';
import rightarrow from './Img/arrow-right.png';

function Control() {
  // useEffect(() => {
  //   let websocket;
  //   let intervalId;
  //   let ip;
  //   let ports = 8001;
  //   let activeButton = null;

  //   const setupWebSocket = () => {
  //     const currentURL = window.location.href;
  //     console.log(currentURL);
  //     ip = currentURL.split("http://")[1].split("/")[0];
  //     websocket = new WebSocket(`ws://${ip}:${ports}/`);
      
  //     websocket.addEventListener("message", ({ data }) => {
  //       const event = JSON.parse(data);
  //       if (event.state) {
  //         addHoldEventListeners(document.getElementById('W'), () => handleKeyPress('w'));
  //         addHoldEventListeners(document.getElementById('S'), () => handleKeyPress('s'));
  //         addHoldEventListeners(document.getElementById('A'), () => handleKeyPress('a'));
  //         addHoldEventListeners(document.getElementById('D'), () => handleKeyPress('d'));
  //         addHoldEventListeners(document.getElementById('UP'), () => handleKeyPress('up'));
  //         addHoldEventListeners(document.getElementById('DOWN'), () => handleKeyPress('down'));
  //         addHoldEventListeners(document.getElementById('LEFT'), () => handleKeyPress('left'));
  //         addHoldEventListeners(document.getElementById('RIGHT'), () => handleKeyPress('right'));

  //         document.getElementById('reset').addEventListener('touchstart', () => {
  //           websocket.send(JSON.stringify({ status: "reset" }));
  //         });
  //       } else {
  //         alert(event.speak);
  //         window.location.href = "https://" + ip;
  //       }
  //     });

  //     websocket.onclose = () => {
  //       console.log("WebSocket connection closed.");
  //     };
  //   };

  //   const handleKeyPress = (status) => {
  //     websocket.send(JSON.stringify({ status }));
  //   };

  //   const handleKeyRelease = () => {
  //     websocket.send(JSON.stringify({ status: "off" }));
  //   };

  //   const addHoldEventListeners = (button, action) => {
  //     button.addEventListener('mousedown', () => {
  //       handleButtonPress(button, action);
  //       button.classList.add('pressed');
  //     });
  //     button.addEventListener('mouseup', () => {
  //       handleButtonRelease();
  //       handleKeyRelease(); // ส่ง "off" เมื่อปล่อยปุ่ม
  //     });
  //     button.addEventListener('mouseleave', handleButtonRelease);
  //     button.addEventListener('touchstart', (e) => {
  //       e.preventDefault(); // ป้องกันการสั่น
  //       handleButtonPress(button, action);
  //     }, { passive: false });
  //     button.addEventListener('touchend', () => {
  //       handleButtonRelease();
  //       handleKeyRelease(); // ส่ง "off" เมื่อยกนิ้วออกจากปุ่ม
  //     });
  //   };

  //   const handleButtonPress = (button, action) => {
  //     if (!activeButton) {
  //       activeButton = button;
  //       disableOtherButtons(button);
  //       intervalId = setInterval(action, 10);
  //     }
  //   };

  //   const handleButtonRelease = () => {
  //     activeButton = null;
  //     enableAllButtons();
  //     clearInterval(intervalId);
  //   };

  //   const disableOtherButtons = (currentButton) => {
  //     const buttons = document.querySelectorAll('.controlBIN');
  //     buttons.forEach(button => {
  //       if (button !== currentButton) button.classList.add('disabled');
  //     });
  //   };

  //   const enableAllButtons = () => {
  //     const buttons = document.querySelectorAll('.controlBIN');
  //     buttons.forEach(button => button.classList.remove('disabled'));
  //   };

  //   // ตั้งค่า WebSocket เมื่อเริ่มต้น
  //   setupWebSocket();

  //   // ปิด WebSocket เมื่อออกจากหน้า
  //   window.addEventListener('beforeunload', () => {
  //     if (websocket) {
  //       websocket.close();
  //     }
  //   });

  //   // Cleanup: ตัด WebSocket เมื่อออกจากหน้า
  //   return () => {
  //     if (websocket) {
  //       websocket.close();
  //     }
  //   };
  // }, []);

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <div className='hidden 2xl:block'>
        <Sidebar />
      </div>
      <div className='fixed top-0 block w-full 2xl:hidden'>
        <Navbar />
      </div>
      <div className="bg-gray-200 flex flex-col border-2 md:flex-row w-full h-full justify-center items-center p-4 2xl:w-full">
        <div className="relative flex flex-col items-center justify-center w-full h-96 md:h-3/4 bg-green-200 border-4 border-green-600 rounded-full shadow-lg 2xl:w-3/5">
          <button id="W" className="absolute top-10 w-20 h-20 md:w-32 md:h-32 lg:w-44 lg:h-44 bg-emerald-300 text-white border-2 border-gray-100 rounded-full focus:outline-none hover:bg-gray-400
                                landscape-mobile:w-20 landscape-mobile:h-20 landscape-mobile:top-4"
            onContextMenu={(e) => e.preventDefault()}>
            <img src={uparrow} alt="up" />
          </button>
          <button id="S" className="absolute bottom-10 w-20 h-20 md:w-32 md:h-32 lg:w-44 lg:h-44 bg-emerald-300 text-white border-2 border-gray-100 rounded-full focus:outline-none hover:bg-gray-400
                                landscape-mobile:w-20 landscape-mobile:h-20 landscape-mobile:top-4"
            onContextMenu={(e) => e.preventDefault()}>
            <img src={downarrow} alt="down" />
          </button>
          <button id="A" className="absolute left-4 w-20 h-20 md:w-32 md:h-32 lg:w-44 lg:h-44 bg-emerald-300 text-white border-2 border-gray-100 rounded-full focus:outline-none hover:bg-gray-400
                                landscape-mobile:w-20 landscape-mobile:h-20 landscape-mobile:top-4"
            onContextMenu={(e) => e.preventDefault()}>
            <img src={leftarrow} alt="left" />
          </button>
          <button id="D" className="absolute right-4 w-20 h-20 md:w-32 md:h-32 lg:w-44 lg:h-44 bg-emerald-300 text-white border-2 border-gray-100 rounded-full focus:outline-none hover:bg-gray-400
                                landscape-mobile:w-20 landscape-mobile:h-20 landscape-mobile:top-4"
            onContextMenu={(e) => e.preventDefault()}>
            <img src={rightarrow} alt="right" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Control;
