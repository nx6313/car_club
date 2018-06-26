import Vue from 'vue'
import IndexPage from '@/components/pages/Index'

describe('Index.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(IndexPage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
  })
})
