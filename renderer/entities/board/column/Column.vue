<template>
  <div class="column" @dragover.prevent @drop="onDrop">
    <div class="column-header">
      <input v-model="local.title" @blur="saveTitle" />
      <button @click="addCard">+ Card</button>
    </div>

    <div class="cards">
      <div
        v-for="(card, idx) in column.cards"
        :key="card.id"
        class="card"
        draggable="true"
        @dragstart="onDragStart(card)"
        @dragend="onDragEnd"
        @dragover.prevent
        @drop="onCardDrop(idx)"
      >
        <strong>{{ card.title }}</strong>
        <div class="desc">{{ card.description }}</div>
        <button @click="removeCard(card.id)">✖</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

import { ColumnModel, CardModel } from '@/entities/task/model/model';

export default defineComponent({
  props: { column: { type: Object as () => ColumnModel, required: true } },
  emits: ['moveCard', 'updateColumn'],
  setup(props, { emit }) {
    const local = ref({ title: props.column.title });

    watch(
      () => props.column.title,
      (v) => (local.value.title = v),
    );

    function saveTitle() {
      props.column.title = local.value.title;
      emit('updateColumn', props.column);
    }

    function addCard() {
      props.column.cards.push({
        id: 'card-' + Date.now(),
        title: 'Новая задача',
        description: '',
      } as CardModel);
      emit('updateColumn', props.column);
    }

    function removeCard(cardId: string) {
      const idx = props.column.cards.findIndex((c) => c.id === cardId);
      if (idx >= 0) props.column.cards.splice(idx, 1);
      emit('updateColumn', props.column);
    }

    // Drag state stored in window to cross columns
    function onDragStart(card: CardModel) {
      (globalThis as any)._dragCard = { card, fromColumnId: props.column.id };
    }
    function onDragEnd() {
      delete (globalThis as any)._dragCard;
    }
    function onDrop() {
      const drag = (globalThis as any)._dragCard;
      if (!drag) return;
      // append to end
      emit('moveCard', {
        fromColumnId: drag.fromColumnId,
        toColumnId: props.column.id,
        cardId: drag.card.id,
        toIndex: props.column.cards.length,
        card: drag.card,
      });
      delete (globalThis as any)._dragCard;
    }
    function onCardDrop(idx: number) {
      return () => {
        const drag = (globalThis as any)._dragCard;
        if (!drag) return;
        emit('moveCard', {
          fromColumnId: drag.fromColumnId,
          toColumnId: props.column.id,
          cardId: drag.card.id,
          toIndex: idx,
          card: drag.card,
        });
        delete (globalThis as any)._dragCard;
      };
    }

    return { local, saveTitle, addCard, removeCard, onDragStart, onDragEnd, onDrop, onCardDrop };
  },
});
</script>
