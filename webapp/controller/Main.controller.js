sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("shoprosarw.controller.Main", {



            onSelectionChangeProduct: function(oEvent){
                var oItem = oEvent.getParameter("listItem");
                var sPath = oItem.getBindingContext().getPath();
                var oTable = this.getView().byId("vlayoutk1");
                oTable.bindElement(sPath);
            },

            onSelectionChangeCategory: function(oEvent){
                //TODO: display all products for this category
/*                 var oItem = oEvent.getParameter("listItem");
                var sPath = oItem.getBindingContext().getPath();
                var oTable = this.getView().byId("idCategoriesTable1");
                oTable.bindElement( {
                    path: sPath ,
                    parameters: {expand: "Products"}
                }); */
            },

            onIconTabSelect: function(oEvent){
                var oSplitApp = this.getView().byId("_IDGenSplitApp1");
                var oIcon = oEvent.getParameter("item");
                if(oIcon == this.getView().byId("_IDGenIconTabFilter1")){
                    oSplitApp.toDetail("application-shoprosarw-display-component---Main--_IDGenPage2", "slide");
                } else if(oIcon == this.getView().byId("_IDGenIconTabFilter2")){
                    oSplitApp.toDetail("application-shoprosarw-display-component---Main--_IDGenPage3", "slide");
                }
            },
            onPress: function(oEvent) {
                var oInput = this.getView().byId("input00");
                var sPrice = oInput.getValue();
                var oInput1 = this.getView().byId("input01");
                var sPrice1 = oInput1.getValue();
                var oFilter = new sap.ui.model.Filter("Price", sap.ui.model.FilterOperator.BT, sPrice, sPrice1);
                var oTable = this.getView().byId("idProductsTable");
                oTable.getBinding("items").filter([oFilter]);
                
            },

            onReset: function(oEvent) {
                var oTable = this.getView().byId("idProductsTable");
                oTable.getBinding("items").filter(null);
			    oTable.getBinding("items").sort(null);
			    var oInput = this.getView().byId("input00");
			    oInput.setValue(null);
                var oInput1 = this.getView().byId("input01");
			    oInput1.setValue(null);
            },

            onSort: function(oEvent) {
                var oSorter = new sap.ui.model.Sorter("Price", false);
                var oTable = this.getView().byId("idProductsTable");
                oTable.getBinding("items").sort([oSorter]);
            }
        });
    });
