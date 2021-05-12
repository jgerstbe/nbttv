import * as store from '../store.js';

new Vue({
    el: '#popup',
    data: function() {
        return {
            message: 'You loaded this page on ' + new Date().toLocaleString(),
            filterLists: [],
            newListUrl: '',
            newFilter: '',
            localList: {
                keywords: []
            }
        }
    },
    methods: {
        getFilterLists: async function() {
            // console.log('getFilerLists', JSON.stringify(this.filterLists))
            const lists = await store.get('filterLists');
            if (Array.isArray(lists)) {
                this.filterLists = lists;
            }
            // console.log('getFilerLists', JSON.stringify(this.filterLists))
        },
        setFilterLists: function() {
            store.set('filterLists', this.filterLists);
            setTimeout(() => this.getFilterLists(), 1000)
        },
        setLocalList: function() {
            store.set('localList', [this.localList]);
            setTimeout(() => this.getLocalList(), 1000)
        },
        getLocalList: async function() {
            const list = await store.get('localList');
            if (Array.isArray(list) && list[0]) {
                this.localList = list[0];
            }
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
                this.setFilterLists([...this.filterLists, this.localList]);
            } 
        },
        removeList: function(index) {
            this.filterLists.splice(index, 1);
            this.setFilterLists();
        },
        addLocalKeyword: function() {
            if (!this.newFilter || (this.newFilter.length == 0)) {
                return;
            }
            this.localList.keywords.push(this.newFilter);
            this.setLocalList();
            this.newFilter = '';
        },
        removeLocalKeyword: function(index) {
            this.localList.keywords.splice(index, 1);
            this.setLocalList();
        }
    },
    mounted: function () {
        this.getFilterLists();
        this.getLocalList();
    }
});