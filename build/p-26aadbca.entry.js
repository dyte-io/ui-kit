import{r as n,c as t,h as e,H as a}from"./p-69f2ebde.js";import"./p-1210aa77.js";import"./p-26e8d50e.js";import"./p-799d72ea.js";import{d as r}from"./p-cadf534b.js";import{u as o}from"./p-54de5543.js";import"./p-57e22a58.js";import"./p-aafa2ac8.js";import"./p-19c79157.js";const i=class{constructor(e){n(this,e),this.tabChange=t(this,"tabChange",7),this.sidebarClose=t(this,"sidebarClose",7),this.onClose=()=>{this.sidebarClose.emit()},this.view="sidebar",this.tabs=[],this.hideHeader=!1,this.hideCloseAction=!1,this.currentTab=void 0,this.iconPack=r,this.t=o()}render(){const n="full-screen"===this.view,t=this.tabs.find((n=>n.id===this.currentTab));return e(a,{class:this.view},!this.hideCloseAction&&e("dyte-button",{variant:"ghost",kind:"icon",class:"close",onClick:this.onClose,"aria-label":this.t("close")},e("dyte-icon",{icon:this.iconPack.dismiss})),t&&!this.hideHeader&&e("header",{class:"main-header"},e("h3",null,t.name),e("slot",{name:"pinned-state"})),n&&e("header",{class:"mobile-tabs"},this.tabs.map((n=>e("button",{onClick:()=>{this.tabChange.emit(n.id)},class:{active:this.currentTab===n.id}},n.name)))),e("slot",{name:this.currentTab}))}};i.style=":host {\n  line-height: initial;\n  font-family: var(--dyte-font-family, sans-serif);\n\n  font-feature-settings: normal;\n  font-variation-settings: normal;\n}\n\np {\n  margin: var(--dyte-space-0, 0px);\n  padding: var(--dyte-space-0, 0px);\n}\n\n\n:host {\n  position: relative;\n  height: 100%;\n  width: 100%;\n  font-family: var(--dyte-font-family, sans-serif);\n  z-index: 50;\n  display: flex;\n  flex-direction: column;\n\n  container-type: size;\n  container-name: sidebarui;\n}\n\n@container sidebarui (height < 370px) {\n  .main-header {\n    height: var(--dyte-space-8, 32px) !important;\n  }\n  .close {\n    top: var(--dyte-space-0\\.5, 2px) !important;\n    left: var(--dyte-space-0, 0px) !important;\n    color: rgba(var(--dyte-colors-danger, 255 45 45) / 0.6);\n  }\n}\n\n:host([view='sidebar']) {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity));\n}\n\n:host([view='full-screen']) {\n  position: absolute;\n  top: var(--dyte-space-0, 0px);\n  right: var(--dyte-space-0, 0px);\n  bottom: var(--dyte-space-0, 0px);\n  left: var(--dyte-space-0, 0px);\n  max-width: 100%;\n  border: none;\n}\n\n::slotted(*) {\n  flex-grow: 1;\n}\n\n.close {\n  position: absolute;\n  top: var(--dyte-space-2, 8px);\n  left: var(--dyte-space-2, 8px);\n  z-index: 10;\n}\n\n.main-header {\n  position: relative;\n  display: flex;\n  height: var(--dyte-space-12, 48px);\n  place-items: center;\n  justify-content: center;\n}\n\n.main-header, \n.mobile-tabs {\n  flex-shrink: 0;\n}\n\n.mobile-tabs {\n  display: flex;\n  place-items: center;\n  justify-content: space-evenly;\n  border-bottom: 1px solid rgb(var(--dyte-colors-background-700, 44 44 44));\n}\n\n.mobile-tabs button {\n  margin: var(--dyte-space-0, 0px);\n  border-width: var(--dyte-border-width-none, 0);\n  border-style: none;\n  background-color: transparent;\n  padding: var(--dyte-space-0, 0px);\n  color: rgb(var(--dyte-colors-text-600, 255 255 255 / 0.52));\n  height: var(--dyte-space-10, 40px);\n  cursor: pointer;\n  padding-left: var(--dyte-space-4, 16px);\n  padding-right: var(--dyte-space-4, 16px);\n  font-weight: 500;\n  border-bottom: 1px solid transparent;\n}\n\n.mobile-tabs button.active {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--dyte-colors-brand-300, 73 124 253) / var(--tw-border-opacity));\n  --tw-text-opacity: 1;\n  color: rgba(var(--dyte-colors-brand-300, 73 124 253) / var(--tw-text-opacity));\n}\n\nheader h3 {\n  font-size: 14px;\n  font-weight: 500;\n}\n\n@media only screen and (max-device-height: 480px) and (orientation: landscape) {\n  .main-header {\n    display: none !important;\n  }\n}\n\n.tab-participant-count-badge {\n  display: inline-block;\n  padding: 2px 5px;\n  border-radius: 9999px;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));\n  font-size: 12px;\n  color: rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64));\n}\n\n.tab-participant-count-badge:not(.selected-tab) {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity));\n}\n\n.tab-participant-count-badge.requests-pending{\n  background-color: rgba(var(--dyte-colors-danger));\n}";export{i as dyte_sidebar_ui}