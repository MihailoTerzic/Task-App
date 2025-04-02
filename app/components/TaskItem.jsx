import {React, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import OpenTask from './openTask';

const TaskItem = ({ item,setReload }) => {
  const { title, description, date } = item;
  const [modalVisible, setModalVisible] = useState(false)

  // Convert the stored ISO date to a JavaScript Date object
  const formattedDateObj = new Date(date);

  // Extract day, month, and year
  const day = String(formattedDateObj.getUTCDate()).padStart(2, '0');
  const month = String(formattedDateObj.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = formattedDateObj.getUTCFullYear();

  // Extract hours and minutes (using UTC to prevent timezone issues)
  const hours = String(formattedDateObj.getUTCHours()).padStart(2, '0');
  const minutes = String(formattedDateObj.getUTCMinutes()).padStart(2, '0');

  // Construct formatted date and time
  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return (
    <View>
    <TouchableOpacity onPress={()=>setModalVisible(true)}>

    <View 
    className="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg w-[90%] self-center">
    
      <View className="flex flex-row justify-between items-center">
        <Text className="text-lg font-bold text-white mt-2">{title}</Text>
        <Text className="text-3xl font-bold text-white mt-2">{formattedTime}</Text> 
      </View>

      <View className="flex flex-row justify-between items-center">
      <Text className="text-gray-300 text-sm mt-1">{description}</Text>
      <Text className="text-gray-400 text-xs mt-2">{formattedDate}</Text>
      </View>
      
    </View>
      </TouchableOpacity>
      <OpenTask setModalVisible={setModalVisible} modalVisible={modalVisible} data={item} setReload={setReload}/>
      </View>
  );
};

const styles = StyleSheet.create({});

export default TaskItem;
