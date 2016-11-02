import { Map, fromJS } from 'immutable'

const SET_SEARCH_TEXT = 'dashboard/SET_SEARCH_TEXT'
const SET_PAGE = 'dashboard/SET_PAGE'
const SET_SORT = 'dashboard/SET_SORT'
const SET_FILTER = 'dashboard/SET_FILTER'
const SET_RESULTS = 'dashboard/SET_RESULTS'
const SET_PAGE_SIZE = 'dashboard/SET_PAGE_SIZE'
const REGISTER_SEARCH = 'dashboard/REGISTER_SEARCH'

export const getSearchText = (state, searchId) => state.dashboard.getIn([searchId, 'searchText'])
export const getPage = (state, searchId) => state.dashboard.getIn([searchId, 'page'])
export const getFilter = (state, searchId) => state.dashboard.getIn([searchId, 'filter'])
export const getSort = (state, searchId) => state.dashboard.getIn([searchId, 'sort'])
export const getResults = (state, searchId) => state.dashboard.getIn([searchId, 'results'])
export const getPageSize = (state, searchId) => state.dashboard.getIn([searchId, 'pageSize'])

export const newSearch = (searchId, searchFn) => (dispatch, getState) => {
  const state = getState()
  const page = getPage(state, searchId)
  const searchText = getSearchText(state, searchId)
  const filter = getFilter(state, searchId)
  const sort = getSort(state, searchId)
  const pageSize = getPageSize(state, searchId)

  console.log('calling new search!')
  searchFn && searchFn({
    page,
    searchText,
    filter,
    sort,
    pageSize,
  })
}
export const setSearchText = (searchId, searchText) => ({
  type: SET_SEARCH_TEXT,
  payload: {
    searchId,
    searchText,
  },
})
export const setPage = (searchId, page) => ({
  type: SET_PAGE,
  payload: {
    searchId,
    page,
  },
})
export const setSort = (searchId, sort) => ({
  type: SET_SORT,
  payload: {
    searchId,
    sort,
  },
})
export const setFilter = (searchId, filter) => ({
  type: SET_FILTER,
  payload: {
    searchId,
    filter,
  },
})

export const setPageSize = (searchId, pageSize) => ({
  type: SET_PAGE_SIZE,
  payload: {
    searchId,
    pageSize,
  },
})
export const setResults = (searchId, results) => ({
  type: SET_RESULTS,
  payload: {
    searchId,
    results,
  },
})

export const registerSearch = (searchId, initialState) => ({
  type: REGISTER_SEARCH,
  payload: {
    searchId,
    initialState,
  }
})


const searchShape = {
  searchText: '',
  page: 0,
  sort: 'nome.asc',
  filter: {

  },
  results: {},
  pageSize: 10,
}

const initialState = Map({})

export default (state = initialState, action) => {
  if (!action.payload || !action.payload.searchId) return state
  const {
    searchId,
  } = action.payload

  switch (action.type) {
    case SET_SEARCH_TEXT:
      return state.setIn([searchId, 'searchText'], action.payload.searchText)
    case SET_PAGE:
      return state.setIn([searchId, 'page'], action.payload.page)
    case SET_SORT:
      return state.setIn([searchId, 'sort'], action.payload.sort)
    case SET_FILTER:
      return state.setIn([searchId, 'filter'], fromJS(action.payload.filter))
    case SET_RESULTS:
      return state.setIn([searchId, 'results'], fromJS(action.payload.results))
    case SET_PAGE_SIZE:
      return state.setIn([searchId, 'pageSize'], action.payload.pageSize)
    case REGISTER_SEARCH:
      if (state.get(searchId)) {
        return state
      }
      return state.set(searchId, fromJS(action.payload.initialState || searchShape))
    default:
      return state
  }
}
