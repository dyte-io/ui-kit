import{r as t,w as s,h as i}from"./p-f3ae5269.js";import"./p-e0d02dd9.js";import"./p-cca264b9.js";import"./p-83bfbad3.js";import{d as r}from"./p-cadf534b.js";import"./p-57e22a58.js";import{d as h}from"./p-36ba48a7.js";import"./p-a41f3a8c.js";import"./p-02af26e9.js";import"./p-63092db3.js";const e=class{constructor(i){t(this,i),this.sizes=new Map,this.lastScrollTop=0,this.scrollToBottomRetries=0,this.elementObserver=(()=>{let t=null;const s=()=>t||("undefined"!=typeof ResizeObserver?t=new ResizeObserver((t=>{t.forEach((t=>{this.measureElement(t.target,t)}))})):null);return{disconnect:()=>{var t;return null===(t=s())||void 0===t?void 0:t.disconnect()},observe:t=>{var i;return null===(i=s())||void 0===i?void 0:i.observe(t,{box:"border-box"})},unobserve:t=>{var i;return null===(i=s())||void 0===i?void 0:i.unobserve(t)}}})(),this.measureElement=(t,s)=>{if(!t)return;const i=t.dataset.id;if(this.sizes.has(i))return void this.elementObserver.unobserve(t);if(s){const r=s.borderBoxSize[0];if(r&&r.blockSize>0)return this.saveItemSize(i,r.blockSize),void this.elementObserver.unobserve(t)}const r=t.getBoundingClientRect();r.height>0&&this.saveItemSize(i,r.height)},this.getVisibleItems=()=>this.messages.slice(this.range.start,this.range.end+1),this.updateVisibleItems=(t,s)=>{const i=this.messages.length;let r=t,h=s;i<=this.visibleItemsCount?(r=0,h=i-1):s-t<this.visibleItemsCount-1&&(r=this.range.end-this.visibleItemsCount+1),this.range.start!==r&&(this.range={start:r,end:h},this.totalHeight=this.getRangeSize(0,i))},this.getEstimatedItemSize=()=>this.estimateItemSize,this.getRangeSize=(t,s)=>{let i=0,r=0;for(let h=t;h<s;h++)r=this.sizes.get(this.messages[h].id),i+=r||this.getEstimatedItemSize();return i},this.getScrollTop=()=>this.$listRef?Math.ceil(this.$listRef.scrollTop):0,this.getClientHeight=()=>this.$listRef?Math.ceil(this.$listRef.clientHeight):0,this.getScrollHeight=()=>this.$listRef?Math.ceil(this.$listRef.scrollHeight):0,this.getItemsScrolled=()=>{const t=this.lastScrollTop;if(t<=0)return 0;let s=0,i=0,r=0,h=this.messages.length;for(;s<=h;){if(i=s+h>>>1,r=this.getRangeSize(0,i),r===t)return i;r<t?s=i+1:r>t&&(h=i-1)}return s>0?--s:0},this.getEndByStart=t=>Math.min(t+this.visibleItemsCount,this.messages.length-1),this.scrollToOffset=t=>{this.$listRef&&(this.$listRef.scrollTop=t)},this.scrollToIndex=t=>{if(t>=this.messages.length-1)this.scrollToBottom();else{const s=t<1?0:this.getRangeSize(0,t);this.scrollToOffset(s)}},this.scrollToBottom=()=>{this.$listEndRef&&s((()=>{this.$listEndRef.scrollIntoView(),this.getScrollHeight()-(this.getScrollTop()+this.getClientHeight())>0&&this.scrollToBottomRetries<10?setTimeout((()=>{this.scrollToBottom()}),1e3/60):(this.scrollToBottomRetries=0,this.autoScroll=!0)}))},this.handleScroll=async()=>{if(this.isFetching)return;const t=this.getScrollTop(),s=t<this.lastScrollTop||0===t?"UP":"DOWN";if(this.lastScrollTop=t,this.loadMore&&0===t&&"UP"===s&&!1===this.isFetching){this.isFetching=!0;const t=await this.loadMore(this.messages[0]);t&&t.length&&(this.messages=[...t,...this.messages]),this.isFetching=!1}"UP"===s?this.handleTop():"DOWN"===s&&this.handleBottom()},this.handleTop=()=>{const t=this.getItemsScrolled();if(t<=this.range.end-5&&(this.autoScroll=!1),t>this.range.start+5)return;const s=Math.max(this.range.start-5,0);this.updateVisibleItems(s,this.getEndByStart(s))},this.handleBottom=()=>{if(this.getItemsScrolled()<this.range.start+5)return;const t=this.range.start+5,s=this.getEndByStart(t);this.updateVisibleItems(s===this.messages.length-1?s-this.visibleItemsCount:t,s)},this.updateTotalHeight=h((()=>{this.totalHeight=this.getRangeSize(0,this.messages.length)}),1e3/30,{leading:!0}),this.rendererInternal=(t,s,i)=>{if(!t)return;if(t.dataset.id===s.id)return;const r=this.renderer(s,i);t.hasChildNodes&&(t.innerHTML=""),this.elementObserver.observe(t),t.dataset.id=s.id,t.appendChild(r)},this.messages=void 0,this.renderer=void 0,this.loadMore=void 0,this.visibleItemsCount=20,this.estimateItemSize=100,this.iconPack=r,this.range=void 0,this.isFetching=!1,this.autoScroll=!0,this.totalHeight=0}connectedCallback(){const t=this.messages.length-1;this.range={start:t-this.visibleItemsCount,end:t},this.updateVisibleItems(this.range.start,this.range.end),this.totalHeight=this.getRangeSize(0,t)}componentDidLoad(){this.autoScroll&&this.scrollToBottom()}messagesUpdated(t,s){if(t.length>s.length){const i=t.length-s.length;this.updateVisibleItems(i,this.getEndByStart(i)),this.scrollToIndex(this.range.start)}}saveItemSize(t,s){this.sizes.set(t,Math.round(s)),this.updateTotalHeight()}render(){return i("div",{class:"scrollbar content-wrapper",ref:t=>this.$listRef=t,onScroll:this.handleScroll},i("div",{class:"scroller"},i("div",{style:{height:`${this.totalHeight}px`}}),i("div",{class:"smallest-dom-element",id:"list-end",ref:t=>this.$listEndRef=t})),i("div",{class:"content",style:{transform:`translateY(${this.getRangeSize(0,this.range.start)}px)`}},this.isFetching&&i("div",{class:"loader"},i("dyte-spinner",{size:"md"})),this.getVisibleItems().map(((t,s)=>i("div",{key:t.id,ref:i=>this.rendererInternal(i,t,s)})))))}static get watchers(){return{messages:["messagesUpdated"]}}};e.style=":host{line-height:initial;font-family:var(--dyte-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))\n    var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--dyte-space-1\\.5, 6px);width:var(--dyte-space-1\\.5, 6px);border-radius:9999px;background-color:var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))}.loading{cursor:wait}.content-wrapper{height:100%;overflow-y:auto;position:relative;contain:strict}.scroller{width:1px;opacity:0}.content{position:absolute;top:0;width:100%}.smallest-dom-element{width:100%;height:2px;background:red}.loader{margin-top:var(--dyte-space-2, 8px);margin-bottom:var(--dyte-space-2, 8px);display:flex;justify-content:center}";export{e as dyte_message_list_view}