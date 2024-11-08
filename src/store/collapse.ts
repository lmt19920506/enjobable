import { defineStore } from 'pinia'

export interface ICollapseState {
    isLeftCollapse: boolean;
    isRightCollapse: boolean;
    isBottomCollapse: boolean;
}

export const useCollapseStore = defineStore('collapse', {
    state: (): ICollapseState => ({
      isLeftCollapse: false,
      isRightCollapse: false,
      isBottomCollapse: false
    }),
    actions: {
        changeCollapse() {
            console.log('change')
            this.isLeftCollapse = !this.isLeftCollapse
        }
    },
    getters: {
        getPanelOffset(state) {
          let x = 78 + 323 + 20
          let y = 135 + 20
          let left = 78 + 323 + 20
          let top = 135 + 20
          //  choose :78px
          // component： 323px
          if (state.isLeftCollapse) {
            console.log('yes')
            x += 323
            left += 323
          }
          if (state.isRightCollapse) {
            console.log('yes')
            x -= 260
            left -= 260
          }
    
          // if (state.components.show) {
          //   x += 324
          //   left += 324
          // } else {
          //   x += 45
          //   left += 45
          // }
    
          // if (state.toolbox.show) {
          //   y += 40
          //   top += 40
          // }
    
          // if (state.config.show) {
          //   x += 332
          // }
          // console.log(x, y, left, top)
          return {
            x,
            y,
            left,
            top,
          }
        },
      }
})