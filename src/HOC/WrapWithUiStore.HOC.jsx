import React from 'react';

export function WrapWithUiStore(Component, Store) {

    return function New(props) {
        return <Component uiStore={new Store()} {...props} />
    }
}

export function WrapWithPageStore(Component, Store) {

    return function New(props) {
        return <Component PageStore={new Store()} {...props} />
    }
}
