import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TaskScreen = ({navigation}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [subTasks, setSubTasks] = useState([]);
  const [currentSubTask, setCurrentSubTask] = useState('');
  const scrollViewRef = useRef(null); // Reference for scrolling

  // Add subtask function
  const addSubTask = () => {
    if (currentSubTask.trim()) {
      setSubTasks([...subTasks, { id: Date.now(), subTask: currentSubTask }]);
      setCurrentSubTask('');
      // Scroll to the bottom after adding a subtask
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100); // Delay to ensure the new item is rendered
    }
  };

  // Delete subtask function
  const deleteSubTask = (id) => {
    setSubTasks(subTasks.filter((task) => task.id !== id));
  };

  // Add task function (for saving the task title and subtasks)
  const addTask = () => {
    if (taskTitle.trim()) {
      // Here, you can handle saving the main task
      console.log('Task Title:', taskTitle);
      console.log('SubTasks:', subTasks);
      setTaskTitle('');
      setSubTasks([]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
        <Text style={styles.header}>New Tasks</Text>

        {/* Top Image */}
        <Image source={require('../../assets/taskImg.png')} style={styles.topImage} />
        <Text style={styles.subheader}>You can add your new set of todo list using the form below. Set the title and tasks to acconmplish</Text>

        {/* Scroll View for Task Title and Subtasks */}
        <ScrollView
          style={styles.scrollView}
          ref={scrollViewRef} // Assign ref to ScrollView
          keyboardShouldPersistTaps="handled"
        >

          {/* Input field for Task Title */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#ccc"
              value={taskTitle}
              onChangeText={(text) => setTaskTitle(text)}
              autoFocus // Automatically focus on this field when the component mounts
            />
          </View>

          {/* List of SubTasks */}
          {subTasks.length > 0 && (
            <FlatList
              data={subTasks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.subTaskContainer}>
                  <TextInput
                    style={styles.input}
                    value={item.subTask}
                    onChangeText={(text) => {
                      // Update the specific subtask on text change
                      const updatedSubTasks = subTasks.map(subTask =>
                        subTask.id === item.id ? { ...subTask, subTask: text } : subTask
                      );
                      setSubTasks(updatedSubTasks);
                    }}
                    onFocus={() => scrollViewRef.current.scrollToEnd({ animated: true })} // Scroll to end on focus
                  />
                  <TouchableOpacity style={styles.iconButton} onPress={() => deleteSubTask(item.id)}>
                    <Icon name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              )}
              // Ensure FlatList scrolls to last item
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            />
          )}

          {/* Input field for new SubTasks */}
          <View style={[styles.subTaskContainer, { marginTop: 2, marginBottom: 5 }]}>
            <TextInput
              style={styles.input}
              placeholder="Add Task"
              placeholderTextColor="#ccc"
              value={currentSubTask}
              onChangeText={(text) => setCurrentSubTask(text)}
              onSubmitEditing={addSubTask} // Add subtask on pressing enter
            />
            <TouchableOpacity style={styles.iconButton} onPress={addSubTask}>
              <Icon name="plus" size={20} color="#01796F" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
       {/* Save Task Button outside of ScrollView */}
        <TouchableOpacity style={styles.saveButton} onPress={[addTask,navigation.goBack()]}>
          <Text style={styles.saveButtonText}>Save Task</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  topImage: {
    width: 400,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  subheader:{
    marginBottom: 10,
    fontSize: 16,
    textAlign:'center',
    paddingHorizontal: 30
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    marginBottom: 10,
    padding: 5,
  },
  subTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  iconButton: {
    padding: 10,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#01796F',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 30, 
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
   cancelButton: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 30, 
  },
  cancelButtonText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TaskScreen;