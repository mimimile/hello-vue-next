<template>
  <div class="calendar wrap">
    <div class="top">
      <p v-for="(el, idx) in daylist" :key='`${el}${idx}`'>
        {{el}}
      </p>
    </div>
    <div class="content">
      <p class="item" v-for="(el, index) in maxDays" :key="index">
        <span
          :class="['day', el.isActive ? 'isactive' : '']"
          v-if="index - state.currentMonthFirstDay >= 0
            && state.currentMonthMaxDays + state.currentMonthFirstDay - 1 >= index"
        >
          {{ index - state.currentMonthFirstDay + 1 }}
        </span>

        <span
          class="day rest"
          v-else-if="state.currentMonthMaxDays + state.currentMonthFirstDay - 1 < index"
        >
          {{index - (state.currentMonthMaxDays + state.currentMonthFirstDay - 1)}}
        </span>
        <span
          class="day rest"
          v-else
        >
          {{state.preMonthMaxDays - (state.currentMonthFirstDay - index - 1)}}
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, reactive } from 'vue';
import { item } from '@/types';
import { useComputedDay } from './hook/useComputedDay';

export default {
  // setup(props, { root }) {
  setup(props) {
    const nowDay = new Date().toLocaleDateString().split('/').map(Number);
    const dayStr = ref<number[]>(nowDay);
    console.log('nowDay', nowDay);
    const daylist = ['日', '一', '二', '三', '四', '五', '六'];
    const {
      date,
      currentYear,
      currentMonth,
      currentDate,
      currentDay,
      currentMonthMaxDays,
      preMonthMaxDays,
      currentMonthFirstDay,
    } = useComputedDay(dayStr);
    const maxDays = ref<item[]>([]);
    console.log('currentMonthFirstDay', currentMonthFirstDay);
    console.log('currentDate', currentDate);
    watch([currentMonthFirstDay, currentDate], () => {
      const daysArr = Array.from({ length: 7 * 6 }, (el, idx) => {
        if (idx === (currentMonthFirstDay.value + currentDate.value - 1)
          && new Date().getFullYear() === currentYear.value
          && new Date().getMonth() + 1 === currentMonth.value
          && new Date().getDate() === currentDate.value
        ) {
          return ({ isActive: true });
        }
        return ({ isActive: false });
      });
      console.log('daysArr', daysArr);
      maxDays.value = daysArr;
    }, { immediate: true });

    const state = reactive({
      currentMonthFirstDay,
      currentMonthMaxDays,
      currentDate,
      preMonthMaxDays,
    });

    return {
      daylist,
      maxDays,
      state,
    };
  },
};
</script>

<style lang="less">
#app {
  .wrap {
    width: 290px;
  }
  .textheader {
    display: flex;
    justify-content: space-evenly;
    line-height: 30px;
    .textItem {
      align-self: center;
      cursor: pointer;
    }
  }
  .top {
    border-top: 1px solid #d3d3d3;
    border-bottom: 1px solid #d3d3d3;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap
  }
  .content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap
  }
  .rest {
    color: #ccc
  }
  .item {
    width: 40px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    border-radius: 50%;
    .day {
      display: inline-block;
      width: 100%;
      height: 100%;
      line-height: 40px;
      border-radius: 50%;
    }
    .isactive {
      border-radius: 50%;
      background: #409eff;
      color: #fff;
    }
  }
}
</style>
