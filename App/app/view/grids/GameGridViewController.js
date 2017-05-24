/*
 * File: app/view/grids/GameGridViewController.js
 *
 * This file was generated by Sencha Architect
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.5.x Modern library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.5.x Modern. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Enif.view.grids.GameGridViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grids.gamegrid',

    getUserName: function(value) {
        let store = Ext.getStore('PlayerData'),
            recordPos = store.find('uid', value),
            rc = store.getAt(recordPos);

        if(rc){
            return rc.get('name');
        } else {
            console.error("Did not found ", value);
            return "Error";
        }
    },

    /* Result option: won, lost, none */
    filterStore: function(player, filterResult) {
        let gridStore = this.getView().getStore(),
            selectedPlayer = player,
            selectedResult = filterResult;


        // clear any filtering on the Store
        gridStore.clearFilter();

        gridStore.filterBy(function(rec) {

            let playerWhite = rec.get('playerWhite'),
                playerBlack = rec.get('playerBlack'),
                result = rec.get('result');


            if(playerWhite === selectedPlayer || playerBlack === selectedPlayer) {

                if(selectedResult == 'none'){
                    return true;
                }

                if( playerWhite === selectedPlayer && result == 'white' && selectedResult == 'won') {
                    return true;
                }

                if ( playerBlack ===  selectedPlayer && result == 'black' && selectedResult == 'won') {
                    return true;
                }

                if( playerWhite === selectedPlayer && result == 'black' && selectedResult == 'lost') {
                    return true;
                }

                if ( playerBlack ===  selectedPlayer && result == 'white' && selectedResult == 'lost') {
                    return true;
                }

                return false;
            } else {
                return false;
            }

        });
    },

    onFilterPlayerChange: function(combobox, newValue, oldValue, eOpts) {
        let selectedPlayer = this.getView().query('combobox[name=playerFilter]')[0].getValue(),
        selectedResult = this.getView().query('combobox[name=resultFilter]')[0].getValue();

        this.filterStore(selectedPlayer, selectedResult);
    },

    onFilterResultChange: function(combobox, newValue, oldValue, eOpts) {
        let selectedPlayer = this.getView().query('combobox[name=playerFilter]')[0].getValue(),
        selectedResult = this.getView().query('combobox[name=resultFilter]')[0].getValue();

        this.filterStore(selectedPlayer, selectedResult);
    },

    onClearFilterTap: function(button, e, eOpts) {
        let selectedPlayerCombo = this.getView().query('combobox[name=playerFilter]')[0], // we can't wipe the player combo
        selectedResultCombo = this.getView().query('combobox[name=resultFilter]')[0];

        // selectedPlayerCombo.clearValue();
        // Error: Clear is not a function - http://docs.sencha.com/extjs/6.5.0/modern/Ext.field.ComboBox.html#method-clearValue
        console.log('Can\'t clear the playerFilter combo - the store filter itself is removed...');
        selectedResultCombo.setValue('none');
        this.getView().getStore().clearFilter();

    }

});