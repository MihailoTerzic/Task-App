import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native';
import { perDateTask } from '../../services/functions';
import TaskItem from '../components/TaskItem';


const TaskDate = () => {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(true)
    const { date } = useLocalSearchParams();
   // console.log('Date fromat',date)

    
    const today = new Date().toISOString().split("T")[0];
  

    let fetchDate = date || today


     useEffect(() => {
         const fetchData = async ()=> {
            setloading(true)
            console.log('Fetchdate format',fetchDate)
          const  response = await perDateTask(fetchDate);
          setdata(response)
          console.log(response)
         setloading(false)
    
        }
        fetchData()
      }, [date])
    
    return (
        
            <View>
            <Text className='text-center text-2xl font-semibold my-5'> {fetchDate}</Text>
            <Text className='text-center text-xl '>Saved tasks for this date:</Text>
            
            {loading ? (
            <ActivityIndicator size="large" color="#0000ff" className="my-5" />
        ) : (
            <FlatList
                data={data}
                keyExtractor={(item) => item.$id.toString()}
                renderItem={({ item }) => <TaskItem item={item} />}
                 />
              
            
        )}

        </View>
    );
}

const styles = StyleSheet.create({});

export default TaskDate;
