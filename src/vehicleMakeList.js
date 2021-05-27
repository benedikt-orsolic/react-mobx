import { observable, autorun } from 'mobx';

export var vehicleMakeList = observable([
    { id: 1, name: 'Jaguar', abr: 'Jaguar' },
    { id: 2, name: 'Renault', abr: 'Renault' },
    { id: 3, name: 'BMW', abr:'BMW' },
]);

autorun(()=>{
    console.log(vehicleMakeList);
});