import { render } from '@testing-library/vue';
import About from '../About.vue';

describe('About Page', () => {
  it('基本', () => {
    const setup = render(About);

    expect(setup.html()).toMatchSnapshot();
  });
});
