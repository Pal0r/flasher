import { shallow, mount } from 'enzyme'


export const componentWithStore = (component, store, mountComponent=false) => {
  let context = {
    store,
  }
  if(mountComponent){
    return mount(component, { context })
  } else {
    return shallow(component, { context })
  }
}