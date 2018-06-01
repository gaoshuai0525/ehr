<template>
    <div v-if="options" class="cadres-detail-page">
      <el-row
        class="top"
        ref="topMenu"
        :class="{ tp0 :isFixed ,'lf256':sidebar.opened && isFixed,'lf56':!sidebar.opened && isFixed}">
        <el-col>
          <ul>
            <li
              v-for="(item,index) in options"
              :class="[currentIndex == index?'highlight':'']"
              @click="clickFn(index)">
              <h5>{{item}}</h5>
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-row
        class="bottom"
        ref="bottomMenu"
        :style="{paddingTop:isFixed ? '40px' :'0px'}">
        <slot></slot>
      </el-row>
    </div>
</template>
<script type="text/javascript">
  import { mapGetters } from 'vuex'
	export default {
		props: {
      options:{
        type: Array
      }
		},
		data() {
			return {
			  isFixed:false,
        currentIndex: 0,
        isTab: false
			}
		},
    computed: {
      wrap() {
        return this.$refs.bottomMenu;
      },
      ...mapGetters([
        'sidebar'
      ]),
    },
    mounted() {
      window.addEventListener("scroll",this.handleScroll,true)
    },
    methods: {
      handleScroll(e){
          if(this.isTab){
            this.isTab = false
            return;
          }
        var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
        var jump = this.wrap.$children,heightArr = [];
        for(var i=0;i<jump.length;i++){
              heightArr.push(jump[i].$el.offsetTop+this.$refs.bottomMenu.$el.offsetTop-this.$refs.topMenu.$el.offsetHeight)
        }
        if (scrollTop>=this.$refs.bottomMenu.$el.offsetTop-this.$refs.topMenu.$el.offsetHeight) {
          this.isFixed = true
        }
        else{
          this.isFixed = false
        }
        for(var i = 0 ; i < heightArr.length ; i++){
          if (scrollTop >= heightArr[i]) {
            this.currentIndex = i;
          }
        }
      },
      clickFn(index) {
        this.isTab = true
        if(!this.isFixed){
          this.isFixed = true
        }
        this.$nextTick(()=>{
          var scrollTop = this.wrap.$children[index].$el.offsetTop+this.$refs.bottomMenu.$el.offsetTop-this.$refs.topMenu.$el.offsetHeight
          this.scrollTo(Math.max(this.$refs.bottomMenu.$el.offsetTop-this.$refs.topMenu.$el.offsetHeight,scrollTop),
            window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop)
          this.currentIndex = index
        })
      },
      scrollTo(y,startY){
        const scrollAnimate = setInterval(()=>{
          var moveTo = (y-startY)/8;
          moveTo = moveTo > 0?Math.ceil(moveTo):Math.floor(moveTo);
          if(moveTo > 0){
            if(startY < y)startY = startY + moveTo;
            if(startY >= y)clearInterval(scrollAnimate)
          }else{
            if(startY > y)startY = startY + moveTo;
            if(startY <= y)clearInterval(scrollAnimate)
          }
          this.isTab = true
          window.scrollTo(0,startY)
        },10)

      }
    },
    beforeDestroy() {
      window.removeEventListener('scroll',this.handleScroll,true)
    }
	}
</script>
<style scoped="scoped">
	.cadres-detail-page .tp0{
		position: fixed;
		top: 68px;
    right: 20px;
    z-index: 998;
	}
  .lf256{
    left: 256px;
  }
  .lf56{
    left: 56px;
  }
	.cadres-detail-page .menu{
		width: 100%;
		height: 40px;
		background: cornflowerblue;
		display: flex;
		justify-content: space-around;
	}
	.cadres-detail-page .menu button{
		border: 1px solid #0085FF;
		width: 33.33%;
		background: cornflowerblue;
		outline:none;
		color: white;
		line-height: 40px;
	}
  .top{
    background: #fff;
    border-radius: 5px;
  }
  .bottom{
    transtion:all 0.3s
  }
  .top li{
    float: left;
    list-style: none;
    line-height: 40px;
    padding: 0 20px;
    text-align: center;
    cursor: pointer;
  }

  .highlight{
    color: #ed7804;
    border-bottom: 2px solid #ed7804;
  }
</style>
