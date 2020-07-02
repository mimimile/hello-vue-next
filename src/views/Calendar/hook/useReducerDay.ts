import { Ref } from 'vue';
import { Action } from '@/types/index';

function addMonth(state: Ref<number[]>) {
  const val = state.value.map(Number);
  const numMonth = val[1];
  if (numMonth + 1 > 12) {
    val[0] += 1;
    val[1] = 1;
    state.value = val;
  } else {
    val[0] += 1;
    state.value = val;
  }
}

function cutMonth(state: Ref<number[]>) {
  const val = state.value.map(Number);
  const numMonth = val[1];
  if (numMonth - 1 === 0) {
    val[0] -= 1;
    val[1] = 12;
    state.value = val;
  } else {
    val[1] -= 1;
    state.value = val;
  }
}

export const useReducerDate = (state: Ref<number[]>) => function (action: Action) {
  switch (action.type) {
    case 'preYear': {
      const val = state.value.map(Number);
      val[0] -= 1;
      state.value = val;
      break;
    }
    case 'preMonth': {
      cutMonth(state);
      break;
    }
    case 'nextYear': {
      const val = state.value.map(Number);
      val[0] += 1;
      state.value = val;
      break;
    }
    case 'nextMonth': {
      addMonth(state);
      break;
    }
    default: {
      state.value = new Date().toLocaleDateString().split('/').map(Number);
    }
  }
};

export const demo = 1;
