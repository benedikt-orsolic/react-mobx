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

        return await response.json();
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

    async get(paramObject) {

        paramObject.pageNumber = paramObject.pageNumber !== undefined ? paramObject.pageNumber : '1';
        paramObject.itemsPerPage = paramObject.itemsPerPage !== undefined ? paramObject.itemsPerPage : '25';

        paramObject.sortBy = paramObject.sortBy !== undefined ? paramObject.sortBy : 'id';
        paramObject.sortOrder = paramObject.sortOrder !== undefined ? paramObject.sortOrder : 'desc';

        paramObject.searchQuarry = paramObject.searchQuarry !== undefined ? paramObject.searchQuarry : '';
        
        paramObject.id = paramObject.id !== undefined ? '/' + paramObject.id : '';



        let page = 'page=' + paramObject.pageNumber + '&rpp=' + paramObject.itemsPerPage;
        let sort = '&sort=' + paramObject.sortBy + '|' + paramObject.sortOrder;
        let search = '&searchQuarry=' + paramObject.searchQuarry;
        let id = paramObject.id;

        let url = baseURL + apiKey + 'resources/' + paramObject.resourceName + id + '?' + page + sort + search
        
        
        
        let response = undefined;
        try{
            response = await fetch(url, {
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

        // If it is a list array is stored in json.item, if server returns single obj from store it is that obj
        let result = json.item !== undefined ? json.item : json;
        return result;
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