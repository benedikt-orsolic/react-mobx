import {
    baseURL,
    apiKey
} from './Constants';

class ResourcesServiceClass {

    generateHeaders() {

        let headers = {};

        headers['Authorization']    =  window.user !== undefined ? window.user.getAuthHeader() : undefined;
        headers['Accept']           = 'application/json';
        headers['Content-Type']     = 'application/json';

        return headers;
    }

    async post(resourcesName, requestBody) {

        if(!window.user.isLoggedIn()) { return; }

        const response = await fetch(baseURL + apiKey + 'resources/' + resourcesName, {
            method: 'POST',
            headers: this.generateHeaders(),
            body: JSON.stringify(requestBody),
        })
    }

    async delete(resourceName, id) {

        if(!window.user.isLoggedIn()) { return; }
        
        const response = await fetch(baseURL + apiKey + 'resources/' + resourceName + '/' + id, {
            method: 'DELETE',
            headers: this.generateHeaders(),
        })
    }

    async get(resourceName, pageNumber=1, itemsPerPage=25, sortBy='id', sortOrder='desc') {

        let page = 'page=' + pageNumber + '&rpp=' + itemsPerPage;
        let sort = '&sort=' + sortBy + '|' + sortOrder;
        let search = '&searchQuarry='

        const response = await fetch(baseURL + apiKey + 'resources/' + resourceName + '?' + page + sort + search, {
            method: 'GET',
            headers: this.generateHeaders(),
        })
        const json = await response.json();
        return json.item;
    }

    // Returns true on success 
    async update(resourceName, id, requestBody) {

        if(!window.user.isLoggedIn()) { return; }

        const response = await fetch(baseURL + apiKey + 'resources/' + resourceName + '/' + id, {
            method: 'PATCH',
            headers: this.generateHeaders(),
            body: JSON.stringify(requestBody)
        });

        return response.status === 204;
    }
    
}


export const ResourcesService = new ResourcesServiceClass();