<template>
  <div>
    <a-card hoverable style="width: 240px">
      <template #cover>
        <img alt="example" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
      </template>
      <a-card-meta title="索尼 Sony a7m3">
        <template #description>
          <a-tag>索尼</a-tag>
          <a-tag>全画幅</a-tag>
        </template>
      </a-card-meta>
      <p>280元/天 起租</p>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'ItemCard'
}
</script>

<style scoped>
p {
  margin-top: 15px;
}
.ant-card {
  margin-bottom: 20px;
}
</style>
