import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const TaskItem = ({item}) => {
    const {time,title,description,date} = item;
    return (
      <View className="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg w-[90%] self-center">
      <Text className="text-xl font-semibold text-white">{time}</Text>
      <Text className="text-lg font-bold text-white mt-2">{title}</Text>
      <Text className="text-gray-300 text-sm mt-1">{description}</Text>
      <Text className="text-gray-400 text-xs mt-1">{date}</Text>
    </View>
    
    
    );
}

const styles = StyleSheet.create({})

export default TaskItem;
