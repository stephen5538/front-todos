import { Todo } from "@/types/todo";
/**
 * 
 * @param todos 
 */
export function saveTodos(todos: Todo[]) {
    localStorage.setItem("todos_key", JSON.stringify(todos));
}

/**
 * 读取数据
 * @returns 
 */
export function readTodos(): Todo[] {
    return JSON.parse(localStorage.getItem("todos_key") || '[]');
}