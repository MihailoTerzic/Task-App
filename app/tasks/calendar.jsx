import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
    const router = useRouter()
    const [selectedDate, setSelectedDate] = useState(null)

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);  // Store the selected date in 'yyyy-mm-dd' format
        router.push(`/tasks/${day.dateString}`);  // Navigate to the tasks screen with selected date
      };
    return (
      <View className="flex-1 bg-white p-4 justify-center">
      <Text className="text-3xl text-center text-gray-800 mb-5">Browse date</Text>

      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: 'lightblue', // Light blue for selected date
            selectedTextColor: 'darkblue', // Dark blue for selected date text
          },
        }}
        theme={{
          // Customize calendar theme for light design
          selectedDayBackgroundColor: 'lightblue', // Light blue background for selected day
          selectedDayTextColor: 'darkblue', // Dark blue text color for selected day
          todayTextColor: 'black', // Black text for today's date
          arrowColor: 'gray', // Gray arrows for navigation
          monthTextColor: 'black', // Black color for the month
          dayTextColor: 'black', // Black text color for the days
          textDayFontFamily: 'Arial', // Font family for days
          textMonthFontFamily: 'Arial', // Font family for month
          textDayHeaderFontFamily: 'Arial', // Font family for day headers
          textDayFontSize: 16, // Font size for days
          textMonthFontSize: 20, // Font size for month
          textDayHeaderFontSize: 14, // Font size for day headers (Mon, Tue, etc.)
        }}
        style={{
          borderRadius: 10, // Rounded corners for the calendar
          padding: 10,
          backgroundColor: '#f5f5f5', // Light gray background for the calendar
        }}
      />
    </View>
    );
}

const styles = StyleSheet.create({})

export default CalendarScreen;
