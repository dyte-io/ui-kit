import{r as t,h as i,H as s,a as e}from"./p-69f2ebde.js";import{d as o}from"./p-ba748e25.js";import{d as h}from"./p-cadf534b.js";import{u as a}from"./p-7e1ebd28.js";import{R as n}from"./p-4dfeaf93.js";import{u as p}from"./p-f682efe7.js";import{i as r}from"./p-f47d4fe8.js";const d=class{constructor(i){t(this,i),this.setHostDimensions=()=>{const{clientWidth:t,clientHeight:i}=this.host;this.dimensions={width:t,height:i}},this.participants=[],this.aspectRatio="16:9",this.gap=8,this.size=void 0,this.meeting=void 0,this.states=void 0,this.config=o,this.iconPack=h,this.t=a(),this.dimensions={width:0,height:0},this.mediaConnection=void 0}connectedCallback(){this.resizeObserver=new r(this.setHostDimensions),this.resizeObserver.observe(this.host);const{meta:t}=this.meeting;this.mediaConnection=Object.assign({},t.mediaState)}disconnectedCallback(){var t;null===(t=this.resizeObserver)||void 0===t||t.disconnect()}render(){const t={meeting:this.meeting,config:this.config,states:this.states,size:this.size,iconPack:this.iconPack,t:this.t},{width:e,height:o,getPosition:h}=p({dimensions:this.dimensions,count:this.participants.length,aspectRatio:this.aspectRatio,gap:this.gap});return i(s,null,this.participants.map(((s,a)=>{const{top:p,left:r}=h(a);return i(n,{element:"dyte-participant-tile",defaults:t,props:{participant:s,style:{position:"absolute",top:`${p}px`,left:`${r}px`,width:`${e}px`,height:`${o}px`},key:s.id,"data-participant":s.id,mediaConnection:this.mediaConnection},childProps:{participant:s},deepProps:!0})})),i("slot",null))}get host(){return e(this)}};d.style=":host{line-height:initial;font-family:var(--dyte-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px)}:host{position:relative;display:block;height:100%;width:100%}";export{d as dyte_simple_grid}