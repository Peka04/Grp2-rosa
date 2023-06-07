sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("shoprosarw.controller.ProductFragment", {
            onInit: function () { },
            init: function(){
                var oModel1 = new sap.ui.model.json.JSONModel;
                this.getView().setModel(oModel1);
            },
            
            onPress: function(oEvent) {
                var oInput = this.getView().byId("input0");
                var sPrice = oInput.getValue();
                var oFilter = new sap.ui.model.Filter("Price", sap.ui.model.FilterOperator.LT, sPrice);
                var oTable = this.getView().byId("table01");
                oTable.getBinding("items").filter([oFilter]);
                
            },
        });
    });