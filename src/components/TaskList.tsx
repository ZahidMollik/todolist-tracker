import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

type TaskListProps = {
  tasks: {
    title: string;
    description: string;
    priority: string;
    dueDate:Date|null;
    status:string;
    image: string | null;
  }[];
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
  onViewDetails: (task: any) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onUpdate, onViewDetails }) => {
  return (
    <View style={styles.listContainer}>
      {tasks.map((task, index) => (
        <Pressable
          key={index}
          style={styles.taskItem}
          onPress={() => onViewDetails(task)}  // Handle task click
        >
          <Text style={styles.taskTitle}>{task.title}</Text>
          {/* {task.image && <Image source={{ uri: task.image }} style={styles.imagePreview} />} */}
          <Text>{task.priority}</Text>
          <Text>{task.status}</Text>
          <Pressable onPress={() => onDelete(index)} style={styles.deleteButton}>
            <Feather name="trash-2" size={20} color="red" />
          </Pressable>
          <Pressable onPress={() => onUpdate(index)} style={styles.editButton}>
            <Feather name="edit" size={20} color="blue" />
          </Pressable>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 40,
  },
});

export default TaskList;


