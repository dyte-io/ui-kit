import{r as i,h as t,H as s,a as h}from"./p-69f2ebde.js";import{d}from"./p-ba748e25.js";import{d as e}from"./p-f682efe7.js";import{d as a}from"./p-cadf534b.js";import{u as o}from"./p-54de5543.js";import{R as r}from"./p-4dfeaf93.js";const m=class{constructor(t){i(this,t),this.getAdaptiveSize=i=>"sm"===this.size||i>3||"md"===this.size?"sm":"md",this.layout="row",this.participants=[],this.pinnedParticipants=[],this.aspectRatio="16:9",this.gap=8,this.size=void 0,this.meeting=void 0,this.states=void 0,this.config=d,this.iconPack=a,this.t=o(),this.gridSize=e}render(){const i={meeting:this.meeting,config:this.config,states:this.states,size:this.size,iconPack:this.iconPack,t:this.t},h=this.participants.filter((i=>this.pinnedParticipants.some((t=>t.id!=i.id))));return t(s,null,t("main",{part:"main"},t(r,{element:"dyte-simple-grid",defaults:i,props:{part:"main-grid",participants:this.pinnedParticipants,aspectRatio:this.aspectRatio,gap:this.gap,size:this.getAdaptiveSize(this.pinnedParticipants.length)}})),h.length>0&&t("aside",{part:"aside",class:this.gridSize.spotlight?`grid-width-${this.gridSize.spotlight}`:"grid-width-md"},t(r,{element:"dyte-simple-grid",defaults:i,props:{part:"aside-grid",participants:h,aspectRatio:this.aspectRatio,gap:this.gap,size:this.getAdaptiveSize(h.length)}})))}get host(){return h(this)}};m.style=":host{line-height:initial;font-family:var(--dyte-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px)}:host{display:flex;height:100%;width:100%}main{flex:1 1 0%}.grid-width-sm{width:25%}.grid-width-md{width:50%}.grid-width-lg{width:66.666667%}:host([size='sm']),:host([size='md']){flex-direction:column}:host([size='md']) aside{max-height:var(--dyte-space-96, 384px);width:100%;max-width:100%}:host([size='md']) .grid-width-sm{height:25%}:host([size='md']) .grid-width-md{height:50%}:host([size='md']) .grid-width-lg{height:66.666667%}:host([size='sm']) aside{max-height:var(--dyte-space-96, 384px);width:100%;max-width:100%}:host([size='sm']) .grid-width-sm,:host([size='sm']) .grid-width-md,:host([size='sm']) .grid-width-lg{height:50%}:host([size='xl']) .grid-width-sm,:host([size='xl']) .grid-width-md,:host([size='xl']) .grid-width-lg{width:400px}:host([layout='column']){flex-direction:column}:host([layout='column']) main{flex:4}:host([layout='column']) aside{flex:2;max-width:100%;width:100%}";export{m as dyte_spotlight_grid}