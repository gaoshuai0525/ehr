<!--导航菜单-->
<template>
  <div class="menu-wrapper">
    <template
      v-for="item in routes"
      v-if="!item.hidden&&item.children">
      <!--一级导航-->
      <router-link
        v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow"
        :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item
          :index="item.path+'/'+item.children[0].path"
          :class="{'submenu-title-noDropdown':!isNest}">
          <i
            v-if="item.children[0].meta&&item.children[0].meta.icon"
            :class="item.children[0].meta.icon"></i>
          <span
            v-if="item.children[0].meta&&item.children[0].meta.title"
            slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>
      <!--二级导航-->
      <el-submenu
        v-else
        :index="item.name||item.path"
        :key="item.name">
        <template slot="title">
          <i
            v-if="item.meta&&item.meta.icon"
            :class="item.meta.icon"></i>
          <span
            v-if="item.meta&&item.meta.title"
            slot="title">{{item.meta.title}}</span>
        </template>

        <template
          v-for="child in item.children"
          v-if="!child.hidden">
          <sidebar-item
            :is-nest="true"
            class="nest-menu"
            v-if="child.children&&child.children.length>0"
            :routes="[child]"
            :key="child.path"></sidebar-item>

          <router-link
            v-else
            :to="item.path+'/'+child.path"
            :key="child.name">
            <el-menu-item
              :index="item.path+'/'+child.path"
              class="font16">
              <span
                v-if="child.meta&&child.meta.title"
                slot="title">{{child.meta.title}}</span>
              <i
                v-if="child.meta&&child.meta.icon"
                class="item-icon"></i>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      },
      isNest: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hasOneShowingChildren(children) {
        const showingChildren = children.filter(item => {
          return !item.hidden
        })
        if (showingChildren.length === 1) {
          return true
        }
        return false
      }
    }
  }
</script>
<style>
  .el-menu-item {
    font-size: 18px !important;
    padding-left: 26px !important;
    /*text-align: left !important;*/
  }
  .cadre-home {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    display: inline-block;
    background: url("../../../../assets/images/home_icon.png") no-repeat center center;
  }
  .el-menu-item.is-active .cadre-home {
    background: url("../../../../assets/images/home_icon_active.png") no-repeat center center;
  }
  .cadre-audit {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    display: inline-block;
    background: url("../../../../assets/images/audit_icon.png") no-repeat center center;
  }
  .el-menu-item.is-active .cadre-audit {
    background: url("../../../../assets/images/audit_icon_active.png") no-repeat center center;
  }
  .cadre-screen {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    display: inline-block;
    background: url("../../../../assets/images/screen_icon.png") no-repeat center center;
  }
  .el-menu-item.is-active .cadre-screen {
    background: url("../../../../assets/images/screen_icon_active.png") no-repeat center center;
  }
  .el-submenu__title {
    padding-left: 30px !important;
    font-size: 18px!important;
  }
  .font16 {
    background-color: #f6f6f6!important;
    padding-left: 68px !important;
    font-size: 16px!important;
  }
  .el-menu-item.font16.is-active {
    padding-right: 20px;
  }
  .el-menu-item.font16.is-active .item-icon {
    width: 5px;
    height: 48px;
    float: right;
    display: inline-block;
    background: url("../../../../assets/images/arrows_icon.png") no-repeat center center;
  }
</style>
