import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import CategoryList from '../../components/CategoryList';
import TaskModal from '../../components/TaskModel';
import TaskList from '../../components/TaskList';
import TaskDetailModal from '../../components/TaskDetailModal';

type Task = {
  title: string;
  description: string;
  priority: string;
  image: string | null;
};

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskDetailModalVisible, setTaskDetailModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Important'];

  const handleSaveTask = (task: Task) => {
    if (selectedTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[selectedTaskIndex] = task;
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, task]);
    }

    setModalVisible(false);
    setSelectedTaskIndex(null);
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
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
      : tasks.filter((task) => task.priority === 'High');

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
        onViewDetails={handleViewDetails}  // Pass onViewDetails handler
      />

      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Feather name="plus-circle" size={50} color="#6200EE" />
      </Pressable>

      <TaskModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedTaskIndex(null);
        }}
        onSave={handleSaveTask}
        initialData={selectedTaskIndex !== null ? tasks[selectedTaskIndex] : undefined}
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
    bottom: 20,
    right: 20,
  },
});