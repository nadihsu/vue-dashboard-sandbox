import { render } from 'Tests/unit/TestUtils';
import App from '@/App.vue';

describe('Main Page', () => {
  it('基本', () => {
    const setup = render(App);

    expect(setup.html()).toMatchSnapshot();
  });
});
