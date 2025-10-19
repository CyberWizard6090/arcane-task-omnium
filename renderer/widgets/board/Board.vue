<template>
  <div class="board">
    <div class="columns">
      <Column
        v-for="col in board.columns"
        :key="col.id"
        :column="col"
        @moveCard="onMoveCard"
        @updateColumn="emitUpdate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw } from 'vue';
import Column from '@entities/board/column/Column.vue';
import { BoardModel, ColumnModel } from '@/entities/task/model/model';

export default defineComponent({
  props: {
    board: { type: Object as () => BoardModel, required: true },
  },
  components: { Column },
  emits: ['updateBoard'],
  setup(props, { emit }) {
    function onMoveCard(payload: {
      fromColumnId: string;
      toColumnId: string;
      cardId: string;
      toIndex: number;
      card: any;
    }) {
      const from = props.board.columns.find((c) => c.id === payload.fromColumnId)!;
      const to = props.board.columns.find((c) => c.id === payload.toColumnId)!;
      const cardIndex = from.cards.findIndex((c) => c.id === payload.cardId);
      const [card] = from.cards.splice(cardIndex, 1);
      to.cards.splice(payload.toIndex, 0, card);
      emit('updateBoard', toRaw(props.board));
    }

    function emitUpdate(newCol: ColumnModel) {
      emit('updateBoard', toRaw(props.board));
    }

    return { onMoveCard, emitUpdate };
  },
});
</script>
