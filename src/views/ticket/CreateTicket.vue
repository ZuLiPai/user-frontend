<template>
  <div>
    <h1>创建工单</h1>
    <div>
      <a-row>
        <a-col span="24">
          <a-form>
            <a-form-item
              label="工单标题"
              name="title"
              :rules="[{ required: true, message: '请输入工单标题' }]"
            >
              <a-input />
            </a-form-item>
            <a-form-item label="用户">
              <a-select
                placeholder="选择发起聊天的用户"
                :rules="[{ required: true, message: '请选择工单用户!' }]"
              >
                <a-select-option value="gong">Gong</a-select-option>
                <a-select-option value="fiery">Fiery</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item name="text" label="工单内容">
              <a-textarea
                :rules="[{ required: true, message: '请填写工单内容!' }]"
              />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit">创建工单</a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Createticket'
}
</script>

<style scoped>

</style>
