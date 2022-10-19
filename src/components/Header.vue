<template>
    <div class="todo-header">
        <input v-model="title" @keyup.enter="up" type="text" placeholder="请输入你的任务名称，按回车键确认" />
    </div>
</template>

<script   lang="ts">
import { Todo } from '@/types/todo';
import { ref, reactive, defineComponent } from 'vue';
export default defineComponent({
    name: 'Header',
    props: {
        addTodo: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        //双向绑定input 文本输入框
        const title = ref<string | null>(null);
        //键盘回车事件（回车后添加数据） 
        function up() {
            //获取到文本的数据
            const text = title.value;
            //置空文本输入框数据
            title.value = null;
            //如果文本为空 直接返回
            if (!text || !text.trim()) {
                return;
            }
            //创造一个todo对象
            const todo: Todo = {
                id: Date.now(),
                title: text,
                isCompleted: false
            }
            //放入组件中
            props.addTodo(todo);
        }
        return {
            up,
            title
        }
    }
})

</script>

<style scoped>
.todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
}

.todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>