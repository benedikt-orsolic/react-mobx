import React from 'react';

export function StoreWrapper(Component, Store) {

    return function New(props) {
        return <Component uiStore={new Store()} {...props} />
    }
}