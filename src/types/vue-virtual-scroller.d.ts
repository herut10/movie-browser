declare module 'vue-virtual-scroller' {
  import { DefineComponent } from 'vue'
  
  export type RecycleScrollerProps = {
    items: unknown[]
    itemSize: number
    keyField?: string
    pageMode?: boolean
    prerender?: number
    buffer?: number
    minItemSize?: number
    sizeField?: string
    typeField?: string
    direction?: 'vertical' | 'horizontal'
    dynamic?: boolean
  }
  
  export const RecycleScroller: DefineComponent<RecycleScrollerProps>
  export const DynamicScroller: DefineComponent<RecycleScrollerProps>
  export const DynamicScrollerItem: DefineComponent<Record<string, unknown>>
}

declare module 'vue-virtual-scroller/dist/vue-virtual-scroller.css' {
  const content: string
  export default content
} 