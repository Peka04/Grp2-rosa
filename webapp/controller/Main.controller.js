sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("shoprosarw.controller.Main", {

            onSelectionChangeProduct: function(oEvent){
                this.getView().byId("stepInput").setValue("0");
                this.getView().byId("stepInput").setEnabled(true);

                var oItem = oEvent.getParameter("listItem");
                var sPath = oItem.getBindingContext().getPath();
                var oTable = this.getView().byId("vlayoutk1");
                oTable.bindElement(sPath);
            },

            onSelectionChangeCategory: function (oEvent) {
                var oItem = oEvent.getParameter("listItem");
                var sPath = oItem.getBindingContext().getPath();
                var oTable = this.getView().byId("idCategoriesTable1");
                let oItemTemplate = new sap.m.ColumnListItem({
                  cells: [
                    new sap.m.Text({        
                      text: "{Name}",      
                    }),     
                    new sap.m.Text({
                      text: "{Price}",
                    }),
                   new sap.m.Text({
                      text: "{Rating}",
                    }),
                  ],
                });
                let newPath = sPath + "/Products";
                oTable.bindItems(newPath, oItemTemplate);
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
            },

             onAmountChange: function(oEvent){
                var sValue = oEvent.getSource().getValue();
                var sPrice = this.getView().byId("text9").getText();
                this.wk = this.getOwnerComponent().getModel("orders");
                let nOldAmount = this.wk.getProperty("/amount");
                let nNewAmount = nOldAmount + Number(sPrice);
                this.wk.setProperty("/amount", nNewAmount);
                
                let neueBestellung = {"productId": "", "name": this.getView().byId("text7").getText(), "menge": 1};
                var json = this.wk.getProperty("/warenkorb");
                json.push(neueBestellung);
                this.wk.setProperty("/warenkorb", json);
            } ,

            sendOrder: function(oEvent){
                MessageBox.show(
                    "Bestellung erfolgreich.", {
                        icon: MessageBox.Icon.INFORMATION,
                        title: "Bestellung erfolgreich.",
                        actions: [MessageBox.Action.YES],
                    }
                );
                this.getView().byId("stepInput").setValue("0");
                this.wk.setProperty("/amount", 0);
                this.wk.setProperty("/warenkorb", new Array());
            }
            
        });
    });
