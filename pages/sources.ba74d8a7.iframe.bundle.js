(window.webpackJsonp=window.webpackJsonp||[]).push([[97,32],{1270:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var components_TableSortIconvue_type_script_lang_js_={name:"TableSortIcon",props:{active:{type:Boolean,required:!0}},data:function data(){return{activeClass:"text-dark-blue",inactiveClass:"text-gray"}}},componentNormalizer=__webpack_require__(16);const __vuedocgen_export_0=Object(componentNormalizer.a)(components_TableSortIconvue_type_script_lang_js_,(function(){var _h=this.$createElement,_c=this._self._c||_h;return _c("div",{staticClass:"flex flex-col",class:[this.active?this.activeClass:this.inactiveClass]},[_c("svg",{staticClass:"stroke-current mb-2",attrs:{width:"12",height:"6",viewBox:"0 0 12 6",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[_c("path",{attrs:{d:"M11 5L6 0.999999L1 5","stroke-width":"1.5"}})]),this._v(" "),_c("svg",{staticClass:"stroke-current",attrs:{width:"12",height:"6",viewBox:"0 0 12 6",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[_c("path",{attrs:{d:"M1 1L6 5L11 1","stroke-width":"1.5"}})])])}),[],!1,null,null,null).exports;__webpack_exports__.default=__vuedocgen_export_0;__vuedocgen_export_0.__docgenInfo={displayName:"TableSortIcon",exportName:"default",description:"",tags:{},props:[{name:"active",type:{name:"boolean"},required:!0}]}},1377:function(module,exports,__webpack_require__){var content=__webpack_require__(1419);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals);(0,__webpack_require__(61).default)("69124cfe",content,!0,{sourceMap:!1})},1418:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(1377)},1419:function(module,exports,__webpack_require__){var ___CSS_LOADER_EXPORT___=__webpack_require__(60)((function(i){return i[1]}));___CSS_LOADER_EXPORT___.push([module.i,"p>em[data-v-72cefa92]{color:#188038}a>em[data-v-72cefa92],p>em[data-v-72cefa92]{font-family:monospace;font-style:normal;font-weight:600}.table[data-v-72cefa92]{table-layout:fixed;width:100%}.table.is-bordered td[data-v-72cefa92]{word-break:break-all}.button.is-primary[data-v-72cefa92]{font-size:1.1875rem;font-weight:700}.table.is-striped[data-v-72cefa92]{border-collapse:separate;border-radius:2px}.table.is-striped th[data-v-72cefa92]{cursor:pointer}.table.is-striped .table-header-inner[data-v-72cefa92]{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.table.is-striped .table-header-inner>.icon[data-v-72cefa92]{margin-top:-4px}.table.is-striped td[data-v-72cefa92],.table.is-striped th[data-v-72cefa92]{word-break:normal;border-bottom:none;border-top:none}.table.is-striped th[data-v-72cefa92]:first-child{border-top-left-radius:2px}.table.is-striped th[data-v-72cefa92]:last-child{border-top-right-radius:2px}.table.is-striped tr:last-child td[data-v-72cefa92]:first-child{border-bottom-left-radius:2px}.table.is-striped tr:last-child td[data-v-72cefa92]:last-child{border-bottom-right-radius:2px}.table.is-striped td[data-v-72cefa92]:not(:first-child),.table.is-striped th[data-v-72cefa92]:not(:first-child){border-left:1px solid #d8d8d8}",""]),___CSS_LOADER_EXPORT___.locals={},module.exports=___CSS_LOADER_EXPORT___},1535:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(9),__webpack_require__(3),__webpack_require__(18),__webpack_require__(29),__webpack_require__(14),__webpack_require__(30),__webpack_require__(210),__webpack_require__(126);var defineProperty=__webpack_require__(7),lodash_sortby=(__webpack_require__(6),__webpack_require__(1417)),lodash_sortby_default=__webpack_require__.n(lodash_sortby),vuex_esm=__webpack_require__(149),store_modules=__webpack_require__(67);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){Object(defineProperty.a)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}var ARABIC_NUMERAL_LOCALES=["ar","fa","ur","ckb","ps"],SourcePage={name:"source-page",layout:"with-nav-search",data:function data(){return{sort:{direction:"asc",field:"display_name"}}},computed:_objectSpread(_objectSpread({},Object(vuex_esm.e)(store_modules.g,["imageProviders"])),{},{sortedProviders:function sortedProviders(){var sorted=lodash_sortby_default()(this.imageProviders,[this.sort.field]);return"asc"===this.sort.direction?sorted:sorted.reverse()}}),methods:{getProviderMediaCount:function getProviderMediaCount(){var mediaCount=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,locale=this.$i18n.locale;return ARABIC_NUMERAL_LOCALES.some((function(l){return locale.startsWith(l)}))&&(locale="en-GB"),mediaCount.toLocaleString(locale)},sortTable:function sortTable(field){var direction="asc";field===this.sort.field&&(direction="asc"===this.sort.direction?"desc":"asc"),this.sort={direction:direction,field:field}}}},pages_sourcesvue_type_script_lang_js_=SourcePage,componentNormalizer=(__webpack_require__(1418),__webpack_require__(16)),component=Object(componentNormalizer.a)(pages_sourcesvue_type_script_lang_js_,(function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"section",attrs:{dir:"ltr"}},[_c("div",{staticClass:"container"},[_c("div",{staticClass:"mb-10"},[_c("h1",{staticClass:"text-5xl mb-10"},[_vm._v("\n        "+_vm._s(_vm.$t("sources.title"))+"\n      ")]),_vm._v(" "),_c("div",{staticClass:"mb-10"},[_c("h3",{staticClass:"text-2xl"},[_vm._v("\n          "+_vm._s(_vm.$t("sources.cc-content.where"))+"\n        ")]),_vm._v(" "),_c("p",{staticClass:"my-4"},[_vm._v("\n          "+_vm._s(_vm.$t("sources.cc-content.content"))+"\n        ")]),_vm._v(" "),_c("i18n",{staticClass:"my-4",attrs:{path:"sources.cc-content.provider",tag:"p"},scopedSlots:_vm._u([{key:"flickr",fn:function(){return[_c("a",{attrs:{"aria-label":"flickr",href:"https://www.flickr.com/"}},[_vm._v(_vm._s(_vm.$t("sources.cc-content.flickr")))])]},proxy:!0},{key:"smithsonian",fn:function(){return[_c("a",{attrs:{"aria-label":"smithsonian",href:"https://www.si.edu/"}},[_vm._v(_vm._s(_vm.$t("sources.cc-content.smithsonian")))])]},proxy:!0}])}),_vm._v(" "),_c("i18n",{staticClass:"my-4",attrs:{path:"sources.cc-content.europeana",tag:"p"},scopedSlots:_vm._u([{key:"link",fn:function(){return[_c("a",{attrs:{"aria-label":"europeana",href:"https://www.europeana.eu/en"}},[_vm._v(_vm._s(_vm.$t("sources.cc-content.europeana-link")))])]},proxy:!0},{key:"link-api",fn:function(){return[_c("a",{attrs:{"aria-label":"europeana-api",href:"https://pro.europeana.eu/page/apis"}},[_vm._v(_vm._s(_vm.$t("sources.cc-content.europeana-api")))])]},proxy:!0}])})],1),_vm._v(" "),_c("div",{staticClass:"mb-10"},[_c("h3",{staticClass:"text-2xl"},[_vm._v("\n          "+_vm._s(_vm.$t("sources.new-content.next"))+"\n        ")]),_vm._v(" "),_c("p",{staticClass:"my-4"},[_vm._v("\n          "+_vm._s(_vm.$t("sources.new-content.integrate"))+"\n        ")]),_vm._v(" "),_c("div",{staticClass:"content"},[_c("ul",[_c("li",[_vm._v("\n              "+_vm._s(_vm.$t("sources.new-content.impact"))+"\n            ")]),_vm._v(" "),_c("li",[_vm._v("\n              "+_vm._s(_vm.$t("sources.new-content.reuse"))+"\n            ")]),_vm._v(" "),_c("li",[_vm._v("\n              "+_vm._s(_vm.$t("sources.new-content.total-items"))+"\n            ")])])])]),_vm._v(" "),_c("h3",{staticClass:"text-2xl my-4"},[_vm._v("\n        "+_vm._s(_vm.$t("sources.suggestions"))+"\n      ")]),_vm._v(" "),_c("a",{staticClass:"button is-primary py-8",attrs:{href:"https://github.com/WordPress/openverse-catalog/issues/new?assignees=&labels=%F0%9F%9A%A6+status%3A+awaiting+triage%2C+%F0%9F%A7%B9+status%3A+ticket+work+required%2C+%E2%98%81%EF%B8%8F+provider%3A+any&template=new-source-suggestion.md&title=%5BSource+Suggestion%5D+Insert+source+name+here",target:"_blank",rel:"noopener noreferrer"}},[_vm._v("\n        "+_vm._s(_vm.$t("sources.issue-button"))+"\n        "),_c("i",{staticClass:"icon external-link mx-2 mt-2"})])]),_vm._v(" "),_c("i18n",{attrs:{path:"sources.detail",tag:"p"},scopedSlots:_vm._u([{key:"single-name",fn:function(){return[_c("strong",[_vm._v("\n          "+_vm._s(_vm.$t("sources.single-name"))+"\n        ")])]},proxy:!0}])}),_vm._v(" "),_c("table",{staticClass:"table is-striped mt-4 mb-10 border border-admin-gray",attrs:{"aria-label":_vm.$t("about.aria.sources-table"),role:"region"}},[_c("thead",[_c("tr",[_c("th",{attrs:{tabindex:"0"},on:{click:function($event){return _vm.sortTable("display_name")},keypress:function($event){return!$event.type.indexOf("key")&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")?null:_vm.sortTable("display_name")}}},[_c("span",{staticClass:"table-header-inner"},[_vm._v("\n              "+_vm._s(_vm.$t("sources.providers.source"))+"\n              "),_c("TableSortIcon",{attrs:{active:"display_name"===_vm.sort.field}})],1)]),_vm._v(" "),_c("th",{attrs:{tabindex:"0"},on:{click:function($event){return _vm.sortTable("source_url")},keypress:function($event){return!$event.type.indexOf("key")&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")?null:_vm.sortTable("source_url")}}},[_c("span",{staticClass:"table-header-inner"},[_vm._v("\n              "+_vm._s(_vm.$t("sources.providers.domain"))+"\n              "),_c("TableSortIcon",{attrs:{active:"source_url"===_vm.sort.field}})],1)]),_vm._v(" "),_c("th",{attrs:{tabindex:"0"},on:{click:function($event){return _vm.sortTable("media_count")},keypress:function($event){return!$event.type.indexOf("key")&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")?null:_vm.sortTable("media_count")}}},[_c("span",{staticClass:"table-header-inner"},[_vm._v("\n              "+_vm._s(_vm.$t("sources.providers.item"))+"\n              "),_c("TableSortIcon",{attrs:{active:"media_count"===_vm.sort.field}})],1)])])]),_vm._v(" "),_c("tbody",_vm._l(_vm.sortedProviders,(function(imageProvider,index){return _c("tr",{key:index},[_c("td",{staticClass:"font-semibold"},[_c("a",{attrs:{href:"/search?source="+imageProvider.source_name}},[_vm._v("\n              "+_vm._s(imageProvider.display_name)+"\n            ")])]),_vm._v(" "),_c("td",{staticClass:"font-semibold"},[_c("a",{attrs:{href:imageProvider.source_url}},[_vm._v("\n              "+_vm._s(imageProvider.source_url)+"\n            ")])]),_vm._v(" "),_c("td",{staticClass:"number-cell font-semibold"},[_vm._v("\n            "+_vm._s(_vm.getProviderMediaCount(imageProvider.media_count||0))+"\n          ")])])})),0)])],1)])}),[],!1,null,"72cefa92",null);const __vuedocgen_export_0=component.exports;__webpack_exports__.default=__vuedocgen_export_0;installComponents(component,{TableSortIcon:__webpack_require__(1270).default}),__vuedocgen_export_0.__docgenInfo={displayName:"source-page",exportName:"default",description:"",tags:{}}}}]);