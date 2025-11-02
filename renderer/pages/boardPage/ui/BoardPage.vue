<template>
  <div :class="styles.page">
    <header :class="styles.header">
      <h1>Kanban — Бета</h1>
      <div :class="styles.actions">
        <Button variant="primary" @click="addColumn">+ Колонка</Button>
        <Button variant="primary" @click="save">Сохранить</Button>
      </div>
    </header>

    <Board class="board" :board="board" @updateBoard="onBoardUpdate" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';

import { BoardModel, ColumnModel } from '@/entities/task/model/model';
import { Button } from '@/shared/ui/button';
import Board from '@/widgets/board/Board.vue';

import styles from './BoardPage.module.scss';

export default defineComponent({
  components: { Board, Button },
  setup() {
    const board = reactive<BoardModel>({
      id: 'board-1',
      title: 'Моя доска',
      columns: [],
    });

    async function load() {
      const data = await globalThis.electronAPI.loadData();
      if (data && data.board) {
        Object.assign(board, data.board);
      } else {
        // demo initial
        board.columns.push({
          id: 'col-1',
          title: 'To Do',
          cards: [{ id: 'c-1', title: 'Написать readme', description: '' }],
        } as ColumnModel);
        board.columns.push({
          id: 'col-2',
          title: 'In Progress',
          cards: [],
        } as ColumnModel);
      }
    }

    function addColumn() {
      board.columns.push({
        id: 'col-' + Date.now(),
        title: 'Новая колонка',
        cards: [],
      });
    }

    function onBoardUpdate(newBoard: BoardModel) {
      // простая реактивная замена
      board.columns = newBoard.columns;
    }

    async function save() {
      await globalThis.electronAPI.saveData({ board });
      alert('Сохранено');
    }

    onMounted(load);

    return { board, addColumn, onBoardUpdate, save, styles };
  },
});
</script>
