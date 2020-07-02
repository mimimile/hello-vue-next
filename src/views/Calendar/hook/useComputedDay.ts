/* eslint-disable max-len */
import { Ref, computed } from 'vue';
import { DateFn } from '@/types/index';

// 计算当月1号星期几
const computedFirstDay: DateFn<number> = (year, month) => new Date(`${year}/${month}/1`).getDay();

// 计算当月天数
const getMonthMaxDays: DateFn<number> = (year, month) => {
  if (month - 1 < 1) {
    const resultDate = new Date(`${year - 1}/12/1`);
    resultDate.setDate(0);
    return resultDate.getDate();
  } if (month + 1 > 12) {
    const resultDate = new Date(`${year + 1}/1/1`);
    resultDate.setDate(0);
    return resultDate.getDate();
  }
  const resultDate = new Date(`${year}/${month + 1}/1`);
  resultDate.setDate(0);
  return resultDate.getDate();
};

export const useComputedDay = (str: Ref<number[]>) => {
  // 注入了依赖
  const date = computed(() => new Date(str.value.join('/')));
  // 年
  const currentYear = computed(() => date.value.getFullYear());
  // 月
  const currentMonth = computed(() => date.value.getMonth() + 1);
  // 日
  const currentDate = computed(() => date.value.getDate());
  // 星期
  const currentDay = computed(() => date.value.getDay());
  // 当月最大天数
  const currentMonthMaxDays = computed(() => getMonthMaxDays(currentYear.value, currentMonth.value));
  // 当月星期几
  const currentMonthFirstDay = computed(() => computedFirstDay(currentYear.value, currentMonth.value));
  // 上个月最大天数
  const preMonthMaxDays = computed(() => getMonthMaxDays(currentYear.value, currentMonth.value - 1));

  return {
    date,
    currentYear,
    currentMonth,
    currentDate,
    currentDay,
    currentMonthMaxDays,
    preMonthMaxDays,
    currentMonthFirstDay,
  };
};

export const demo = 1;
