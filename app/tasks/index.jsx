import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import Analytics from '../components/analytics';
import Search from '../components/search';
import { getData } from '../../services/functions';


const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reload, setReload] = useState(false)
  const [data, setdata] = useState([])
   const [loading, setloading] = useState(false)
  useEffect(() => {
    const fetchData = async ()=> {
      setloading(true)
      const  response = await getData();
      setdata(response)
      setloading(false)
    //  console.log(response)

    }
    fetchData()
  }, [reload])

  return (
    <View className={`flex-1	bg-gray-100 ${loading && 'justify-center items-center'}`}>
    {loading ?
      (
        <ActivityIndicator size="large" color="#0000ff" className="my-5" />
      ) : (
        <View className='h-full'>
        <Text className="text-center text-4xl font-extrabold my-5 text-blue-500 tracking-wide">
        📅 Tasks
      </Text>
      <Analytics data={data} />

    <Search data={data}></Search>
    
    
<View className='h-[45%] bg-gray-100 rounded-lg p-4 shadow-xl'>
<Text className='text-xl py-4 px-5'>Upcoming tasks</Text>
      <FlatList
        data={data}
        
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => <TaskItem item={item} setReload={setReload}/>}
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

      <AddTaskModal setModalVisible={setModalVisible} modalVisible={modalVisible} header='Add' setReload={setReload} />
      </View>
      )
    }
   
    
    </View>
  );
};


export default Index;
