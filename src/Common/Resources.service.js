import {
    baseURL,
    apiKey
} from './Constants';

const errorLocation = ' At ResourceService.';

class ResourcesServiceClass {

    generateHeaders() {

        let headers = {};

        headers['Authorization']    =  window.user !== undefined ? window.user.getAuthHeader() : undefined;
        headers['Accept']           = 'application/json';
        headers['Content-Type']     = 'application/json';

        return headers;
    }

    async post(resourcesName, requestBody) {

        let response = undefined;
        try{
            response = await fetch(baseURL + apiKey + 'resources/' + resourcesName, {
                method: 'POST',
                headers: this.generateHeaders(),
                body: JSON.stringify(requestBody),
            });
        } catch(error) {
            console.error(error + errorLocation);
            window.msgService.addLog('There was a network error!');
            return;
        }

        switch(response.status) {
            case 401:
                window.msgService.addLog('Unauthorized.');
                break;
            default:
                // Empty
        }
    }

    async delete(resourceName, id) {
        
        let response = undefined;

        try{
            response = await fetch(baseURL + apiKey + 'resources/' + resourceName + '/' + id, {
                method: 'DELETE',
                headers: this.generateHeaders(),
            });
        } catch(error) {
            console.error(error + errorLocation);
            window.msgService.addLog('There was a network error!');
            return;
        }

        switch(response.status) {
            case 401:
                window.msgService.addLog('Unauthorized.');
                break;
            default:
                // Empty
        }
    }

    async get(resourceName, pageNumber=1, itemsPerPage=25, sortBy='id', sortOrder='desc') {
        
        let page = 'page=' + pageNumber + '&rpp=' + itemsPerPage;
        let sort = '&sort=' + sortBy + '|' + sortOrder;
        let search = '&searchQuarry='


        let response = undefined;
        try{
            response = await fetch(baseURL + apiKey + 'resources/' + resourceName + '?' + page + sort + search, {
                method: 'GET',
                headers: this.generateHeaders(),
            });
        } catch(error) {
            console.error(error + errorLocation);
            window.msgService.addLog('There was a network error!');
            return undefined;
        }

        
        switch(response.status) {
            case 401:
                window.msgService.addLog('Unauthorized.');
                break;
            default:
                // Empty
        }

        const json = await response.json();
        return json.item;
    }

    // Returns true on success 
    async update(resourceName, id, requestBody) {

        let response = undefined;
        try{
            response = await fetch(baseURL + apiKey + 'resources/' + resourceName + '/' + id, {
                method: 'PATCH',
                headers: this.generateHeaders(),
                body: JSON.stringify(requestBody)
            });
        } catch(error) {
            console.error(error + errorLocation);
            window.msgService.addLog('There was a network error!');
            return;
        }

        switch(response.status) {
            case 401:
                window.msgService.addLog('Unauthorized.');
                break;
            default:
                // Empty
        }

        return response.status === 204;
    }
    
}


export const ResourcesService = new ResourcesServiceClass();