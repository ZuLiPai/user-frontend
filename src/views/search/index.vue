<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <div class="ant-pro-page-header-search">
        <a-input-search size="large" enter-button="搜索" style="width: 80%; max-width: 522px;"/>
      </div>
      <a-form :form="form" layout="inline">
        <standard-form-row title="标签：" block style="padding-bottom: 11px;">
          <a-form-item>
            <tag-select>
              <tag-select-option value="Category1">索尼</tag-select-option>
              <tag-select-option value="Category2">佳能</tag-select-option>
              <tag-select-option value="Category3">尼康</tag-select-option>
              <tag-select-option value="Category4">适马</tag-select-option>
              <tag-select-option value="Category5">森养</tag-select-option>
              <tag-select-option value="Category6">腾龙</tag-select-option>
              <tag-select-option value="Category7">大疆</tag-select-option>
              <tag-select-option value="Category8">啊哈哈</tag-select-option>
              <tag-select-option value="Category9">啦啦啦</tag-select-option>
            </tag-select>
          </a-form-item>
        </standard-form-row>

        <standard-form-row title="" grid last>
          <a-row>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="类型">
                <a-select
                  style="min-width: 200px; width: 100%;"
                  mode="multiple"
                  placeholder="不限"
                  v-decorator="['type']"
                  @change="handleChange"
                >
                  <a-select-option value="cam">相机</a-select-option>
                  <a-select-option value="len">镜头</a-select-option>
                  <a-select-option value="drone">无人机</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="好评度">
                <a-select
                  style="min-width: 200px; width: 100%;"
                  placeholder="不限"
                  v-decorator="['rate']"
                >
                  <a-select-option value="good">优秀</a-select-option>
                  <a-select-option value="normal">普通</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </standard-form-row>
      </a-form>
    </a-card>

    <div class="ant-pro-pages-list-projects-cardList">
      <a-card>
        <a-list :loading="loading" :data-source="data" :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }">
          <a-list-item slot="renderItem" slot-scope="">
            <!--          <a-card class="ant-pro-pages-list-projects-card" hoverable>-->
            <!--            <img slot="cover" :src="item.cover" :alt="item.title" />-->
            <!--            <a-card-meta :title="item.title">-->
            <!--              <template slot="description">-->
            <!--                <ellipsis :length="50">{{ item.description }}</ellipsis>-->
            <!--              </template>-->
            <!--            </a-card-meta>-->
            <!--            <div class="cardItemContent">-->
            <!--              <span>{{ item.updatedAt | fromNow }}</span>-->
            <!--              <div class="avatarList">-->
            <!--                <avatar-list size="small" :max-length="2">-->
            <!--                  <avatar-list-item-->
            <!--                    v-for="(member, i) in item.members"-->
            <!--                    :key="`${item.id}-avatar-${i}`"-->
            <!--                    :src="member.avatar"-->
            <!--                    :tips="member.name"-->
            <!--                  />-->
            <!--                </avatar-list>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--          </a-card>-->
            <item-card/>
          </a-list-item>
        </a-list>
      </a-card>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
import ItemCard from '@/views/mainpage/components/ItemCard'

const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.Item

export default {
  name: 'Index',
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    ItemCard
  },
  data () {
    return {
      data: [],
      form: this.$form.createForm(this),
      loading: true
    }
  },
  filters: {
    fromNow (date) {
      return moment(date).fromNow()
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    getList () {
      this.$http.get('/list/article', { params: { count: 8 } }).then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>

.ant-pro-page-header-search {
  text-align: center;
  margin-bottom: 16px;
}

.ant-pro-components-tag-select {
  :deep(.ant-pro-tag-select .ant-tag) {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
.ant-pro-pages-list-projects-cardList {
  margin-top: 24px;

  :deep(.ant-card-meta-title) {
    margin-bottom: 4px;
  }

  :deep(.ant-card-meta-description) {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0,0,0,.45);
      font-size: 12px;
    }

    :deep(.ant-pro-avatar-list) {
      flex: 0 1 auto;
    }
  }
}
</style>
