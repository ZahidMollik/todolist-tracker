import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type TaskListProps = {
  tasks: {
    title: string;
    description: string;
    priority: string;
    dueDate: Date|null;
    status: string;
    image: string|null;
  }[];
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
  onViewDetails: (task: any) => void;
  currentpage: number;
  onPageChange: (newPage: number) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onUpdate,
  onViewDetails,
  currentpage,
  onPageChange,
}) => {
  const tasksPerPage = 5;
  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const currentTasks = tasks.slice(
    (currentpage - 1) * tasksPerPage,
    currentpage * tasksPerPage
  );
  return (
    <View style={styles.listContainer}>
      {currentTasks.map((task, index) => (
        <Pressable
          key={index}
          style={styles.taskItem}
          onPress={() => onViewDetails(task)}
        >
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text
            style={
              task.priority === 'important'
                ? { color: '#ef1d16', marginVertical: 10, fontWeight: 'bold' }
                : { color: '#1683ef', marginVertical: 10, fontWeight: 'bold' }
            }
          >
            {task.priority}
          </Text>
          <Text
            style={[
              {
                color: 'white',
                width: 80,
                height: 25,
                textAlign: 'center',
                borderRadius: 5,
                fontSize: 14,
                fontWeight: '500',
              },
              task.status === 'complete'
                ? { backgroundColor: 'green' }
                : task.status === 'expired'
                ? { backgroundColor: 'red' }
                : { backgroundColor: '#ccc', color: 'black' },
            ]}
          >
            {task.status}
          </Text>
          <Pressable
            onPress={() => onDelete((currentpage - 1) * tasksPerPage + index)}
            style={styles.deleteButton}
          >
            <Feather name="trash-2" size={20} color="red" />
          </Pressable>
          <Pressable
            onPress={() => onUpdate((currentpage - 1) * tasksPerPage + index)}
            style={styles.editButton}
          >
            <Feather name="edit" size={20} color="blue" />
          </Pressable>
        </Pressable>
      ))}
      <View style={styles.paginationContainer}>
        <Pressable
          onPress={() => onPageChange(currentpage - 1)}
          disabled={currentpage === 1}
          style={[
            styles.paginationButton,
            currentpage === 1 && styles.disabledButton,
          ]}
        >
          <Text style={styles.paginationText}>Previous</Text>
        </Pressable>

        <Text style={styles.pageIndicator}>
          Page {currentpage} of {totalPages}
        </Text>

        <Pressable
          onPress={() => onPageChange(currentpage + 1)}
          disabled={currentpage === totalPages}
          style={[
            styles.paginationButton,
            currentpage === totalPages && styles.disabledButton,
          ]}
        >
          <Text style={styles.paginationText}>Next</Text>
        </Pressable>
      </View>
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
    fontSize: 18,
    fontWeight: 'bold',
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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationButton: {
    padding: 10,
    backgroundColor: '#6200EE',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  paginationText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pageIndicator: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskList;


