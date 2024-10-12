# import csv

# # ชื่อไฟล์ CSV
# filename = 'data2.csv'
# data = {}
# # อ่านไฟล์ CSV
# with open(filename, mode='r', newline='') as file:
#     reader = csv.reader(file)
#     # อ่านข้อมูล
#     for row in reader:
#         data.append(row)
# print(data)

import glob
import os

# พาธของโฟลเดอร์ที่ต้องการดึงชื่อไฟล์
folder_path = 'datetime/'

# ดึงเฉพาะไฟล์ที่มีนามสกุล .txt
file_names = glob.glob(os.path.join(folder_path, "*.csv"))
last_file_path = os.path.basename(file_names[-1])
print(last_file_path)
# ดึงแค่ชื่อไฟล์จากพาธ
# for f in file_names:
#     year, month, day = os.path.basename(f).replace(".csv","").split("-")
#     print(f"{day}-{month}-{year}")

