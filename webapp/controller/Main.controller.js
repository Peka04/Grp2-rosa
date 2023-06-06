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
                var oHBox = this.getView().byId("vlayoutk1");
                oHBox.bindElement("/Products(1)");


            }
        });
    });
