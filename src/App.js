import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import NewTodo from './components/NewTodo/NewTodo';
import Todo from './components/Todo/Todo';

const App = () => {
  const [data, setData] = useState([]);
  const [newTodo, setNewTodo] = useState();

  const setObjectValue = async value => {
    const jsonValue = JSON.stringify(value);
    try {
      await AsyncStorage.setItem('myTodoList', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getMyObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('myTodoList');
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMyObject()
      .then(res => {
        if (!res) return;

        setData(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      setObjectValue(data);
    }
  }, [data]);

  const handleComplete = id => {
    setData(oldData => {
      const newData = [...oldData];
      const todo = newData.find(item => String(item.id) === String(id));
      todo.completed = !todo.completed;
      return newData;
    });
  };

  const handleTodo = text => {
    setNewTodo({
      id: Math.random().toString(),
      text,
      completed: false,
    });
  };

  const submitNewTodo = () => {
    setData(oldData => [...oldData, newTodo]);
    setNewTodo('');
  };

  const handleDelete = id => {
    Alert.alert('Siliniyor...', 'Silmek istediğinize emin misiniz?', [
      {
        text: 'İptal',
      },
      {
        text: 'Sil',
        onPress: () =>
          setData(oldData => {
            const newData = oldData.filter(
              item => String(item.id) !== String(id),
            );
            return newData;
          }),
      },
    ]);
  };

  const renderTodo = item => (
    <Todo todo={item} onPress={handleComplete} onLongPress={handleDelete} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Yapılacaklar</Text>
        <Text style={styles.todoCounter}>
          {data.filter(item => !item.completed).length}
        </Text>
      </View>

      {data.length > 0 ? (
        <FlatList style={styles.todos} data={data} renderItem={renderTodo} />
      ) : (
        <View style={styles.todos}>
          <Text style={styles.noTodos}>Yapılacaklar Listesi Boş</Text>
        </View>
      )}

      <View style={styles.bottomBar}>
        <NewTodo
          handlePress={submitNewTodo}
          handleTodo={handleTodo}
          todo={newTodo}
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  topBar: {
    backgroundColor: '#2564cf',
    paddingHorizontal: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 24,
  },
  todoCounter: {
    backgroundColor: '#fff',
    color: '#2564cf',
    padding: 5,
    fontSize: 16,
    borderRadius: 4,
  },
  todos: {
    backgroundColor: '#fff',
    padding: 10,
    flex: 1,
  },
  noTodos: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomBar: {
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom: 0,
  },
});
