import React from 'react';
import { View, Text } from 'react-native';

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];

// Get the start and end of the current week (Sunday to Saturday)
const startOfWeek = new Date();
startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Move to Sunday
startOfWeek.setHours(0, 0, 0, 0); // Start of the day

const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 6); // Move to Saturday
endOfWeek.setHours(23, 59, 59, 999); // End of the day

// Get the start and end of the current month
const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
endOfMonth.setHours(23, 59, 59, 999);

// Helper function to check if a task date is within a range
const isDateInRange = (taskDate, startDate, endDate) => {
  const taskDateObj = new Date(taskDate); // Convert task date string to Date object
  return taskDateObj >= startDate && taskDateObj <= endDate;
};

const Analytics = ({ data }) => {
  const newData = data.filter(item => item.completed === false)
  // Filter tasks based on time periods
  const todayTasks = newData.filter((task) => task.date.startsWith(today));
  const weeklyTasks = newData.filter((task) => isDateInRange(task.date, startOfWeek, endOfWeek));
  const monthlyTasks = newData.filter((task) => isDateInRange(task.date, startOfMonth, endOfMonth));

  return (
    <View className="flex flex-row justify-around my-5">
      {[
        { label: "Next", value: data.filter(item => item.completed === false).length },
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
};

export default Analytics;
