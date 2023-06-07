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

            _oParent: null,
            onInit: function () { },

            init: function(oParent){
                this._oParent = oParent;
                var oModel1 = new sap.ui.model.json.JSONModel;
                this._oParent.getView().setModel(oModel1);


                 var oCore = sap.ui.getCore();
                oCore.attachParseError(this.onFehler); 
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
            },

             onFehler: function(oEvent) {
                var oElement = oEvent.getParameter("element");
                oElement.setValueState(sap.ui.core.ValueState.Error);
            } 
        });
    });

