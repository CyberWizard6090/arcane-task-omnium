import { defineStore } from 'pinia';

interface Task {
  id: string;
  title: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

// 🔹 Мок API для браузера
const api = (window as any).api ?? {
  loadBoard: async () => ({
    columns: [
      { id: '1', title: 'Todo', tasks: [{ id: 't1', title: 'Task 1' }] },
      { id: '2', title: 'Doing', tasks: [] },
    ],
  }),
  saveBoard: async () => {},
};

export const useBoardStore = defineStore('board', {
  state: () => ({
    columns: [] as Column[],
  }),
  actions: {
    async load() {
      const data = await api.loadBoard();
      this.columns = data.columns;
    },
    async save() {
      await api.saveBoard({ columns: this.columns });
    },
    addColumn(title: string) {
      this.columns.push({ id: Date.now().toString(), title, tasks: [] });
      this.save();
    },
    addTask(columnId: string, title: string) {
      const column = this.columns.find((c) => c.id === columnId);
      if (column) {
        column.tasks.push({ id: Date.now().toString(), title });
        this.save();
      }
    },
    moveTask(fromColumnId: string, toColumnId: string, taskIndex: number) {
      const fromCol = this.columns.find((c) => c.id === fromColumnId);
      const toCol = this.columns.find((c) => c.id === toColumnId);
      if (fromCol && toCol) {
        const [task] = fromCol.tasks.splice(taskIndex, 1);
        toCol.tasks.push(task);
        this.save();
      }
    },
  },
});
