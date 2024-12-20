import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import CategoryList from '../../components/CategoryList';
import TaskModal from '../../components/TaskModel';
import TaskList from '../../components/TaskList';
import TaskDetailModal from '../../components/TaskDetailModal';
import apiClient from '@/src/api/apiClient';

type Task = {
  title: string;
  description: string;
  priority: string;
  dueDate:Date | null;
  status:string;
  image: string | null;
  _id:string | undefined;
};

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskDetailModalVisible, setTaskDetailModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [refreshKey,setRefreshKey]=useState<number>(0);
  const categories = ['All', 'Important'];

  useEffect(() => {
     const fetchTasks = async () => {
      try {
        const response = await apiClient.get('/task');
        setTasks(response.data.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to get tasks.');
      }
    };
   fetchTasks();
}, [refreshKey]);

const handleSave=()=>{
  setRefreshKey((prev)=>prev+1);
}

  const handleDeleteTask = async (index: number) => {
    const taskId = tasks[index]._id;
    try {
      await apiClient.delete(`/task/delete/${taskId}`);
      handleSave();
    } catch (error:any) {
      Alert.alert('Error', 'Failed to delete the task.:',error);
    }
  };

  const handleUpdateTask = (index: number) => {
    setSelectedTaskIndex(index);
    setModalVisible(true);
  };

  const handleViewDetails = (task: Task) => {
    setSelectedTask(task);
    setTaskDetailModalVisible(true);
  };

  const handleCloseDetails = () => {
    setTaskDetailModalVisible(false);
    setSelectedTask(null);
  };
  
  const filteredTasks =
    selectedCategory === 'All'
      ? tasks
      : tasks.filter((task) => task.priority === 'important');
    
  return (
    <View style={styles.container}>
      <CategoryList
        categories={categories}
        onCategoryPress={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onUpdate={handleUpdateTask}
        onViewDetails={handleViewDetails}
      />

      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Feather name="plus-circle" size={40} color="#6200EE" />
      </Pressable>

      <TaskModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedTaskIndex(null);
        }}
        onSave={handleSave}
        initialData={selectedTaskIndex !== null ? tasks[selectedTaskIndex]: undefined}
      />

      <TaskDetailModal
        visible={taskDetailModalVisible}
        task={selectedTask}
        onClose={handleCloseDetails}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
});