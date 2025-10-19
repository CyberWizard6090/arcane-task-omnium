import { reactive, readonly } from 'vue';
import { v4 as uuidv4 } from 'uuid';
const state = reactive({
    todos: []
});
export function useTodoStore() {
    const addTodo = (text) => {
        state.todos.push({ id: uuidv4(), text });
        globalThis.api.send('save-todo', state.todos);
    };
    const removeTodo = (id) => {
        const index = state.todos.findIndex(t => t.id === id);
        if (index !== -1)
            state.todos.splice(index, 1);
        globalThis.api.send('save-todo', state.todos);
    };
    return { todos: readonly(state.todos), addTodo, removeTodo };
}
//# sourceMappingURL=todoStore.js.map