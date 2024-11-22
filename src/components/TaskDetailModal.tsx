import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Image } from 'react-native';

type TaskDetailModalProps = {
  visible: boolean;
  task: any;
  onClose: () => void;
};

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ visible, task, onClose }) => {
  if (!task) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{task.title}</Text>
          {task.image && <Image source={{ uri: task.image }} style={styles.imagePreview} />}
          <Text style={styles.priority}>{task.priority}</Text>
          <Text style={styles.description}>{task.description}</Text>
          
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  priority: {
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TaskDetailModal;
