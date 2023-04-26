export const statusText = (id) => {
  switch (id) {
    case 0:
      return '已付款，等待发货'
    case 1:
      return '已发货，物流中'
    case 2:
      return '租赁中'
    case 3:
      return '商品归还中'
    case 4:
      return '验机中'
    case 5:
      return '赔偿中'
    case 6:
      return '订单完成'
    case 7:
      return '已取消'
  }
}
