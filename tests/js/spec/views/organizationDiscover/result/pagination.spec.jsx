import React from 'react';
import {mount} from 'enzyme';

import Pagination from 'app/views/organizationDiscover/result/pagination';

describe('Pagination Subtexts', function() {
  let wrapper;

  beforeEach(function() {
    wrapper = mount(
      <Pagination
        baseQuery={{
          previous: null,
          current: '0:0:1',
          next: '0:10:0',
          data: {data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]},
        }}
        getNextPage={jest.fn()}
        getPreviousPage={jest.fn()}
      />,
      TestStubs.routerContext()
    );
  });

  it('shows correct number results shown on current page', async function() {
    expect(wrapper.find('NumberResultsShown').exists()).toBe(true);

    expect(wrapper.find('NumberResultsShown').text()).toBe('Results 1 - 10');
  });

  it('shows correct number of results shown when going to next page (next page function mocked on click)', async function() {
    wrapper.setProps({
      baseQuery: {
        previous: '0:0:1',
        current: '0:10:0',
        next: '0:20:0',
        data: {data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]},
      },
    });

    expect(wrapper.find('NumberResultsShown').text()).toBe('Results 11 - 20');
  });

  it('shows 0 Results with no data', async function() {
    wrapper.setProps({
      baseQuery: {
        previous: '0:0:1',
        current: '0:10:0',
        next: '0:20:0',
        data: {data: []},
      },
    });

    expect(wrapper.find('NumberResultsShown').text()).toBe('0 Results');
  });
});
