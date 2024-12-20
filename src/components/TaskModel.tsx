import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import apiClient from "../api/apiClient";

type TaskModalProps = {
  visible: boolean;
  onSave:()=> void;
  onClose: () => void;
  initialData?: {
    title: string;
    description: string;
    priority: string;
    dueDate: Date | null;
    status:string;
    image: string | null;
    _id:string|undefined;
  };
};

const TaskModal: React.FC<TaskModalProps> = ({ visible, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [status, setStatus] = useState<string>("pending");
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setPriority(initialData.priority);
      setImage(initialData.image || null);
      setDueDate(initialData.dueDate || null);
    }
  }, [initialData]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const handleSave = async () => {
    if (!title || !description || !priority || !dueDate) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("priority", priority);
      formData.append("dueDate", dueDate.toISOString());
      if (image) {
        const localUri = image;
        const filename = localUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename || "");
        const fileType = match ? `image/${match[1]}` : "image";

        formData.append("image", {
          uri: localUri,
          name: filename,
          type: fileType,
        } as any);
      }
  
      await apiClient.post("/task/create", formData,{
        headers: { "Content-Type": "multipart/form-data" },});
      Alert.alert("Success", "Task has been saved!");
      onClose();
      onSave();
      resetFields();
    } catch (error:any) {
      Alert.alert("Error:",error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const task = { title, description, priority, dueDate,status, image };
      
      await apiClient.patch(`/task/update/${initialData?._id}`, task);
      Alert.alert("Success", "Task has been updated!");
      onSave();
      onClose();
    } catch (error:any) {
      Alert.alert("Error",error.message);
    }
  };

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setPriority("");
    setImage(null);
    setDueDate(null);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera roll permissions are required.");
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
                priority === "general" && styles.prioritySelected,
              ]}
              onPress={() => setPriority("general")}
            >
              <Text
                style={priority === "general" ? styles.prioritySelectedText : {}}
              >
                general
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.priorityButton,
                priority === "important" && styles.prioritySelected,
              ]}
              onPress={() => setPriority("important")}
            >
              <Text
                style={priority === "important" ? styles.prioritySelectedText : {}}
              >
                important
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {dueDate ? `Due Date: ${dueDate}` : "Set Due Date"}
            </Text>
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          {
            initialData && <View style={styles.priorityContainer}>
            <Pressable
              style={[
                styles.priorityButton,
                status === "complete" && styles.prioritySelected,
              ]}
              onPress={() => setStatus("complete")}
            >
              <Text
                style={status === "complete" ? styles.prioritySelectedText : {}}
              >
                Complete
              </Text>
            </Pressable>
            
          </View>
          }

          {image && (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          )}

          <Pressable style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>
              {image ? "Change Image" : "Upload Image"}
            </Text>
          </Pressable>

          <View style={styles.actions}>
            <Pressable style={styles.button} onPress={initialData?handleUpdate:handleSave}>
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
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  priorityButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  prioritySelected: {
    backgroundColor: "#6200EE",
    borderColor: "#6200EE",
  },
  prioritySelectedText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  imageButton: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  imageButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagePreview: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    backgroundColor: "#6200EE",
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  dateButton: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  dateButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
});

