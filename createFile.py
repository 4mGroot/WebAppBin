import csv
import random
from datetime import datetime, timedelta

# ใช้งาน datetime
# now = datetime.now()
# print("Current datetime:", now)
# print("year : ",now.year)
# print("month : ",now.month)
# print("day : ",now.day)
# print("hr : ",now.hour)
# print("min : ",now.minute)
# print("sec : ",now.second)
# datenow = now.replace(microsecond=0)
# print("date now : ",datenow)
# # ตั้งค่าชื่อไฟล์ CSV
# filename = "data2.csv"
# # สร้างข้อมูล
# data = []
# for i in range(100):
#     timestamp = datetime.now().replace(microsecond=0) + timedelta(minutes=i * 10)  # เพิ่มเวลา 10 วินาที
#     battery_percentage = random.randint(0, 100)  # สุ่มเปอร์เซ็นต์แบตเตอรี่
#     power_usage = random.randint(10, 100)  # สุ่มการใช้พลังงาน (วัตต์)
    
#     # เพิ่มข้อมูลในลิสต์
#     data.append([timestamp, battery_percentage, power_usage])

# เขียนข้อมูลลงในไฟล์ CSV
# with open(filename, mode='w', newline='') as file:
#     writer = csv.writer(file)
#     # เขียน header ของข้อมูล
#     # writer.writerow(['Timestamp', 'Battery Percentage', 'Power Usage (Watt)'])
#     # เขียนข้อมูล
#     writer.writerows(data)

# print(f"Created {filename} successfully.")
# import csv
# from datetime import datetime, timedelta

# วันที่ปัจจุบัน
today = datetime.now()

# ลูปเพื่อสร้างไฟล์ตั้งแต่วันนี้จนถึงวันที่ 20
for i in range(10):
    # สร้างชื่อไฟล์ตามวันที่
    date = today - timedelta(days=i)
    filename = date.strftime("%Y-%m-%d") + ".csv"
    data=[]
    # สร้างไฟล์ CSV
    with open("datetime\\"+filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        for i in range(100):
            timestamp = datetime.now().replace(microsecond=0) + timedelta(minutes=i * 10)# เพิ่มเวลา 10 วินาที
            battery_percentage = random.randint(0, 100)  # สุ่มเปอร์เซ็นต์แบตเตอรี่
            power_usage = random.randint(10, 30)  # สุ่มการใช้พลังงาน (วัตต์)
            data.append([timestamp.strftime("%H:%M:%S"), battery_percentage, power_usage])
        writer.writerows(data)

    print(f"สร้างไฟล์ {filename} สำเร็จแล้ว!")