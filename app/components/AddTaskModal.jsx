import React from 'react';
import { StyleSheet, View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';

const AddTaskModal = ({setModalVisible, modalVisible}) => {

    const handleCloseModal = ()=> {
        setModalVisible(false)
    }
    return (
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-2xl w-[85%] shadow-lg">
          
          {/* Header */}
          <Text className="text-2xl font-bold text-center text-gray-800 mb-4">
            Add New Task 📝
          </Text>
    
          {/* Inputs */}
          <TextInput
            className="h-12 border border-gray-400 rounded-md px-3 mb-3"
            placeholder="Title"
            placeholderTextColor="#777"
          />
          <TextInput
            className="h-12 border border-gray-400 rounded-md px-3 mb-3"
            placeholder="Description"
            placeholderTextColor="#777"
          />
          <TextInput
            className="h-12 border border-gray-400 rounded-md px-3 mb-3"
            placeholder="Date (DD-MM-YYYY)"
            placeholderTextColor="#777"
          />
          <TextInput
            className="h-12 border border-gray-400 rounded-md px-3 mb-5"
            placeholder="Time (HH:MM)"
            placeholderTextColor="#777"
          />
    
          {/* Buttons */}
          <View className=" justify-around flex-row-reverse">
            <TouchableOpacity
              onPress={handleCloseModal}
              className="bg-red-500 px-6 py-2 rounded-md"
            >
              <Text className="text-white font-bold text-lg">Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCloseModal}
              className="bg-blue-500 px-6 py-2 rounded-md"
            >
              <Text className="text-white font-bold text-lg">Add</Text>
            </TouchableOpacity>
          </View>
    
        </View>
      </View>
    </Modal>
    
    );
}

const styles = StyleSheet.create({
   
   
  });

export default AddTaskModal;
