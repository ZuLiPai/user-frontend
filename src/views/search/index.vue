<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <div class="ant-pro-page-header-search">
        <a-input-search v-model="searchText" size="large" enter-button="搜索" style="width: 80%; max-width: 522px;" @search="onSearch"/>
      </div>
      <a-form :form="form" layout="inline">
        <standard-form-row title="标签：" block style="padding-bottom: 11px;">
          <a-form-item>
            <template v-for="t in tags">
              <a-checkable-tag
                :key="t.id"
                :checked="selectedTags.indexOf(t.name) > -1"
                @change="checked => handleChange(t.name, checked)">
                {{ t.name }}
              </a-checkable-tag>
            </template>
          </a-form-item>
        </standard-form-row>

        <standard-form-row title="" grid last>
          <a-row>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item label="类型">
                <a-select
                  style="min-width: 200px; width: 100%;"
                  mode="multiple"
                  placeholder="不限"
                  v-decorator="['type']"
                >
                  <a-select-option value="cam">相机</a-select-option>
                  <a-select-option value="len">镜头</a-select-option>
                  <a-select-option value="drone">无人机</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item label="好评度">
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
          <a-list-item slot="renderItem" slot-scope="item">
            <item-card :item="item"/>
          </a-list-item>
        </a-list>
      </a-card>
    </div>
  </div>
</template>

<script>
// TODO: 现在只能用名字搜索，别的条件不行，要么删了
import moment from 'moment'
import { AvatarList, Ellipsis, StandardFormRow, TagSelect } from '@/components'
import ItemCard from '@/views/mainpage/components/ItemCard'
import { getItems, getTags } from '@/api/item'

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
      tags: [],
      form: this.$form.createForm(this),
      loading: true,
      searchText: '',
      selectedTags: []
    }
  },
  filters: {
    fromNow (date) {
      return moment(date).fromNow()
    }
  },
  mounted () {
    if (this.$route.query.name) {
      this.searchText = this.$route.query.name
      this.refreshItems({ name: this.searchText })
    } else {
      this.refreshItems()
    }
    getTags().then(resp => {
      this.tags = resp
    })
  },
  methods: {
    handleChange (tag, checked) {
      // const { selectedTags } = this
      // const nextSelectedTags = checked
      //   ? [...selectedTags, tag]
      //   : selectedTags.filter(t => t !== tag)
      // console.log('You are interested in: ', nextSelectedTags)
      this.selectedTags = checked ? [tag] : []
    },
    refreshItems (params) {
      getItems(params).then(resp => {
        this.data = resp
        this.loading = false
      })
      getTags().then(resp => {
        this.tags = resp
      })
    },
    onSearch () {
      this.loading = true
      const params = {}
      if (this.searchText) {
        params.name = this.searchText
      }
      if (this.selectedTags.length > 0) {
        params.tag = this.selectedTags[0]
      }
      console.log(params)
      getItems(params).then(resp => {
        this.data = resp
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
