import{r,c as t,h as o,H as e}from"./p-69f2ebde.js";import{s as a}from"./p-1210aa77.js";import{d as i}from"./p-cadf534b.js";import{u as s}from"./p-54de5543.js";import"./p-57e22a58.js";const d=class{constructor(o){r(this,o),this.stateUpdate=t(this,"dyteStateUpdate",7),this.type="text",this.placeholder="",this.disabled=!1,this.iconPack=i,this.t=s()}connectedCallback(){this.stateUpdate.emit({abc:!1}),a.abc=!1}get value(){return this.input.value}render(){return o(e,null,o("input",{ref:r=>this.input=r,type:this.type,placeholder:this.placeholder,disabled:this.disabled}))}};d.style=":host{line-height:initial;font-family:var(--dyte-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px)}input{display:block;height:var(--dyte-space-10, 40px);padding-left:var(--dyte-space-3, 12px);padding-right:var(--dyte-space-3, 12px);font-size:14px;border-width:var(--dyte-border-width-md, 2px);border-style:solid;border-color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64));--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-900, 255 255 255 / 0.88))}input::-moz-placeholder{color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64))}input::placeholder{color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64))}input:focus{color:rgb(var(--dyte-colors-text-1000, 255 255 255))}input{border-radius:var(--dyte-border-radius-sm, 4px);outline:2px solid transparent;outline-offset:2px;transition-property:color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}input:focus{--tw-border-opacity:1;border-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-border-opacity))}input:disabled{cursor:not-allowed}";export{d as dyte_text_field}