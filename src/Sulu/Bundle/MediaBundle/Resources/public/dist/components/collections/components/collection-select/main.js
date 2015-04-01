define(function(){"use strict";var a={instanceName:"collection-select",title:"",rootCollection:!1,disableIds:[],disabledChildren:!1},b={toggler:['<div id="show-ghost-pages"></div>','<label class="inline spacing-left" for="show-ghost-pages"><%= label %></label>'].join(""),columnNavigation:function(){return['<div id="child-column-navigation"></div>','<div id="wait-container" style="margin-top: 50px; margin-bottom: 200px; display: none;"></div>'].join("")}},c="sulu.media.collection-select.",d=function(){return h.call(this,"open")},e=function(){return h.call(this,"close")},f=function(){return h.call(this,"restart")},g=function(){return h.call(this,"selected")},h=function(a,b){return b||(b=c),b+(this.options.instanceName?this.options.instanceName+".":"")+a};return{$columnNavigationContainer:"#child-column-navigation",$columnNavigation:"#child-column-navigation .container",initialize:function(){this.options=this.sandbox.util.extend(!0,{},a,this.options),this.bindCustomEvents(),this.render()},bindCustomEvents:function(){this.sandbox.on(d.call(this),function(){this.sandbox.emit(h.call(this,"open","husky.overlay."))}.bind(this)),this.sandbox.on(e.call(this),function(){this.sandbox.emit(h.call(this,"close","husky.overlay."))}.bind(this)),this.sandbox.on(f.call(this),function(){this.sandbox.stop(this.$columnNavigation),this.sandbox.once(h.call(this,"opened","husky.overlay."),this.startOverlayColumnNavigation.bind(this))}.bind(this)),this.sandbox.once(h.call(this,"opened","husky.overlay."),this.startOverlayColumnNavigation.bind(this)),this.sandbox.on(h.call(this,"action","husky.column-navigation."),function(a){this.sandbox.emit(g.call(this),a)}.bind(this)),this.sandbox.on(h.call(this,"initialized","husky.column-navigation."),function(){this.sandbox.emit(h.call(this,"set-position","husky.overlay."))}.bind(this))},render:function(){this.renderOverlay()},renderOverlay:function(){var a=this.sandbox.dom.createElement('<div class="overlay-container"/>'),c=[{type:"cancel",align:"center"}];this.sandbox.dom.append(this.$el,a),this.sandbox.start([{name:"overlay@husky",options:{cssClass:"collection-select",el:a,removeOnClose:!1,container:this.$el,instanceName:this.options.instanceName,skin:"wide",slides:[{title:this.sandbox.translate("sulu.media.move.overlay-title"),data:b.columnNavigation(),buttons:c}]}}])},startOverlayColumnNavigation:function(){this.sandbox.dom.append(this.$columnNavigationContainer,'<div class="container"/>');var a={el:this.$columnNavigation,instanceName:this.options.instanceName,actionIcon:"fa-check-circle",resultKey:"collections",showOptions:!1,showStatus:!1,responsive:!1,sortable:!1,skin:"fixed-height-small",disableIds:this.options.disableIds,disabledChildren:this.options.disabledChildren};this.options.rootCollection?a.prefilledData={_embedded:{collections:[{id:"root",title:this.sandbox.translate("navigation.media.collections"),hasSub:!0,_links:{children:{href:"/admin/api/collections?limit=9999"}},_embedded:{collections:[]}}]}}:a.url="/admin/api/collections",this.sandbox.start([{name:"column-navigation@husky",options:a}])}}});