import 'whatwg-fetch';
import '@testing-library/jest-dom/extend-expect';
import vueSnapshotSerializer from './serializer';
import server from '../server/server';

expect.addSnapshotSerializer(vueSnapshotSerializer);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
