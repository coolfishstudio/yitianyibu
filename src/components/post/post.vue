<template>
  <div class="post-content text-shadow">
    <div>
      <div class="post-header">
        <h1 class="post-title">{{ info.title }}</h1>
        <div class="post-meta">
          <span class="post-time">发表于 {{ info.time }}</span>
          <span v-if="info.hits">{{ info.hits }} 次评论</span>
          <br class="post-tags-br"/>
          <span class="post-tags" v-for="(item, index) in info.tag" :style="'background: #' + item.color + ';'" >{{ item.name }}</span>
        </div>
      </div>
      <div class="post-body">
        <div class="markdown-body" v-html="info.html">
        </div>
      </div>
      <div class="post-bar">
        <div class="post-like">
          <div class="share" @click="toTop">
            <svg class="icon" width="36" height="36" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7993"><path d="M838.656 767.616l0 17.344-201.344-40.576c-12.992 43.456-65.152 76.736-125.952 76.736-60.864 0-113.024-33.344-126.016-78.208l-199.872 39.104 0-17.344c0-98.496 27.52-169.472 89.728-228.864C253.44 254.848 379.456 76.736 504 4.288L511.296 0l7.232 4.288c124.608 72.448 249.088 250.56 228.864 531.584C811.136 595.264 838.656 666.24 838.656 767.616zM574.976 417.152c37.632-34.752 40.512-94.144 5.76-131.84C545.984 247.68 486.656 244.736 448.96 279.488c-37.632 34.752-40.512 94.208-5.76 131.84C477.952 449.024 537.344 451.904 574.976 417.152zM558.4 916.8C558.4 958.784 512 1024 512 1024s-46.336-69.568-46.336-107.2c0-31.872 20.224-57.92 46.336-57.92S558.4 884.928 558.4 916.8z" p-id="7994"></path></svg>
          </div>
        </div>
        <div class="post-category">
          <div class="post-category-title">收录于</div>
          <div class="post-category-items">
            <span class="post-category-item" v-for="tag in info.category">
              <router-link tag="a" class="name" :to="'/plan/' + tag.name">
                {{ tag.name }}
              </router-link>
              <router-link tag="a" class="plan" :to="'/plan/' + tag.name">
                {{ tag.description || tag.name }}
              </router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: null
  },
  methods: {
    toTop () {
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.post-header
  background-color: #fff
  padding: 3% 4% 2%
  color: #222
  .post-title
    color: #333
    font-size: 0.3rem
    font-weight: 700
    line-height: 0.42rem
  .post-meta
    display: block
    font-size: .14rem
    margin-top: .1rem
    color: #7f8c8d
    span
      margin-right: 0.15rem
      vertical-align: middle
      display: inline-block
    .post-tags
      color: #fff
      background: #f8f8f8
      font-size: 12px
      line-height: 16px
      padding: 1px 7px
      border-radius: 4px
      margin-right: 0.05rem
      font-weight: 600
    .post-tags-br
      display: none
.post-body
  padding: 0% 4% 2%
  .markdown-body
    border-top: 1px dashed #ddd
    padding-bottom: .16rem
    padding-top: 0.24rem
.post-bar
  padding: 2% 4%
  background-color: #fff
  text-align: center
/*  border-top: 1px dashed #e3e3e3*/
  .post-like
    width: 100%
    height: 0.7rem
    position: relative
    &:before
      content: ''
      display: block
      border-top: 1px dashed #ddd
      width: 100%
      position: absolute
      left: 0
      right: 0
      margin-top: 0.36rem
    .share
      width: 0.7rem
      height: 0.7rem
      border-radius: 0.7rem
      background-color: #fff
      position: absolute
      border: 1px dashed #ddd
      left: 50%
      margin-left: -0.35rem
      cursor: pointer
      color: #2ecc40
      transition: all .3s linear
      &:hover
        background-color: #2ecc40
        color: #fff
      svg
        margin: 0.17rem auto
        fill: currentColor
  .name
    color: #293846
    font-weight: 700
    font-size: 0.18rem
  .plan
    display: block
    margin-top: 0.16rem
    font-size: 0.14rem
    color: #7f8c8d
  .post-category
    margin-bottom: 0.4rem;
    margin-top: 0.3rem;
    .post-category-title
      color: rgba(0,0,0,0.45)
      text-align: center
      font-size: 0.16rem
      padding-bottom: 0.1rem
      margin-bottom: 0.05rem
    .post-category-items
      display: flex
      .post-category-item
        flex: 1
        padding: 0.1rem 0
        margin-top: 0.05rem
        border-right: 1px dashed #ddd
        &:last-child
          border-right: none
@media (max-width: 992px)
  .post-header
    padding: 3% 0 2%
  .post-content
    margin-top: 0.5rem
    margin-bottom: 0
    .post-title
    .post-body
    .post-bar
      padding-left: 0
      padding-right: 0
@media (max-width:768px)
  .post-header
    padding: 3% 0 2%
    .post-meta
      span
        margin-bottom: 0.1rem
      .post-tags-br
        display: block
</style>
