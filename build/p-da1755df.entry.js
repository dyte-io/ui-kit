import{r as t,c as s,h as i,H as a}from"./p-69f2ebde.js";import{d as o}from"./p-cadf534b.js";import{u as e}from"./p-7e1ebd28.js";import{s as n}from"./p-1210aa77.js";import"./p-57e22a58.js";const r=class{constructor(i){t(this,i),this.stateUpdate=s(this,"dyteStateUpdate",7),this.variant="button",this.states=void 0,this.size=void 0,this.iconPack=o,this.t=e()}toggleSettings(){var t;this.stateUpdate.emit({activeSettings:!(null===(t=this.states)||void 0===t?void 0:t.activeSettings),activeMoreMenu:!1}),n.activeSettings=!n.activeSettings,n.activeMoreMenu=!1}render(){const t=this.t("settings");return i(a,{title:t},i("dyte-controlbar-button",{part:"controlbar-button",size:this.size,iconPack:this.iconPack,t:this.t,onClick:()=>this.toggleSettings(),icon:this.iconPack.settings,label:t,variant:this.variant}))}};r.style=":host{line-height:initial;font-family:var(--dyte-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px)}:host{display:block}";export{r as dyte_settings_toggle}