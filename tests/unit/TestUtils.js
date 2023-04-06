import { render } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import ElementPlus from 'element-plus';
import router from '@/router';
import i18nInstance from '@/language';

const defaultGlobalConfig = {
  plugins: [
    createTestingPinia({
      initialState: {
        lang: { lang: 'zh-TW' },
      },
    }),
    router,
    ElementPlus,
    i18nInstance,
  ],
  mocks: {
    $t: (msg) => msg,
    $day: vi.fn((val) => ({
      format: vi.fn(() => val.substring(0, 10)),
    })),
  },
};

const customRender = (child, { globalConfig = {}, props = {} } = {}) => {
  const utils = render(child, {
    global: {
      ...defaultGlobalConfig,
      ...globalConfig,
    },
    props,
  });

  return utils;
};

export * from '@testing-library/vue';
export { customRender as render };
