import React from 'react';

export function StoreWrapper(Component, store) {

    return function New(props) {
        return <Component uiStore={store} {...props} />
    }
}