import React, { useState } from 'react';
import { View, Text, Pressable, Modal, Alert } from 'react-native';
import AddTaskModal from './AddTaskModal';
import { deleteTask } from '../../services/functions';


const OpenTask = ({ data, setModalVisible, modalVisible,setReload }) => {
  const { title, description, date, completed,$id } = data;
  const [modalVisible2, setModalVisible2] = useState(false)

  const formattedDateObj = new Date(date);

  // Extract day, month, year, hours, and minutes
  const day = String(formattedDateObj.getUTCDate()).padStart(2, '0');
  const month = String(formattedDateObj.getUTCMonth() + 1).padStart(2, '0');
  const year = formattedDateObj.getUTCFullYear();
  const hours = String(formattedDateObj.getUTCHours()).padStart(2, '0');
  const minutes = String(formattedDateObj.getUTCMinutes()).padStart(2, '0');

  // Construct formatted date and time
  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}`;


  const handleDelete = async ()=> {
    
    Alert.alert('Delete note', 'Are you sure?', [{text: 'Cancel'},{text:'Delete',onPress: async ()=> {
try {
   const response =  await deleteTask($id)
    console.log('Succesfuly deleted')
    setReload(r=>!r)
    setModalVisible(false)
} catch (error) {
    console.error(error)
}}}])
  }

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      animationType="slide"
      transparent={true}
    >
      <View className="h-full w-full flex justify-center items-center bg-black/60">
        <View className="w-[90%] bg-white p-6 rounded-lg shadow-xl">
          
          {/* Task Title */}
          <Text className="text-3xl font-bold text-gray-900 text-center mb-3">{title}</Text>

          {/* Description */}
          <Text className="text-gray-600 text-lg text-center">{description}</Text>

          {/* Date & Time Display */}
          <View className="flex flex-row justify-center items-center mt-3">
            <Text className="text-gray-500 text-lg font-medium">{formattedDate}</Text>
            <Text className="text-gray-700 text-xl font-bold ml-4">{formattedTime}</Text>
          </View>

          {/* Expiry Status */}
          <Text className={`text-lg font-semibold text-center mt-3 ${completed ? 'text-red-500' : 'text-green-500'}`}>
            {completed ? 'Expired' : 'Active'}
          </Text>

          {/* Edit & Delete Buttons */}
          <View className="flex flex-row justify-between mt-5">
            <Pressable  onPress={()=>setModalVisible2(true)} 
            className="flex-1 bg-yellow-500 p-4 rounded-lg mx-2" >
              <Text className="text-white text-center text-lg font-semibold">Edit</Text>
            </Pressable>

            <Pressable className="flex-1 bg-red-500 p-4 rounded-lg mx-2"
             onPress={handleDelete}>
              <Text className="text-white text-center text-lg font-semibold">Delete</Text>
            </Pressable>
          </View>

          {/* Full-Width Close Button */}
          <Pressable
            onPress={() => setModalVisible(false)}
            className="mt-5 w-full bg-gray-800 p-4 rounded-lg"
          >
            <Text className="text-white text-center text-lg font-semibold">Close</Text>
          </Pressable>
        </View>
      </View>
      <AddTaskModal setModalVisible={setModalVisible2} modalVisible={modalVisible2} header='Edit' data={data} setOpenVisible={setModalVisible} setReload={setReload}></AddTaskModal>
    </Modal>
  );
};

export default OpenTask;
