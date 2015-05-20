define(["text!sulusearch/components/dropdown-input/main.html"],function(a){"use strict";var b={instanceName:"",data:[],valueName:"name",preSelectedElement:0,focused:!1,icons:{inputIcon:"fa-search"}},c=function(a){return"sulu.dropdown-input."+(this.options.instanceName?this.options.instanceName+".":"")+a},d=function(){return c.call(this,"initialized")},e=function(){return c.call(this,"set")},f=function(){return c.call(this,"focus")},g=function(){return c.call(this,"action")},h=function(){return c.call(this,"change")},i=function(){return c.call(this,"clear")};return{initialize:function(){this.options=this.sandbox.util.extend(!0,{},b,this.options),this.mainTemplate=this.sandbox.util.template(a),this.render(),this.storeSelectors(),this.bindEvents(),this.bindDomEvents(),this.sandbox.emit(d.call(this))},bindEvents:function(){this.sandbox.on(f.call(this),this.focusInputhandler.bind(this)),this.sandbox.on(e.call(this),this.setSelected.bind(this)),this.sandbox.on("husky.select."+this.dropDownInstance+".selected.item",this.dropdownChangeHandler.bind(this))},bindDomEvents:function(){this.$el.on("click",".dropdown-input-action-icon",this.inputActionHandler.bind(this)),this.$el.on("click",".dropdown-input-clear",this.clearInput.bind(this)),this.$el.on("input",".dropdown-input-entry",this.inputChangeHandler.bind(this)),this.$el.on("keydown",".dropdown-input-entry",this.inputKeyDownHandler.bind(this))},setSelected:function(a){this.sandbox.dom.find(".husky-select",this.$el).data({selection:a.id,selectionValues:a.name}).trigger("data-changed"),this.selectedElement=a.id,this.sandbox.emit(h.call(this),{value:this.$input.val(),selectedElement:this.selectedElement})},storeSelectors:function(){this.$input=this.$el.find(".dropdown-input-entry"),this.$dropdownContainer=this.$el.find(".dropdown-input-container")},render:function(){var a=this.mainTemplate({icons:this.options.icons});this.$el.html(a),this.storeSelectors(),this.updatePlaceHolder(),this.createDropdown(),this.options.focused&&this.focusInputhandler()},createDropdown:function(){this.dropDownInstance=this.options.instanceName+"Select",this.sandbox.start([{name:"select@husky",options:{el:this.$el.find(".dropdown-input-trigger-container"),instanceName:this.options.instanceName+"Select",valueName:this.options.valueName,multipleSelect:!1,emitValues:!1,preSelectedElements:[this.options.preSelectedElement],data:this.options.data}}])},updatePlaceHolder:function(){var a;a=void 0!==this.selectedElement?this.selectedElement:this.options.preSelectedElement,a=_.where(this.options.data,{id:a})[0],this.$input.attr({placeholder:a.placeholder||""})},dropdownChangeHandler:function(a){this.selectedElement=a,this.sandbox.emit(h.call(this),{value:this.$input.val(),selectedElement:this.selectedElement}),this.updatePlaceHolder()},inputChangeHandler:function(){this.$input.val()?this.$dropdownContainer.addClass("is-filled"):this.$dropdownContainer.removeClass("is-filled")},inputKeyDownHandler:function(a){13===a.which&&(a.preventDefault(),this.inputActionHandler())},clearInput:function(){this.$input.val(""),this.$input.focus(),this.$dropdownContainer.removeClass("is-filled"),this.sandbox.emit(i.call(this))},focusInputhandler:function(){this.$input.focus()},inputActionHandler:function(){this.sandbox.emit(g.call(this),{value:this.$input.val(),selectedElement:this.selectedElement})}}});