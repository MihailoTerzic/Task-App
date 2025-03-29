import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, View, Pressable, Text, Modal, FlatList } from 'react-native';
import TaskItem from '../components/TaskItem'; // Assuming TaskItem component is defined correctly

const Search = ({ data }) => {
  const [filteredList, setFilteredList] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle search and filter data
  const handleSubmit = () => {
    // Filter data based on the search text
    if (searchWord) {
      const filtered = data.filter(item =>
        item.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        item.description.toLowerCase().includes(searchWord.toLowerCase())
      );
      setFilteredList(filtered); // Set the filtered data
    } else {
      setFilteredList(data); // If search text is empty, show all data
    }
    
    // Open the modal to display results
    setModalVisible(true);
  };

  return (
    <View className="flex flex-row justify-between items-center border-gray-300 rounded-lg shadow-lg px-4 py-4 my-5">
      {/* Search Input */}
      <TextInput
        value={searchWord}
        onChangeText={setSearchWord}
        className="h-12 w-[80%] border border-gray-300 rounded-lg px-4 text-lg bg-white"
        placeholder="Search tasks..."
        placeholderTextColor="#aaa"
      />
      {/* Search Button */}
      <Pressable
        className="p-3"
        onPress={handleSubmit} // Call handleSubmit when pressed
      >
        <Ionicons name="search" color="blue" size={24} />
      </Pressable>

      {/* Modal to display filtered tasks */}
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal when clicked outside
        animationType="slide"
      >
        <View className="flex-1 bg-white p-5">
          {/* Close button to hide the modal */}
          <Pressable
            onPress={() => {
              setModalVisible(false);
              setSearchWord(''); // Reset search word
            }}
            className="bg-red-500 p-3 rounded-lg mb-5 bottom-5 z-10 absolute self-center w-[90%]"
          >
            <Text className="text-white text-center text-lg">Close</Text>
          </Pressable>

          {/* Display filtered list in FlatList */}
          <FlatList
            data={filteredList}
            keyExtractor={(item) => item.$id.toString()}
            renderItem={({ item }) => <TaskItem item={item} />} // Assuming TaskItem component is defined
          />
        </View>
      </Modal>
    </View>
  );
};

export default Search;
