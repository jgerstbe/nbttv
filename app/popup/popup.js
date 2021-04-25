import * as store from '../store.js';

new Vue({
    el: '#popup',
    data: function() {
        return {
            message: 'You loaded this page on ' + new Date().toLocaleString(),
            filterLists: [],
            newListUrl: '',
            defaultListUrl: 'https://raw.githubusercontent.com/jgerstbe/nbttv/filterlists/assets/default.json'
        }
    },
    methods: {
        getFilterLists: async function() {
            this.filterLists = await store.getFilterLists();
        },
        setFilterLists: function() {
            store.setFilterLists(this.filterLists);
            setTimeout(() => this.getFilterLists(), 1000)
        },
        addList: async function() {
            if (!this.newListUrl) {
                return;
            }
            
            const list = await fetch(this.newListUrl).then(r => r.json());
            if (
                list &&
                list.name &&
                list.author &&
                list.keywords &&
                (list.keywords.length > 0) &&
                list.embeds &&
                (list.embeds.length > 0)
            ) {                
                this.newListUrl = "";
                this.filterLists.push(list);
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