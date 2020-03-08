export const num2IntArray = (num = 0) => {
  const str = num + '';
  return str.split('');
};

export const yearMonth = (time = '2019年12') => {
  // time = sessionStorage.getItem('year') + '年' + sessionStorage.getItem('month') + '月'
  // const t = time.replace('月', '').replace('年', '-');
  // const year = t.split('-')[0];
  // const month = t.split('-')[1];
  // let arr = [];
  // for(let i = month; i > 0; i--) {
  //   arr.push({
  //     label: year + '年' + i + '月',
  //     value: year + '-' + i
  //   })
  // }
  // for(let j = year - 1; j > 2016; j--) {
  //   for(let k = 12; k > 0; k--) {
  //     arr.push({
  //       label: j + '年' + k + '月',
  //       value: j + '-' + k
  //     })
  //   }
  // }
  let arr = []
  const listArr = JSON.parse(sessionStorage.getItem('timeList')) || {}
  listArr.timeList.map((item) => {
    arr.push({
      label: item.year + '年' + item.month + '月',
      value: item.year + '-' + item.month
    })
  })
  return arr;
};

// 0-半年，1-一年，2-三年
export const yearLong = (time = '2019年12月') => {
  time = sessionStorage.getItem('year') + '年' + sessionStorage.getItem('month') + '月'
  const t = time.replace('月', '').replace('年', '-');
  const year = t.split('-')[0];
  const month = t.split('-')[1];
  let arr = [];
  if (month > 2) {
    arr.push(year + '-' + (month - 2));
  } else {
    arr.push((year - 1) + '-' + (10 + (3 - month)));
  }
  arr.push((year - 1) + '-' + month);
  arr.push((year - 3) + '-' + month);
  arr.push(year + '-' + month);
  return arr;
}