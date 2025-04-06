import React, { useEffect, useState } from 'react';
import { Switch, View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTask, editTask } from '../../services/functions';

const AddTaskModal = ({ setModalVisible, modalVisible, header, data, setOpenVisible,setReload }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: new Date(),
    time: new Date(),
    expired: false,
  });

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [timeSelected, setTimeSelected] = useState(false);

  useEffect(() => {
    if (data) {
      const existingDate = new Date(data.date);
      setForm({
        title: data.title || '',
        description: data.description || '',
        date: existingDate,
        time: existingDate,
        expired: data.completed || false,
      });
      setDateSelected(true);
      setTimeSelected(true);
    }
  }, [data]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!dateSelected) newErrors.date = 'Please select a date';
    if (!timeSelected) newErrors.time = 'Please select a time';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDateTime = () => {
    const formattedDate = form.date.toISOString().split("T")[0];
    const formattedTime = form.time.toTimeString().split(" ")[0].slice(0, 5);
    return `${formattedDate}T${formattedTime}:00.000Z`;
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      date: new Date(),
      time: new Date(),
      expired: false,
    });
    setErrors({});
    setShowDatePicker(false);
    setShowTimePicker(false);
    setDateSelected(false);
    setTimeSelected(false);
  };

  const handleCloseModal = () => {
    resetForm();
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;


    const payload = {
      title: form.title,
      description: form.description,
      completed: form.expired,
      date: formatDateTime(),
    };

    try {
      if (data) {
        await editTask(payload, data.$id);
      } else {
        await createTask(payload);
      }
    } catch (error) {
      console.error(data ? 'Error updating task:' : 'Error creating task:', error);
    }

    resetForm();
    setModalVisible(false);
    if (setOpenVisible) setOpenVisible(false);
    setReload(r=>!r)
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-2xl w-[85%] shadow-lg">
          <Text className="text-2xl font-bold text-center text-gray-800 mb-4">
            {header} Task 📝
          </Text>

          {/* Title */}
          <TextInput
            className="h-12 border border-gray-400 rounded-md px-3 mb-1"
            placeholder="Title"
            placeholderTextColor="#777"
            value={form.title}
            onChangeText={(text) => handleChange('title', text)}
          />
          {errors.title && <Text className="text-red-500">{errors.title}</Text>}

          {/* Description */}
          <TextInput
            className="h-12 border border-gray-400 rounded-md px-3 mb-1"
            placeholder="Description"
            placeholderTextColor="#777"
            value={form.description}
            onChangeText={(text) => handleChange('description', text)}
          />
          {errors.description && <Text className="text-red-500">{errors.description}</Text>}

          {/* Date Picker */}
          <TouchableOpacity className="bg-blue-500 p-3 rounded-md my-2 mt-4" onPress={() => setShowDatePicker(true)}>
            <Text className="text-white text-center">
              {dateSelected ? form.date.toLocaleDateString() : 'Pick a Date'}
            </Text>
          </TouchableOpacity>
          {errors.date && <Text className="text-red-500">{errors.date}</Text>}
          {showDatePicker && (
            <DateTimePicker
              value={form.date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  handleChange('date', selectedDate);
                  setDateSelected(true);
                }
              }}
            />
          )}

          {/* Time Picker */}
          <TouchableOpacity className="bg-blue-500 p-3 rounded-md my-2" onPress={() => setShowTimePicker(true)}>
            <Text className="text-white text-center">
              {timeSelected ? form.time.toTimeString().split(" ")[0].slice(0, 5) : 'Pick a Time'}
            </Text>
          </TouchableOpacity>
          {errors.time && <Text className="text-red-500">{errors.time}</Text>}
          {showTimePicker && (
            <DateTimePicker
              value={form.time}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) {
                  handleChange('time', selectedTime);
                  setTimeSelected(true);
                }
              }}
            />
          )}

          {/* Completed Switch */}
          <View className="flex flex-row items-center my-3">
            <Text className="text-lg mr-2">Expired:</Text>
            <Switch value={form.expired} onValueChange={(value) => handleChange('expired', value)} />
          </View>

          {/* Buttons */}
          <View className="justify-around flex-row-reverse">
            <TouchableOpacity onPress={handleCloseModal} className="bg-red-500 px-6 py-2 rounded-md">
              <Text className="text-white font-bold text-lg">Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} className="bg-blue-500 px-6 py-2 rounded-md">
              <Text className="text-white font-bold text-lg">{data ? 'Update' : 'Add'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddTaskModal;
