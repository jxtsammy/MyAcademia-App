import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../CustomNavigations/CustomDawer'
import Timetable from '../Timetable&Schedules/Timetable'
import Tasks from '../TaskPlanner/Tasks'
import CWACalculator from '../AvgCalculator/CWACalculator'
import AiChat from '../AiChat/ChatScreen'
import EditProfile from '../ProfileSettings/EditProfile'
import Home from '../Home/Home'

const Drawer = createDrawerNavigator();


const TaskManager = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Task List');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [categories, setCategories] = useState([
    {
      id: 0,
      name: 'All Tasks',
      color: '#E0E0E0',
      icon: '📋',
      tasks: []
    },
    {
      id: 1,
      name: 'Works',
      count: 3,
      color: '#FFE8B2',
      icon: '💼',
      tasks: [
        { id: 1, title: 'Email Check', completed: true, icon: '📧' },
        { id: 2, title: 'Weekly Meeting', completed: false, icon: '👥' },
        { id: 3, title: 'Project Review', completed: false, icon: '📊' },
      ]
    },
    {
      id: 2,
      name: 'Sport',
      count: 10,
      color: '#E8F5E9',
      icon: '🏃',
      tasks: [
        { id: 4, title: 'Morning Run', completed: false, icon: '🏃' },
        { id: 5, title: 'Gym Session', completed: true, icon: '💪' },
        { id: 6, title: 'Tennis Practice', completed: false, icon: '🎾' },
      ]
    },
    {
      id: 3,
      name: 'Habits',
      count: 4,
      color: '#E3F2FD',
      icon: '✨',
      tasks: [
        { id: 7, title: 'Read 30 mins', completed: false, icon: '📚' },
        { id: 8, title: 'Meditate', completed: true, icon: '🧘' },
        { id: 9, title: 'Journal', completed: false, icon: '📝' },
      ]
    },
  ]);

  const allTasks = categories.flatMap(category =>
    category.id === 0 ? [] : category.tasks
  );

  const completedTasks = allTasks.filter(task => task.completed);

  // Calculate progress for a category
  const calculateProgress = (categoryTasks) => {
    if (!categoryTasks || categoryTasks.length === 0) return 0;
    const completed = categoryTasks.filter(task => task.completed).length;
    return (completed / categoryTasks.length) * 100;
  };

  // Calculate progress for all tasks
  const calculateAllTasksProgress = () => {
    return calculateProgress(allTasks);
  };

  // Update categories with the current task count
  const categoriesWithUpdatedAllTasks = categories.map(category =>
    category.id === 0
      ? { ...category, count: allTasks.length, tasks: allTasks }
      : category
  );

  // Function to toggle task completion - Updated to handle both category and all tasks views
  const toggleTaskCompletion = (taskId) => {
    const updatedCategories = categories.map(category => {
      if (category.id === 0) return category;

      const updatedTasks = category.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );

      return {
        ...category,
        tasks: updatedTasks
      };
    });

    setCategories(updatedCategories);

    // If a category is selected, update the selectedCategory state to reflect changes
    if (selectedCategory) {
      const updatedSelectedCategory = updatedCategories.find(
        cat => cat.id === selectedCategory.id
      );
      setSelectedCategory(updatedSelectedCategory);
    }
  };

  const renderProgressBar = (progress) => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );

  const renderCategoryItem = ({ item }) => {
    const progress = item.id === 0
      ? calculateAllTasksProgress()
      : calculateProgress(item.tasks);

    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item.id === 0 ? null : item)}
        style={[
          styles.categoryCard,
          { backgroundColor: item.color },
          (selectedCategory?.id === item.id || (item.id === 0 && selectedCategory === null)) &&
            styles.selectedCategoryCard
        ]}
      >
        <Text style={styles.categoryIcon}>{item.icon}</Text>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryCount}>
          +{item.id === 0 ? allTasks.length : item.tasks.length} task
        </Text>
        {renderProgressBar(progress)}
      </TouchableOpacity>
    );
  };

  // Get the current tasks to display based on activeTab and selectedCategory
  const getCurrentTasks = () => {
    if (activeTab === 'Completed') {
      return completedTasks;
    }
    if (selectedCategory) {
      return selectedCategory.tasks;
    }
    return allTasks;
  };

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() => toggleTaskCompletion(item.id)}
    >
      <View style={styles.taskLeft}>
        <Text style={styles.taskIcon}>{item.icon}</Text>
        <Text style={[
          styles.taskTitle,
          item.completed && styles.taskTitleCompleted
        ]}>{item.title}</Text>
      </View>
      <View
        style={[
          styles.checkbox,
          item.completed && styles.checkboxChecked
        ]}
      >
        {item.completed && (
          <Feather name="check" size={16} color="white" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#000" fontWeight="bold"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Task List' && styles.activeTab]}
          onPress={() => setActiveTab('Task List')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'Task List' ? styles.activeTabText : styles.inactiveTabText
          ]}>Task List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Completed' && styles.activeTab]}
          onPress={() => setActiveTab('Completed')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'Completed' ? styles.activeTabText : styles.inactiveTabText
          ]}>Completed</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categoriesWithUpdatedAllTasks}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id.toString()}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContentContainer}
      />

      <View style={styles.taskListContainer}>
        <View style={styles.taskListHeader}>
          <Text style={styles.sectionTitle}>
            {activeTab === 'Completed' ? 'Completed Tasks' :
             selectedCategory ? `${selectedCategory.name}` : 'All Tasks'}
          </Text>
        </View>

        <FlatList
          data={getCurrentTasks()}
          renderItem={renderTaskItem}
          keyExtractor={item => item.id.toString()}
          style={styles.taskList}
          contentContainerStyle={styles.taskListContent}
        />
      </View>

      <TouchableOpacity style={styles.plusButton} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          width:'100%'
        }}
      >
      <Drawer.Screen name="TaskManager" component={TaskManager} options={{ headerShown: false }}/>
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Drawer.Screen name="Timetable" component={Timetable} options={{ headerShown: false }}/>
        <Drawer.Screen name="Tasks" component={Tasks} options={{ headerShown: false }}/>
        <Drawer.Screen name="CWACalculator" component={CWACalculator} options={{ headerShown: false }}/>
        <Drawer.Screen name="AiChat" component={AiChat} options={{ headerShown: false }}/>
        <Drawer.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
      </Drawer.Navigator>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#01796f',
    borderRadius: 30,
    padding: 5,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center', // Center the tab container
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 18,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
  },
  inactiveTabText: {
    color: '#fff',
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  categoriesContainer: {
    maxHeight: 140,
    padding: 10,
  },
  categoriesContentContainer: {
    paddingRight: 20,
  },
  categoryCard: {
    width: 120,
    height: 120,
    borderRadius: 20,
    borderTopRightRadius: 70,
    padding: 16,
    marginRight: 12,
    justifyContent: 'space-between',
  },
  selectedCategoryCard: {
    borderWidth: 2,
    borderColor: '#000',
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 2,
  },
  taskListContainer: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  taskListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    fontSize: 20
  },
  taskList: {
    flex: 1,
  },
  taskListContent: {
    paddingBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 40,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    paddingVertical: 20
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#01796f',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#01796f',
  },
  plusButton: {
    position: 'absolute',
    right: 20,
    bottom: 45,
    backgroundColor: '#fff',
    borderRadius: 60,
    height: 50,
    width: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  plusButtonText: {
    fontSize: 40,
    color: '#01796F',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default App;