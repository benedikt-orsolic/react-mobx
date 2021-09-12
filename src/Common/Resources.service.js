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

        const response = await fetch(baseURL + apiKey + 'resources/' + resourcesName, {
            method: 'POST',
            headers: this.generateHeaders(),
            body: JSON.stringify(requestBody),
        });

        switch(response.status) {
            case 401:
                window.msgService.addLog('Unauthorized.');
                break;
        }
    }

    async delete(resourceName, id) {
        
        const response = await fetch(baseURL + apiKey + 'resources/' + resourceName + '/' + id, {
            method: 'DELETE',
            headers: this.generateHeaders(),
        });

        switch(response.status) {
            case 401:
                window.msgService.addLog('Unauthorized.');
                break;
        }
    }

    async get(resourceName, pageNumber=1, itemsPerPage=25, sortBy='id', sortOrder='desc') {

        let page = 'page=' + pageNumber + '&rpp=' + itemsPerPage;
        let sort = '&sort=' + sortBy + '|' + sortOrder;
        let search = '&searchQuarry='

        const response = await fetch(baseURL + apiKey + 'resources/' + resourceName + '?' + page + sort + search, {
            method: 'GET',
            headers: this.generateHeaders(),
        });

        switch(response.status) {
            case 401:
                window.msgService.addLog('Unauthorized.');
                break;
        }

        const json = await response.json();
        return json.item;
    }

    // Returns true on success 
    async update(resourceName, id, requestBody) {

        const response = await fetch(baseURL + apiKey + 'resources/' + resourceName + '/' + id, {
            method: 'PATCH',
            headers: this.generateHeaders(),
            body: JSON.stringify(requestBody)
        });

        switch(response.status) {
            case 401:
                window.msgService.addLog('Unauthorized.');
                break;
        }

        return response.status === 204;
    }
    
}


export const ResourcesService = new ResourcesServiceClass();