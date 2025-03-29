import React, { useState } from 'react';
import { Switch, View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import { ID } from 'react-native-appwrite';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTask } from '../../services/functions';

const AddTaskModal = ({ setModalVisible, modalVisible,enableEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date()); // Default to current date
  const [time, setTime] = useState(new Date()); // Default to current time
  const [expired, setExpired] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Track if the user has selected a date/time
  const [dateSelected, setDateSelected] = useState(false);
  const [timeSelected, setTimeSelected] = useState(false);

  // Error states
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');

  // Reset all form states
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate(new Date()); // Reset to current date
    setTime(new Date()); // Reset to current time
    setExpired(false); // Reset the expired switch
    setShowDatePicker(false);
    setShowTimePicker(false);
    setDateSelected(false); // Reset the date change flag
    setTimeSelected(false); // Reset the time change flag
    setTitleError('');
    setDescriptionError('');
    setDateError('');
    setTimeError('');
  };

  const handleCloseModal = () => {
    resetForm();
    setModalVisible(false);
  };

const handleEdit = () => {
console.log('editt')
} 

  const handleAdd = async () => {
    // Reset previous errors
    let valid = true;

    if (!title.trim()) {
      setTitleError('Title is required');
      valid = false;
    }
    if (!description.trim()) {
      setDescriptionError('Description is required');
      valid = false;
    }
    if (!dateSelected) {
      setDateError('Please select a date');
      valid = false;
    }
    if (!timeSelected) {
      setTimeError('Please select a time');
      valid = false;
    }

    if (!valid) return;

    // Format date and time correctly
    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = time.toTimeString().split(" ")[0].slice(0, 5);
    const combinedDateTime = `${formattedDate}T${formattedTime}:00.000Z`;

    const data = {
      title,
      description,
      completed: expired,
      date: combinedDateTime,
      // bio dodat id ali sam obrisao jer appwrite ima svoj integrisani $id
    };

    //console.log(data);
   
    try {
      const response = await createTask(data)
      
    } catch (error) {
      console.error(error)

    }

    resetForm(); // Reset all fields after successful submission
    setModalVisible(false)
  };

  // Format selected date and time for display
  const displayDate = date.toLocaleDateString();
  const displayTime = time.toTimeString().split(" ")[0].slice(0, 5);

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

          {/* Title Input */}
          <TextInput
            className="h-12 border border-gray-400 rounded-md px-3 mb-1"
            placeholder="Title"
            placeholderTextColor="#777"
            onChangeText={setTitle}
            value={title}
          />
          {titleError ? <Text className="text-red-500">{titleError}</Text> : null}

          {/* Description Input */}
          <TextInput
            className="h-12 border border-gray-400 rounded-md px-3 mb-1"
            placeholder="Description"
            placeholderTextColor="#777"
            onChangeText={setDescription}
            value={description}
          />
          {descriptionError ? <Text className="text-red-500">{descriptionError}</Text> : null}

          {/* Date Picker */}
          <TouchableOpacity 
            className="bg-blue-500 p-3 rounded-md my-2 mt-4" 
            title="Pick a Date" 
            onPress={() => setShowDatePicker(true)} 
          >
            <Text className="text-white text-center"> {dateSelected ? date.toLocaleDateString() : "Pick a Date"}</Text>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setDate(selectedDate);
                    setDateSelected(true); // Mark date as selected
                  }
                }}
              />
            )}
          </TouchableOpacity>
          {dateError ? <Text className="text-red-500">{dateError}</Text> : null}

          {/* Time Picker */}
          <TouchableOpacity 
            className="bg-blue-500 p-3 rounded-md my-2" 
            onPress={() => setShowTimePicker(true)} 
          >
            <Text className="text-white text-center"> {timeSelected ? time.toTimeString().split(" ")[0].slice(0, 5) : "Pick a Time"}</Text>
            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) {
                    setTime(selectedTime);
                    setTimeSelected(true); // Mark time as selected
                  }
                }}
              />
            )}
          </TouchableOpacity>
          {timeError ? <Text className="text-red-500">{timeError}</Text> : null}

          {/* Expired Switch */}
          <View className="flex flex-row items-center my-3">
            <Text className="text-lg mr-2">Expired:</Text>
            <Switch value={expired} onValueChange={(newValue) => setExpired(newValue)} />
          </View>

          {/* Buttons */}
          <View className="justify-around flex-row-reverse">
            <TouchableOpacity onPress={handleCloseModal} className="bg-red-500 px-6 py-2 rounded-md">
              <Text className="text-white font-bold text-lg">Close</Text>
            </TouchableOpacity>

            {enableEdit &&
            <TouchableOpacity
            onPress={handleEdit} className='bg-green-500 px-6 py-2 rounded-md'>
              
              <Text className="text-white font-bold text-lg">Edit</Text>
            </TouchableOpacity>
          }
           
            <TouchableOpacity onPress={handleAdd} className="bg-blue-500 px-6 py-2 rounded-md">
              <Text className="text-white font-bold text-lg">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddTaskModal;
