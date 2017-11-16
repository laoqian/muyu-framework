import createHistory from 'history/createBrowserHistory'

let History = function(){
    this.history = createHistory({basename: '#user'});
};

export default History;