<template>
  <button
    :class="buttonClass"
    :disabled="isDisabled"
    :type="type"
    @click="onClick"
    :aria-busy="loading ? 'true' : 'false'"
    :aria-disabled="isDisabled ? 'true' : 'false'"
  >
    <span v-if="!loading" :class="styles.button__content">
      <slot name="left-icon"></slot>
      <span v-if="$slots.default" :class="styles.button__text">
        <slot>Button</slot>
      </span>
      <slot name="right-icon"></slot>
    </span>

    <span v-else :class="styles.button__loader" aria-hidden="true">
      <span :class="styles.button__spinner"></span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, useSlots } from 'vue';
import styles from './button.module.scss';

const props = defineProps({
  variant: { type: String as () => 'primary' | 'alt' | 'ghost' | 'danger', default: 'primary' },
  size: { type: String as () => 'sm' | 'md' | 'lg', default: 'md' },
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  type: { type: String as () => 'button' | 'submit' | 'reset', default: 'button' },
});

const emit = defineEmits<{
  (e: 'click', ev: MouseEvent): void;
}>();

const slots = useSlots();

const isDisabled = computed(() => props.disabled || props.loading);

const buttonClass = computed(() => {
  const classes = [
    styles.button,
    styles[`button--${props.variant}`],
    styles[`button--${props.size}`],
  ];

  if (props.block) classes.push(styles['button--block']);
  if (isDisabled.value) classes.push(styles['button--disabled']);

  // Авто icon-only
  if (!slots.default && (slots['left-icon'] || slots['right-icon'])) {
    classes.push(styles['button--icon-only']);
  }

  return classes;
});

function onClick(e: MouseEvent) {
  if (isDisabled.value) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return;
  }
  emit('click', e);
}
</script>

<style lang="scss" module src="./button.module.scss"></style>
