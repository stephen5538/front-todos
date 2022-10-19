<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo" />
      <Footer :todos="todos" :checkAll="checkAll" :clearChecked="clearChecked" />
    </div>
  </div>
</template>

<script   lang="ts">
import { ref, reactive, defineComponent, toRefs, watch, onMounted } from 'vue';
import Header from './components/Header.vue';
import List from './components/List.vue';
import Footer from './components/Footer.vue';
import { Todo } from './types/todo';
import { saveTodos, readTodos } from './utils/LocalStorageUtils';

export default defineComponent({
  name: 'App',
  components: {
    Header, List, Footer
  },
  setup() {
    //初始化数组
    // const state = reactive<{ todos: Todo[] }>({
    //   todos: [
    //     { id: 1, title: '奔驰', isCompleted: false },
    //     { id: 2, title: '宝马', isCompleted: true },
    //     { id: 3, title: '奥迪', isCompleted: false },
    //   ]
    // });
    
    const state = reactive<{ todos: Todo[] }>({
      todos: []
    });

    onMounted(() => {
      setTimeout(() => {
        state.todos = readTodos();
      },500)
    });


    /**
     * 添加数据方法
     * @param todo 对象
     */
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo);
    }
    /**
     * 删除数据
     * @param index 索引号
     */
    const deleteTodo = (index: number) => {
      state.todos.splice(index, 1);
    }
    /**
     * 修改isCompleted属性
     * @param todo 
     * @param value 
     */
    const updateTodo = (todo: Todo, value: boolean) => {
      todo.isCompleted = value;
    }
    /**
     * 全选/全不选
     * @param todo 
     * @param value 
     */
    const checkAll = (value: boolean) => {
      state.todos.forEach((todo) => {
        todo.isCompleted = value;
      })
    }
    /**
     * 清空选中数据
      */
    const clearChecked = () => {
      state.todos = state.todos.filter((todo) => !todo.isCompleted);
    }

    // watch(() => state.todos, value => {
    //   saveTodos(value);
    // }, { deep: true });

    watch(() => state.todos, saveTodos, { deep: true });


    return {
      ...toRefs(state),
      addTodo, deleteTodo, updateTodo, checkAll, clearChecked
    }
  }
})

</script>

<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>