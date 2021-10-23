import { ResourcesServiceClass } from './Resources.service';

class MakeStoreServiceClass extends ResourcesServiceClass{
    resourceName = 'MakeList';

    async post(requestBody) {
        return await super.post(this.resourceName, requestBody);
    }

    async delete(id) {
        super.delete(this.resourceName, id)
    }

    async get(paramObject) {
        paramObject = paramObject === undefined ? {} : paramObject;
        paramObject.resourceName = this.resourceName;
        return await super.get(paramObject);
    }

    // Returns true on success 
    async update(id, requestBody) {
        return await super.update(this.resourceName, id, requestBody)
    }
}

export const MakeStoreService = new MakeStoreServiceClass();