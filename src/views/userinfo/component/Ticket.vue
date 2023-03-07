<template>
  <a-table :columns="columns" :data-source="data">
    <a slot="name" slot-scope="text">{{ text }}</a>
    <span slot="customTitle">工单编号</span>
    <span slot="tags" slot-scope="tags">
      <a-tag
        v-for="tag in tags"
        :key="tag"
        :color="tag === '未回复' ? 'red' : 'green'"
      >
        {{ tag.toUpperCase() }}
      </a-tag>
    </span>
    <span slot="action">
      <a>查看详情</a>
    </span>
  </a-table>
</template>

<script>
const columns = [
  {
    dataIndex: 'id',
    key: 'id',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '工单标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '状态',
    key: 'state',
    dataIndex: 'state',
    scopedSlots: { customRender: 'tags' }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    key: '1',
    id: '1',
    title: '相机价格详情',
    state: ['未回复']
  },
   {
    key: '2',
    id: '2',
    title: '相机价格详情2',
    state: ['已回复']
  },
  {
    key: '3',
    id: '3',
    title: '相机价格详情3',
    state: ['已回复']
  },
  {
    key: '4',
    id: '4',
    title: '相机价格详情4',
    state: ['已回复']
  },
  {
    key: '5',
    id: '5',
    title: '相机价格详情5',
    state: ['已回复']
  },
  {
    key: '6',
    id: '6',
    title: '相机价格详情6',
    state: ['已回复']
  }
]

export default {
  name: 'Ticket',
  data () {
    return {
      data,
      columns
    }
  }
}
</script>

<style scoped>

</style>
