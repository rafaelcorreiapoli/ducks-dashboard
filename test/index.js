'use strict';

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised';
import chaiImmutable from 'chai-immutable';
import { Map, fromJS } from 'immutable'

chai.use(chaiImmutable);
chai.use(chaiAsPromised);
chai.should()

const expect = chai.expect
const assert = chai.assert

import reducer, { setSearchText, setPageSize, setPage, setSort, registerSearch, setFilter, setResults } from '../src/index.js'

const state = fromJS({
  search1: {
    searchText: '',
    page: 0,
    sort: 'nome.asc',
    filter: {},
    results: {},
    pageSize: 10,
  }
})

describe('Dashboard', function() {
  describe('Reducer', function() {
    it('initialState', function() {
      const actual = reducer(undefined, {})
      const expected = Map({})
      assert.equal(actual, expected)
    })
    it('setPageSize', function() {
      const action = setPageSize('search1', 20)
      const nextState = reducer(state, {})

      const expected = fromJS({
        search1: {
          searchText: '',
          page: 0,
          sort: 'nome.asc',
          filter: {},
          results: {},
          pageSize: 10,
        }
      })

      assert.deepEqual(nextState, expected)
    })

    it('setPage', function() {
      const action = setPage('search1', 1)
      const nextState = reducer(state, action)

      expect(nextState).to.equal(fromJS({
        search1: {
          searchText: '',
          page: 1,
          sort: 'nome.asc',
          filter: {},
          results: {},
          pageSize: 10,
        }
      }))
    })


    it('setSort', function() {
      const action = setSort('search1', 'nome.desc')
      const nextState = reducer(state, action)

      expect(nextState).to.equal(fromJS({
        search1: {
          searchText: '',
          page: 0,
          sort: 'nome.desc',
          filter: {},
          results: {},
          pageSize: 10,
        }
      }))
    })

    it('registerSearch', function() {
      const action = registerSearch('search2')
      const nextState = reducer(state, action)

      expect(nextState).to.equal(fromJS({
        search1: {
          searchText: '',
          page: 0,
          sort: 'nome.asc',
          filter: {},
          results: {},
          pageSize: 10,
        },
        search2: {
          searchText: '',
          page: 0,
          sort: 'nome.asc',
          filter: {},
          results: {},
          pageSize: 10,
        }
      }))
    })


    it('setFilter', function() {
      const action = setFilter('search1', {})
      const nextState = reducer(state, action)

      expect(nextState).to.equal(fromJS({
        search1: {
          searchText: '',
          page: 0,
          sort: 'nome.asc',
          filter: {},
          results: {},
          pageSize: 10,
        },
      }))
    })


    it('setResults', function() {
      const action = setResults('search1', {
        id1: {
          name: 'rafa'
        }
      })

      const nextState = reducer(state, action)

      expect(nextState).to.equal(fromJS({
        search1: {
          searchText: '',
          page: 0,
          sort: 'nome.asc',
          filter: {},
          results: {
            id1: {
              name: 'rafa'
            }
          },
          pageSize: 10,
        },
      }))
    })

    it('setSearchText', function() {
      const action = setSearchText('search1', 'ra')
      const nextState = reducer(state, action)

      expect(nextState).to.equal(fromJS({
        search1: {
          searchText: 'ra',
          page: 0,
          sort: 'nome.asc',
          filter: {},
          results: {},
          pageSize: 10,
        },
      }))
    })
  })
  describe('Action Creators', function() {
    it('setSearchText', function() {
      const action = setSearchText('search1', 'ra')

      assert.deepEqual(action, {
        type: 'dashboard/SET_SEARCH_TEXT',
        payload: {
          searchId: 'search1',
          searchText: 'ra'
        }
      })
    })

    it('setPageSize', function() {
      const action = setPageSize('search1', 10)

      assert.deepEqual(action, {
        type: 'dashboard/SET_PAGE_SIZE',
        payload: {
          searchId: 'search1',
          pageSize: 10
        }
      })
    })

    it('setPage', function() {
      const action = setPage('search1', 1)

      assert.deepEqual(action, {
        type: 'dashboard/SET_PAGE',
        payload: {
          searchId: 'search1',
          page: 1
        }
      })
    })

    it('setSort', function() {
      const action = setSort('search1', 'nome.asc')

      assert.deepEqual(action, {
        type: 'dashboard/SET_SORT',
        payload: {
          searchId: 'search1',
          sort: 'nome.asc'
        }
      })
    })

    it('setFilter', function() {
      const action = setFilter('search1', {
        age: [0, 10]
      })

      assert.deepEqual(action, {
        type: 'dashboard/SET_FILTER',
        payload: {
          searchId: 'search1',
          filter: {
            age: [0, 10]
          }
        }
      })
    })

    it('setResults', function() {
      const action = setResults('search1', {
        id1: {
          name: 'rafa'
        }
      })

      assert.deepEqual(action, {
        type: 'dashboard/SET_RESULTS',
        payload: {
          searchId: 'search1',
          results: {
            id1: {
              name: 'rafa'
            }
          }
        }
      })
    })


  })
});
