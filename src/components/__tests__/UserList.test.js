import { render } from '@testing-library/vue';
import UserList from '../users/UserList.vue';

describe('User Lists Page', () => {
  it('基本', async () => {
    const setup = render(UserList, {
      global: {
        stubs: ['EditUserModal', 'DeleteUserModal'],
        mocks: {
          $day: vi.fn((val) => ({
            format: vi.fn(() => val.substring(0, 10)),
          })),
        },
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
    });

    const { findByText, getByText } = setup;

    await findByText('user1');

    expect(getByText('2023-02-08')).toBeInTheDocument();
    expect(setup.html()).toMatchSnapshot();
  });
});
