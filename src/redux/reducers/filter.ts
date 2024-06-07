import { createReducer } from '@reduxjs/toolkit';
import {
  SET_CATEGORIES,
  SET_SORT,
  SET_BRAND,
  SET_COLOR,
  SET_SIZE1,
  SET_SIZE2,
  SET_SIZE3,
  SET_START_PRICE,
  SET_END_PRICE,
  SET_SEARCH,
  CLEAR_FILTER,
} from '@actions/filter';
import { Filter } from '@/interface';

const initialState = {} as Filter;

const filter = createReducer(initialState, (builder) => {
  builder
    .addCase(SET_CATEGORIES, (state, action) => {
      const STATE = state;
      (Object.keys(STATE) as (keyof typeof STATE)[]).forEach((key) => {
        delete STATE[key];
      });
      STATE.category = action.payload;
    })
    .addCase(SET_SORT, (state, action) => {
      const STATE = state;
      STATE.sort = action.payload;
    })
    .addCase(SET_BRAND, (state, action) => {
      const STATE = state;
      if (action.payload === 'Choose') {
        delete STATE.brand;
      } else {
        STATE.brand = action.payload;
      }
    })
    .addCase(SET_COLOR, (state, action) => {
      const STATE = state;
      if (action.payload === 'Choose') {
        delete STATE.color;
      } else {
        STATE.color = action.payload;
      }
    })
    .addCase(SET_SIZE1, (state, action) => {
      const STATE = state;
      if (STATE.size === undefined) {
        STATE.size = {};
      }
      if (action.payload) {
        STATE.size.size1 = 's';
      } else {
        delete STATE.size.size1;
      }
    })
    .addCase(SET_SIZE2, (state, action) => {
      const STATE = state;
      if (STATE.size === undefined) {
        STATE.size = {};
      }
      if (action.payload) {
        STATE.size.size2 = 'm';
      } else {
        delete STATE.size.size2;
      }
    })
    .addCase(SET_SIZE3, (state, action) => {
      const STATE = state;
      if (STATE.size === undefined) {
        STATE.size = {};
      }
      if (action.payload) {
        STATE.size.size3 = 'l';
      } else {
        delete STATE.size.size3;
      }
    })
    .addCase(SET_START_PRICE, (state, action) => {
      const STATE = state;
      STATE.priceStart = action.payload * 100;
    })
    .addCase(SET_END_PRICE, (state, action) => {
      const STATE = state;
      STATE.priceEnd = action.payload * 100;
    })
    .addCase(SET_SEARCH, (state, action) => {
      const STATE = state;
      STATE.search = action.payload;
    })
    .addCase(CLEAR_FILTER, (state) => {
      const STATE = state;
      (Object.keys(STATE) as (keyof typeof STATE)[]).forEach((key) => {
        if (key !== 'category') delete STATE[key];
      });
    });
});

export default filter;
