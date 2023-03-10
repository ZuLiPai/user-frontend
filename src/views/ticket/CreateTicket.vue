<template>
  <div>
    <a-row style="max-width: 50%; margin: 0 auto">
      <a-col span="24">
        <a-card>
          <h1 style="font-size: 28px">工单系统</h1>
          <h3>遇到了问题？请先<a>查看帮助</a></h3>
          <a-divider/>
          <h4>新建工单：</h4>
          <a-form>
            <a-form-item
              label="标题"
              name="title"
              :rules="[{ required: true, message: '请输入工单标题' }]"
            >
              <a-input />
            </a-form-item>
            <a-form-item name="text" label="内容" >
              <a-textarea
                :rules="[{ required: true, message: '请填写工单内容!' }]"
                :auto-size="{ minRows: 5, maxRows: 10 }"
              />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit">提交</a-button>
            </a-form-item>
            <a-divider/>
            <h4>工单记录：</h4>
            <template>
              <a-table :columns="columns" :data-source="data">
                <a slot="ID" slot-scope="text">{{ text }}</a>
                <span slot="customTitle"><a-icon type="smile-o" /> ID</span>
                <span slot="tags" slot-scope="tags">
                  <a-tag
                    v-for="tag in tags"
                    :key="tag"
                    :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                  >
                    {{ tag.toUpperCase() }}
                  </a-tag>
                </span>
                <span slot="operation" >
                  <a>查看详情</a>
                </span>
              </a-table>
            </template>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: 'ID',
    key: 'ID',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'ID' }
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    scopedSlots: { customRender: '状态' }
  },
  {
    title: '操作',
    key: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

const data = [
  {
    key: '1',
    ID: 1,
    title: '镜头摔了',
    date: '2023.3.10',
    status: '处理中'
  }
]
export default {
  name: 'Createticket',
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
