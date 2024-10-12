// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const Grapt = () => {
//   const [selectedChart, setSelectedChart] = useState('daily'); // 'daily' or 'monthly'

  
//   // ข้อมูลแบตเตอรี่ภายในวันปัจจุบัน (สมมุติการลดแบตและการใช้วัตต์)
//   const dailyBatteryData = {
//     labels: ['00:00','01:00', '02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00', '12:00', 
//             '13:00','14:00','15:00','16:00','17:00', '18:00','19:00', '20:00','21:00','22:00','23:00'],
//     datasets: [
//       {
//         label: 'Battery Usage Today (%)',
//         data: [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45], // เปอร์เซ็นต์แบตเตอรี่
//         borderColor: 'rgba(255, 99, 132, 1)',
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         fill: true,
//         tension: 0.4,
//         yAxisID: 'percentage',
//       },
//       {
//         label: 'Power Usage (W)',
//         data: [10, 15, 12, 14, 18, 16, 20, 19, 22, 21, 25, 23], // การใช้วัตต์ของแบตเตอรี่
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true,
//         tension: 0.4,
//         yAxisID: 'wattage',
//       },
//     ],
//   };

//   // ข้อมูลแบตเตอรี่รวม 30 วัน (สมมุติข้อมูล)
//   const monthlyBatteryData = {
//     labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'],
//     datasets: [
//       {
//         label: 'Battery Usage (%)',
//         data: [100, 95, 90, 85, 80, 75, 70, 65, 60, 55], // เปอร์เซ็นต์แบตเตอรี่
//         borderColor: 'rgba(255, 99, 132, 1)',
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         fill: true,
//         tension: 0.4,
//         yAxisID: 'percentage',
//       },
//       {
//         label: 'Power Usage (W)',
//         data: [10, 12, 14, 13, 15, 16, 17, 19, 18, 15], // การใช้วัตต์ของแบตเตอรี่
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true,
//         tension: 0.4,
//         yAxisID: 'wattage',
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: selectedChart === 'daily' ? 'Battery Usage Today' : 'Battery Usage Over 30 Days',
//       },
//     },
//     scales: {
//       percentage: {
//         type: 'linear',
//         position: 'left',
//         title: {
//           display: true,
//           text: 'Battery (%)',
//         },
//         min: 0, // กำหนดค่า Min สำหรับเปอร์เซ็นต์แบตเตอรี่
//         max: 100, // กำหนดค่า Max สำหรับเปอร์เซ็นต์แบตเตอรี่
//       },
//       wattage: {
//         type: 'linear',
//         position: 'right',
//         title: {
//           display: true,
//           text: 'Power Usage (W)',
//         },
//         min: 0, // กำหนดค่า Min สำหรับการใช้วัตต์
//         max: 30, // กำหนดค่า Max สำหรับการใช้วัตต์
//         grid: {
//           drawOnChartArea: false, // ไม่ให้แสดง grid ของวัตต์ทับกับ percentage
//         },
//       },
//     },
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">บันทึกการใช้งานแบตเตอรี่ </h1>

//       <div className="mb-4">
//         <select name="" id="datetime">
//           <option value="">10/10/2567</option>
//           <option value="">11/10/2567</option>
//         </select>
//         {/* <button
//           className={`px-4 py-2 ${selectedChart === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setSelectedChart('monthly')}
//         >
//           ดูข้อมูลรวม 30 วัน
//         </button> */}
//       </div>

//       <div className="bg-gray-100 shadow-md rounded-lg p-4">
//         <Line
//           data={selectedChart === 'daily' ? dailyBatteryData : monthlyBatteryData}
//           options={options}
//         />
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Grapt = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [options, setOptions] = useState([]); // เปลี่ยน option เป็น state
  const [lastestDay, setLastestDay] = useState("");
  const [time,setTime] = useState(['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']);
  const [batteryLevel,setBatteryLevel] = useState([]);
  const [powerUsage,setPowerUsage] = useState([]); 
  // ข้อมูลแบตเตอรี่ภายในวันปัจจุบัน (สมมุติการลดแบตและการใช้วัตต์)
  const fetchData = (date) => {
    fetch(`http://127.0.0.1:5000/api/getGraph?dateSelect=${date}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => {
        if ("datetime" in data) {
          setLastestDay(data["datetime"][data["datetime"].length - 1]);
          setSelectedDate(data["datetime"][data["datetime"].length - 1]);
          const newOptions = data["datetime"].map(date => ({ value: date, label: date })); // สร้างตัวเลือกใหม่
          setOptions(newOptions.reverse()); // อัปเดต state options
          const newBattery = [];
          const newPowerUsage = [];
          time.forEach((time)=>{  
            let found = false;
            data["time"].forEach((timeDB,index)=>{
              if(timeDB == time){
                newBattery.push(parseInt(data["battery"][index]));
                newPowerUsage.push(parseInt(data["powerUsage"][index]));
                found = true;
              }
            });
            if (!found) {
              newBattery.push(0); // ถ้าไม่พบค่าที่ตรงกัน ให้เพิ่ม 0
              newPowerUsage.push(0);
            }
          });
          setBatteryLevel(newBattery);
          setPowerUsage(newPowerUsage);
        }
        else{
          const newBattery = [];
          const newPowerUsage = [];
          time.forEach((time)=>{  
            let found = false;
            data["time"].forEach((timeDB,index)=>{
              if(timeDB == time){
                newBattery.push(parseInt(data["battery"][index]));
                newPowerUsage.push(parseInt(data["powerUsage"][index]));
                found = true;
              }
            });
            if (!found) {
              newBattery.push(0); // ถ้าไม่พบค่าที่ตรงกัน ให้เพิ่ม 0
              newPowerUsage.push(0);
            }
          });
          setBatteryLevel(newBattery);
          setPowerUsage(newPowerUsage);
        }
      })
      .catch(error => {
        console.error('Error', error);
      });
  };

  useEffect(() => {
    fetchData(""); // เรียกใช้ fetchData เมื่อคอมโพเนนต์โหลด
  }, []);

  useEffect(() => {
    // console.log("Selected Date has changed:", selectedDate);
    // สร้าง setInterval ที่จะ fetch ข้อมูลทุก 5 วินาที
    const interval = setInterval(() => {
      fetchData(selectedDate);
    }, 20000);
    // คืนค่า cleanup function เพื่อเคลียร์ interval เมื่อ component unmount
    return () => clearInterval(interval);
  }, [selectedDate]);

  const batteryData = {
    labels: time,
    datasets: [
      {
        label: 'Battery Usage Today (%)',
        data: batteryLevel,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
        yAxisID: 'percentage',
      },
      {
        label: 'Power Usage (W)',
        data: powerUsage,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
        yAxisID: 'wattage',
      },
    ],
  };

  const optionsChart = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Battery Usage on ${selectedDate}`,
      },
    },
    scales: {
      percentage: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Battery (%)',
        },
        min: 0,
        max: 100,
      },
      wattage: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Power Usage (W)',
        },
        min: 0,
        max: 30,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">บันทึกการใช้งานแบตเตอรี่</h1>

      <div className="mb-4">
        <select
          onChange={(e) => {
            setSelectedDate(e.target.value);
            fetchData(e.target.value);
          }}
          value={selectedDate} className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            setSelectedDate(lastestDay);
            fetchData(lastestDay);
          }}
        >
          รีเซ็ตเป็นวันล่าสุด
        </button>
      </div>

      <div className="bg-gray-100 shadow-md rounded-lg p-4">
        <Line data={batteryData} options={optionsChart} />
      </div>
    </div>
  );
};

export default Grapt;
