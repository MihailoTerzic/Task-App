import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const TaskDate = () => {
    const { date } = useLocalSearchParams();

    // Check if 'date' exists before attempting to split
    const formattedDate = date ? date.split('-').reverse().join('-') : null;

    // Get today's date if 'date' is not passed
    const today = new Date();

    // Get the day, month, and year
    const day = today.getDate().toString().padStart(2, '0'); // Ensures two digits (e.g., '01', '09')
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
    const year = today.getFullYear();

    // Format as DD-MM-YYYY
    const date2 = `${day}-${month}-${year}`;

    return (
        <View>
            <Text className='text-center text-2xl font-semibold my-5'> {formattedDate ? formattedDate : date2}</Text>
            <Text className='text-center text-xl '>Saved tasks for this date:</Text>
        </View>
    );
}

const styles = StyleSheet.create({});

export default TaskDate;
