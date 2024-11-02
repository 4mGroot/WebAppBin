import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Select from 'react-select';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const Grapt = () => {
  const [selectedDate, setSelectedDate] = useState("ไม่มีข้อมูล");
  const [options, setOptions] = useState([]); // เปลี่ยน option เป็น state
  const [lastedDay, setLastedDay] = useState("");
  const [batteryLevel,setBatteryLevel] = useState([]);
  const [powerUsage,setPowerUsage] = useState([]);
  const [timeDB,setTimeDB] = useState(null);
  const [batteryDB,setBatteryDB] = useState(null);
  const [powerUsageDB,setPowerUsageDB] = useState(null);

  const time = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  
  const fetchData = (date) => {
    fetch('http://'+window.location.href.split("http://")[1].split("/")[0]+':5000/api/getGraph?dateSelect='+date)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => {
        if ("datetime" in data) {
          setLastedDay(data["datetime"][data["datetime"].length - 1]);
          setSelectedDate(data["datetime"][data["datetime"].length - 1]);
          const newOptions = data["datetime"].map(date => ({ value: date, label: date })); // สร้างตัวเลือกใหม่
          setOptions(newOptions.reverse()); // อัปเดต state options
          setTimeDB(data["time"]);
          setBatteryDB(data["battery"]);
          setPowerUsageDB(data["powerUsage"]);
        }
        else{
          setTimeDB(data["time"]);
          setBatteryDB(data["battery"]);
          setPowerUsageDB(data["powerUsage"]);
          
        }
      })
      .catch(error => {
        console.error('Error', error);
      });
  };

  const plotGraph = ()=>{
    const newBattery = [];
    const newPowerUsage = [];
    const now = new Date(); 
    const dateNow = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const hourNow = now.getHours();
    time.forEach((time)=>{  
      let found = false;
      timeDB.forEach((timeDB,index)=>{
        if(timeDB == time){
          newBattery.push(parseInt(batteryDB[index]));
          newPowerUsage.push(parseInt(powerUsageDB[index]));
          found = true;
        }
      });

      if (!found) {
        if(dateNow === selectedDate){
          if(parseInt(time.slice(0,2)) <= hourNow){
            newBattery.push(0); // ถ้าไม่พบค่าที่ตรงกัน ให้เพิ่ม 0
            newPowerUsage.push(0);
          }
        }
        else{
          newBattery.push(0); // ถ้าไม่พบค่าที่ตรงกัน ให้เพิ่ม 0
          newPowerUsage.push(0);
        }
      }
    });
    setBatteryLevel(newBattery);
    setPowerUsage(newPowerUsage);
  };

  useEffect(() => {
    fetchData(""); // เรียกใช้ fetchData เมื่อคอมโพเนนต์โหลด
  }, []);
  // console.log(selectedDate);

  useEffect(() => {
    if (timeDB && batteryDB && powerUsageDB) {
      plotGraph();
    }
  }, [timeDB, batteryDB, powerUsageDB, selectedDate]);

  useEffect(() => {
    // console.log("Selected Date has changed:", selectedDate);
    // สร้าง setInterval ที่จะ fetch ข้อมูลทุก 20 วินาที
      const interval = setInterval(()=>{
        const now = new Date();
        const dateNow = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
        if(dateNow === selectedDate){
          fetchData(selectedDate);
        }
      }, 20000);
      // คืนค่า cleanup function เพื่อเคลียร์ interval เมื่อ component unmount
      return () => clearInterval(interval);
  }, [selectedDate]);

  const handleChange = (selectedOption) => {
    setSelectedDate(selectedOption.value);
    fetchData(selectedOption.value);
    plotGraph();
  };

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

      <div className="mb-4 flex items-center">
        <Select
          options={options}
          value={options.find(option => option.value === selectedDate)}
          onChange={handleChange}
          isSearchable={false} // เปิดการค้นหา
          isClearable={false}  // เปิดให้ล้างการเลือก
          styles={{
            control: (base) => ({
              ...base,
              width: '150px',
              height:'40px',
              boxShadow: 'none',
              '&:hover': {
                border: '1px solid #ccc',
              },
            }),
            menu: (base) => ({
              ...base,
              width: '150px', // ปรับความกว้างของ dropdown
            }),
          }}
          maxMenuHeight={200} // กำหนดความสูงสูงสุดของเมนูเป็น 150px
        />
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            setSelectedDate(lastedDay);
            fetchData(lastedDay);
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