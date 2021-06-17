import React from 'react';

export function WrapWithUiStore(Component, Store) {

    return function New(props) {
        return <Component uiStore={new Store()} {...props} />
    }
}