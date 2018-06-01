<!--汉堡包组件-->
<template>
  <div>
    <i @click="toggleClick"
       class="hamburger"
       :class="{'is-active':isActive}"></i>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.hamburger {
    display: inline-block;
    cursor: pointer;
    width: 14px;
    height: 14px;
    background: url("../../assets/images/hamburger.png") no-repeat center center;
    transform: rotate(90deg);
    transition: .38s;
    transform-origin: 50% 50%;
}

.hamburger.is-active {
    transform: rotate(0deg);
}
</style>
