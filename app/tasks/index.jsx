import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import Analytics from '../components/analytics';
import Search from '../components/search';
import { getData } from '../../services/functions';

const data = [
  {
    title: 'Termin 1',
    description: 'Termin za babu 1',
    id: 1,
    date: '27-03-2025',
    time: '16:50',
  },
  {
    title: 'Termin 2',
    description: 'Termin za babu 2',
    id: 2,
    date: '28-03-2025',
    time: '17:00',
  },
  {
    title: 'Termin 3',
    description: 'Termin za babu 3',
    id: 3,
    date: '03-04-2025',
    time: '17:00',
  },
  {
    title: 'Termin 4',
    description: 'Termin za babu 4',
    id: 4,
    date: '31-03-2025',
    time: '17:00',
  },
  {
    title: 'Termin 5',
    description: 'Termin za babu 4',
    id: 5,
    date: '31-03-2025',
    time: '17:00',
  },
];

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data2, setdata2] = useState([])
  useEffect(() => {
    const fetchData = async ()=> {
      const  response = await getData();
      setdata2(response)
      console.log(response)

    }
    fetchData()
  }, [])

  return (
    <View className="flex-1  bg-gray-100">
      <Text className="text-center text-4xl font-extrabold my-5 text-blue-500 tracking-wide">
        📅 Tasks
      </Text>
      <Analytics data={data2} />

    <Search data={data2}></Search>
    
    
<View className='h-[45%] bg-gray-100 rounded-lg p-4 shadow-xl'>
<Text className='text-xl py-4 px-5'>Upcoming tasks</Text>
      <FlatList
        data={data2}
        
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => <TaskItem item={item} />}
        />
        </View>

      
   

 <TouchableOpacity
        className="absolute bottom-5 w-[80%] self-center rounded-xl shadow-lg z-10"
       onPress={()=>setModalVisible(true)}
      >
        <Text className="text-center py-3 text-white text-xl font-semibold rounded-xl bg-blue-400">
          Add Task
        </Text>
      </TouchableOpacity>

      <AddTaskModal setModalVisible={setModalVisible} modalVisible={modalVisible} enableEdit={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  // Optional styles for further customizations
});

export default Index;
