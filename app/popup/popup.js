import { setFilterLists, getFilterLists } from '../store.js';

new Vue({
    el: '#popup',
    data: function() {
        return {
            message: 'You loaded this page on ' + new Date().toLocaleString(),
            filterLists: [],
            newListUrl: "",
        }
    },
    methods: {
        getFilterLists: async function() {
            this.filterLists = await getFilterLists();
            console.log('filterLists', this.filterLists);
        },
        setFilterLists: function() {
            if (!this.filterLists || this.filterLists.length == 0) {
                return;
            }
            setFilterLists(this.filterLists);
        },
        addList: async function() {
            if (!this.newListUrl) {
                return;
            }
            
            const list = await fetch(this.newListUrl).then(r => r.json());
            
            if (list && list.keywords) {                
                this.newListUrl = "";
                this.filterLists.push(this.newListUrl);
                this.setFilterLists(this.filterLists);
            } 
        },
        removeList: function(index) {
            this.filterLists.splice(index, 1);
            this.setFilterLists(this.filterLists);
        }
    },
    mounted: function () {
        this.getFilterLists();
    }
});