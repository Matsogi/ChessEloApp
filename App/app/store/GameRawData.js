/*
 * File: app/store/GameRawData.js
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

/*
    This are the data about the actual games played
*/
Ext.define('Enif.store.GameRawData', {
    extend: 'Ext.data.Store',

    requires: [
        'Enif.model.GamesData',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',
        'Ext.util.Sorter'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'GameRawData',
            autoLoad: true,
            model: 'Enif.model.GamesData',
            proxy: {
                type: 'ajax',
                url: 'http://chess.pagep.net:8181/games',
                actionMethods: {
                    create: 'PUT',
                    read: 'GET',
                    update: 'POST',
                    destroy: 'DELETE'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json'
                }
            },
            listeners: {
                datachanged: {
                    fn: me.onGameDataChange
                },
                remove: {
                    fn: me.onJsonstoreRemove
                }
            },
            sorters: {
                direction: 'DESC',
                property: 'timestamp'
            }
        }, cfg)]);
    },

    /* Reaload the chart */
    onGameDataChange: function(store, eOpts) {
        Ext.getStore('EloRatinChart').load();
        Ext.getStore("pivot.HeatMap").load();
    },

    onJsonstoreRemove: function(store, records, index, isMove, eOpts) {
        store.sync();
    }

});