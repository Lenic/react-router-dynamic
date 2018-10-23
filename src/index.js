import view from './route-view';
import { Consumer } from './utils';
import dynamicProvider from './dynamic-provider';

export const provider = dynamicProvider;

export const DynamicConsumer = Consumer;

export default view;
