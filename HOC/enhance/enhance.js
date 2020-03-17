import { Provider } from 'react-redux';
import App from 'next/app';

import { initializeStore } from '../../store';

export const enhance = (WrappedComponent, { ssr = true } = {}) => {

  const enhancedComponent = ({ initialReduxState, ...props }) => {
    const store = getOrInitializeStore(initialReduxState);
    return (
      <Provider store={store}>
        <WrappedComponent {...props} />
      </Provider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    enhancedComponent.displayName = `enhance(${displayName})`
    const isAppHoc = WrappedComponent === App || WrappedComponent.prototype instanceof App;
    if (isAppHoc) throw new Error('Enhance HOC only works with Page level components');
  }

  if (ssr || WrappedComponent.getInitialProps) {
    enhancedComponent.getInitialProps = async context => {
      const store = getOrInitializeStore();
      context.store = store;
      const pageProps = typeof WrappedComponent.getInitialProps === 'function' ? await WrappedComponent.getInitialProps(context) : {};
      return {
        ...pageProps,
        initialReduxState: store.getState(),
      };
    };
  }

  return enhancedComponent;
};

let reduxStore;
const getOrInitializeStore = initialState => {
  if (typeof window === 'undefined') {
    return initializeStore(initialState)
  }
  if (!reduxStore) {
    reduxStore = initializeStore(initialState)
  }
  return reduxStore
}