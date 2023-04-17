<template>
  <div>
    <a-card>
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :loading="memberLoading"
      >
        <template v-for="(col, i) in ['name', 'phone', 'address']" :slot="col" slot-scope="text, record">
          <a-input
            :key="col"
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            :placeholder="columns[i].title"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{ text }}</template>
        </template>
        <template slot="operation" slot-scope="text, record">
          <template v-if="record.editable">
            <span v-if="record.isNew">
              <a @click="saveRow(record)">添加</a>
              <a-divider type="vertical" />
              <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                <a>删除</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="saveRow(record)">保存</a>
              <a-divider type="vertical" />
              <a @click="cancel(record.key)">取消</a>
            </span>
          </template>
          <span v-else>
            <a :disabled="editKey !== ''" @click="toggle(record.key)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </template>
      </a-table>
      <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newAddress">新增地址</a-button>
    </a-card>
  </div>

</template>

<script>
import { addAddress, deleteAddress, getUserAddresses, updateAddress } from '@/api/address'
import storage from 'store'
import { message } from 'ant-design-vue'

export default {
  data () {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      },
      columns: [
        {
          title: '收件人姓名',
          dataIndex: 'name',
          key: 'name',
          width: '20%',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
          width: '20%',
          scopedSlots: { customRender: 'phone' }
        },
        {
          title: '收件地址',
          dataIndex: 'address',
          key: 'address',
          width: '40%',
          scopedSlots: { customRender: 'address' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: [],
      loading: false,
      memberLoading: false,
      editKey: '',
      userId: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'dynamic_form_item' })
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  },
  mounted () {
    this.userId = storage.get('user_id')
    getUserAddresses(this.userId).then(res => {
      this.data = res
      this.data.forEach((item) => {
        item.key = item.id
        item.editable = false
      })
      console.log(this.data)
    })
  },
  methods: {
    remove (key) {
      const line = this.data.find(item => item.key === key)
      if (line.id) {
        deleteAddress(this.userId, line.id).then(res => {
          message.success('删除地址成功')
        })
      }
      const newData = this.data.filter(item => item.key !== key)
      this.editKey = ''
      this.data = newData
    },
    handleSubmit (e) {
      e.preventDefault()
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    saveRow (record) {
      this.memberLoading = true
      const { key, name, phone, address } = record
      if (!name || !phone || !address) {
        this.memberLoading = false
        this.$message.error('请填写完整地址信息。')
        return
      }
      const line = this.data.find(item => item.key === key)
      const data = {
        name: line.name,
        phone: line.phone,
        address: line.address
      }
      if (line.id) {
        // update
        updateAddress(this.userId, line.id, data).then(res => {
          message.success('更新地址成功')
          const target = this.data.find(item => item.key === key)
          target.editable = false
          target.isNew = false
          this.memberLoading = false
          this.editKey = ''
        })
      } else {
        // add
        addAddress(this.userId, data).then(res => {
          message.success('添加地址成功')
          const target = this.data.find(item => item.key === key)
          target.editable = false
          target.isNew = false
          this.memberLoading = false
          this.editKey = ''
        })
      }
    },
    cancel (key) {
      const target = this.data.find(item => item.key === key)
      Object.keys(target).forEach(key => { target[key] = target._originalData[key] })
      target._originalData = undefined
    },
    toggle (key) {
      console.log('key is ' + key)
      const newData = [...this.data]
      const target = newData.find(item => item.key === key)
      this.editKey = key
      if (target) {
        target.editable = !target.editable
        this.data = newData
      }
      // const target = this.data.find(item => item.key === key)
      // this.editKey = key
      // target._originalData = { ...target }
      // target.editable = !target.editable
      // console.log(target)
    },
    newAddress () {
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        name: '',
        phone: '',
        address: '',
        editable: true,
        isNew: true
      })
    }
  }
}
</script>
<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
