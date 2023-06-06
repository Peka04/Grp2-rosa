sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("shoprosarw.controller.Main", {
            onInit: function () {

            },

            onSelectionChange: function(oEvent){
                var oItem = oEvent.getParameter("listItem");
                var sPath = oItem.getBindingContext().getPath();
                var oTable = this.getView().byId("vlayoutk1");
                oTable.bindElement(sPath);
            }

        });
    });
