import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type TaskModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (data: {
    title: string;
    description: string;
    priority: string;
    image: string | null;
  }) => void;
  initialData?: {
    title: string;
    description: string;
    priority: string;
    image: string | null;
  };
};

const TaskModal: React.FC<TaskModalProps> = ({
  visible,
  onClose,
  onSave,
  initialData,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setPriority(initialData.priority);
      setImage(initialData.image || null);
    }
  }, [initialData]);

  const handleSave = () => {
    onSave({ title, description, priority, image });
    resetFields();
    onClose();
  };

  const resetFields = () => {
    setTitle('');
    setDescription('');
    setPriority('Low');
    setImage(null);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera roll permissions are required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Task Details</Text>

          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            multiline
          />

          <View style={styles.priorityContainer}>
            <Pressable
              style={[
                styles.priorityButton,
                priority === 'Low' && styles.prioritySelected,
              ]}
              onPress={() => setPriority('Low')}
            >
              <Text>Low</Text>
            </Pressable>
            <Pressable
              style={[
                styles.priorityButton,
                priority === 'Medium' && styles.prioritySelected,
              ]}
              onPress={() => setPriority('Medium')}
            >
              <Text>Medium</Text>
            </Pressable>
            <Pressable
              style={[
                styles.priorityButton,
                priority === 'High' && styles.prioritySelected,
              ]}
              onPress={() => setPriority('High')}
            >
              <Text>High</Text>
            </Pressable>
          </View>

          {image && (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          )}

          <Pressable style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>
              {image ? 'Change Image' : 'Upload Image'}
            </Text>
          </Pressable>

          <View style={styles.actions}>
            <Pressable style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                resetFields();
                onClose();
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TaskModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priorityButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  prioritySelected: {
    backgroundColor: '#6200EE',
    borderColor: '#6200EE',
    color: '#FFF',
  },
  imageButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: '#6200EE',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});



