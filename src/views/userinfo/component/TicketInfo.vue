<template>
  <div>
    <a-descriptions offset="2" title="工单详情信息" layout="vertical">
      <a-descriptions-item label="用户id">Zlp user 000001</a-descriptions-item>
      <a-descriptions-item label="工单编号">zlp202303100001</a-descriptions-item>
      <a-descriptions-item label="工单创建日期">2023/03/10 17:50:12</a-descriptions-item>
      <a-descriptions-item label="工单标题" :span="2">回答用户需求以及解决问题</a-descriptions-item>
      <a-descriptions-item label="工单回复状态" style="background-color: green">已回复</a-descriptions-item>
    </a-descriptions>
    <h2>工单消息</h2>
    <a-row>
      <a-col :span="24">
        <a-card title="用户：有问题" style="width: 100%">
          <template #extra><a href="#">回复</a></template>
          <p>
            有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题
          </p>
        </a-card>
        <a-card title="客服：没事儿" style="width: 100%">
          <template #extra>{{ time }}</template>
          <p>
            没事儿没事儿没事儿没事儿没事儿没事儿没事儿没事儿没事儿没事儿没事儿没事儿没事儿
          </p>
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-textarea placeholder="回复工单" :rows="10" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-button type="primary" style="width: 100%">回复工单</a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  name: 'TicketInfo',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.ant-card {
  margin-bottom: 10px;
}
.ant-row {
  margin-bottom: 10px;
}
</style>
