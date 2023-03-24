import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import About from '../About.vue';

describe('About Page', () => {
  it('基本', () => {
    const render = mount(About);

    expect(render.text()).toContain('This is about page');
    expect(render.html()).toMatchSnapshot();
  });
});
