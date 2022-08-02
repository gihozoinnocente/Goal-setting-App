import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  TextInput,
  ScrollView,//used on list or article with a short end ,when used on long list it slows down the application.
  FlatList,//render list that are scrollable but only render unseen list once a user is scrolling
} from "react-native";
import { StatusBar } from 'expo-status-bar'
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals]= useState([]);
  const [ modalIsVisible, setModalIsVisible] = useState(false);
 
  // function addGoalHandler(){
  // setCourseGoals(currentCourseGoals=>  [
  //   ...currentCourseGoals, 
  //   enteredGoalText
  // ]);
  // };

  function startAddGoalHandler(enteredGoalText){
    setModalIsVisible(true)
  }

  function endAddGoalHandler(enteredGoalText){
    setModalIsVisible(false)
  }
  function addGoalHandler(enteredGoalText){
    setCourseGoals(currentCourseGoals=>  [
      ...currentCourseGoals, 
      { text:enteredGoalText, id:Math.random().toString()}
    ]);
    endAddGoalHandler();
    };

    function deleteGoalHandler(){
      setCourseGoals(currentCourseGoals=>{
        return currentCourseGoals.filter((goal) => goal.id!== id);
      })
    }

  return (
    <>
    {/* <StatusBar /> */}
    <View style={styles.appContainer}>
      <Button 
      title='Add New Goal' 
      color="#5e0acc" 
      onPress={startAddGoalHandler}
      />
       <GoalInput 
       visible={modalIsVisible} 
       onAddGoal={addGoalHandler} 
       onCancel={endAddGoalHandler}
       />
     
      <View style={styles.goalsContainer}>
        {/* <ScrollView alwaysBounceVertical={false}>
        {courseGoals.map((goal) => 
        <View style={styles.goalItem} key={goal}>
        <Text style={styles.goalText} >{goal}</Text>
        </View>
        )}
        </ScrollView> */}
 
        <FlatList  
        data={courseGoals} 
        alwaysBounceVertical={false}
        keyExtractor={(item,index) => {{
          return item.id;
        }}}
        renderItem={(itemData)=>{
          return <GoalItem 
          text={itemData.item.text} 
          id={itemData.item.id}
          onDeleteItem={deleteGoalHandler}
          />
        }}
        />
       
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },

  goalsContainer: {
    flex: 5,
  },

});
