import{i as r,b as t,a as n,r as i}from"./p-63092db3.js";var o=/\s/,e=/^\s+/;var u=/^[-+]0x[0-9a-f]+$/i,f=/^0b[01]+$/i,a=/^0o[0-7]+$/i,v=parseInt;function c(i){if("number"==typeof i)return i;if(function(n){return"symbol"==typeof n||r(n)&&"[object Symbol]"==t(n)}(i))return NaN;if(n(i)){var c="function"==typeof i.valueOf?i.valueOf():i;i=n(c)?c+"":c}if("string"!=typeof i)return 0===i?i:+i;var s;i=(s=i)?s.slice(0,function(r){for(var t=r.length;t--&&o.test(r.charAt(t)););return t}(s)+1).replace(e,""):s;var d=f.test(i);return d||a.test(i)?v(i.slice(2),d?2:8):u.test(i)?NaN:+i}var s=function(){return i.Date.now()},d=Math.max,m=Math.min;function p(r,t,i){var o,e,u,f,a,v,p=0,y=!1,b=!1,T=!0;if("function"!=typeof r)throw new TypeError("Expected a function");function l(t){var n=o,i=e;return o=e=void 0,p=t,f=r.apply(i,n)}function h(r){return p=r,a=setTimeout(N,t),y?l(r):f}function x(r){var n=r-v;return void 0===v||n>=t||n<0||b&&r-p>=u}function N(){var r=s();if(x(r))return $(r);a=setTimeout(N,function(r){var n=t-(r-v);return b?m(n,u-(r-p)):n}(r))}function $(r){return a=void 0,T&&o?l(r):(o=e=void 0,f)}function g(){var r=s(),n=x(r);if(o=arguments,e=this,v=r,n){if(void 0===a)return h(v);if(b)return clearTimeout(a),a=setTimeout(N,t),l(v)}return void 0===a&&(a=setTimeout(N,t)),f}return t=c(t)||0,n(i)&&(y=!!i.leading,u=(b="maxWait"in i)?d(c(i.maxWait)||0,t):u,T="trailing"in i?!!i.trailing:T),g.cancel=function(){void 0!==a&&clearTimeout(a),p=0,o=v=e=a=void 0},g.flush=function(){return void 0===a?f:$(s())},g}export{p as d}