import { render } from '@testing-library/vue';
import Users from '../users/Users.vue';

describe('Users Page', () => {
  it('基本', () => {
    const setup = render(Users, {
      global: {
        stubs: ['UserList', 'EditUserModal', 'SearchUser'],
      },
    });

    expect(setup.html()).toMatchSnapshot();
  });
});
