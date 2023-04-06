import { render } from 'Tests/unit/TestUtils';
import UserList from '../users/UserList.vue';

describe('User Lists Page', () => {
  it('基本', async () => {
    const setup = render(
      UserList,
      {
        globalConfig: {
          stubs: ['EditUserModal', 'DeleteUserModal'],
        },
        props: {
          data: [
            {
              username: 'user1',
              enable: 1,
              locked: 0,
              created_at: '2023-02-08T14:00:00+08:00',
            },
          ],
        },
      },
    );

    const { findByText, getByText } = setup;

    await findByText('user1');

    expect(getByText('2023-02-08')).toBeInTheDocument();
    expect(setup.html()).toMatchSnapshot();
  });
});
