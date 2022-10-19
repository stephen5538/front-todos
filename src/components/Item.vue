<template>
  <!-- 增加鼠标移入移出事件 显示删除按钮 -->
  <li :style="{backgroundColor:bgColor,color:myColor}" @mouseenter="mouseHandler(true)"
    @mouseleave="mouseHandler(false)">
    <label>
      <input type="checkbox" v-model="isComp" />

      <span>{{todo.title}},{{todo.isCompleted}}</span>
    </label>
    <!-- <button class="btn btn-danger" style="display:none">删除</button> -->
    <button class="btn btn-danger" @click="delTodo" v-show="isShow">删除</button>
  </li>
</template>

<script   lang="ts">
import { Todo } from '../types/todo';
import { ref, reactive, defineComponent, computed } from 'vue';
export default defineComponent({
  name: 'Item',
  props: {
    todo: {
      type: Object as () => Todo, // 函数返回的是Todo类型
      required: true,
    },
    deleteTodo: {
      type: Function,
      required: true,
    },
    updateTodo: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {


    
    //============================点击checkbox选中逻辑 begin================
    //子级组件不能直接修改父级属性
    //计算属性
    const isComp = computed({
      //获取属性
      get() {
        return props.todo.isCompleted;
      },
      //设置属性方法
      set(newValue: boolean) {
        //子级组件不能直接修改父级属性 直接报错
        // props.todo.isCompleted = newValue;
        props.updateTodo(props.todo, newValue);
      }
    });
    //============================点击checkbox选中逻辑 begin================


    //============================删除按钮逻辑 begin================
    const bgColor = ref<string>('white');
    const myColor = ref<string>('black');
    const isShow = ref<boolean>(false);
    //鼠标移入/出 显示或隐藏 删除按钮
    const mouseHandler = (flag: boolean) => {
      if (flag) {
        bgColor.value = 'pink';
        myColor.value = 'green';
        isShow.value = true;
      } else {
        bgColor.value = 'white';
        myColor.value = 'black';
        isShow.value = false;
      }
    }
    const delTodo = () => {
      if (window.confirm('确定要删除吗？')) {
        props.deleteTodo(props.index);
      }
    }
    //============================删除按钮逻辑 end================

    return {
      isComp,
      mouseHandler, bgColor, myColor, isShow, delTodo
    }
  }
})

</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>