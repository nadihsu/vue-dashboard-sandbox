import { render } from 'Tests/unit/TestUtils';
import Users from '../users/Users.vue';

describe('Users Page', () => {
  it('基本', () => {
    const setup = render(Users, {
      globalConfig: {
        stubs: ['UserList', 'EditUserModal', 'SearchUser'],
      },
    });

    expect(setup.html()).toMatchSnapshot();
  });
});
