import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#54a7e9',
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
  },
  completedTodoContainer: {
    backgroundColor: '#ccc',
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
  },
  todoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedTodoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },
});
