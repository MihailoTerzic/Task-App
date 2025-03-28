import React from 'react';
import { StyleSheet, View,Text } from 'react-native';


  
// Get today's date
const today = new Date();

// Format today's date as DD-MM-YYYY
const day = today.getDate().toString().padStart(2, '0');
const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
const year = today.getFullYear();
const formattedDate = `${day}-${month}-${year}`;

// Get the start and end date for this week (till the end of this week, i.e., Saturday)
const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - today.getDay()); // Set to Sunday of this week
startOfWeek.setHours(0, 0, 0, 0); // Set to the start of the day (00:00)

const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Saturday of this week
endOfWeek.setHours(23, 59, 59, 999); // Set to the end of the day (23:59)

// Get the start and end date for this month (till the end of this month)
const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the month
startOfMonth.setHours(0, 0, 0, 0);

const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the month
endOfMonth.setHours(23, 59, 59, 999);

// Helper function to compare dates (in DD-MM-YYYY format)
const isDateInRange = (taskDate, startDate, endDate) => {
  const [taskDay, taskMonth, taskYear] = taskDate.split('-').map(Number);
  const taskDateObj = new Date(taskYear, taskMonth - 1, taskDay);
  return taskDateObj >= startDate && taskDateObj <= endDate;
};

const Analytics = ({data}) => {

    

    const todayTasks = data.filter((task) => task.date === formattedDate);
      const weeklyTasks = data.filter((task) =>
        isDateInRange(task.date, startOfWeek, endOfWeek)
      );
      const monthlyTasks = data.filter((task) =>
        isDateInRange(task.date, startOfMonth, endOfMonth)
      );
    return (
        <View className="flex flex-row justify-around my-5">
        {[
          { label: "Next", value: data.length },
          { label: "Today", value: todayTasks.length },
          { label: "Weekly", value: weeklyTasks.length },
          { label: "Monthly", value: monthlyTasks.length },
        ].map((item, index) => (
          <View key={index} className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full shadow-xl">
            <Text className="text-3xl font-bold">{item.value}</Text>
            <Text className="text-sm text-gray-600">{item.label}</Text>
          </View>
        ))}
      </View>
    );
}



export default Analytics;
