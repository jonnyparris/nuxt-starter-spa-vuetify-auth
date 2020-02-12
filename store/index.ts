import { ActionTree } from 'vuex/types/index';
export interface RootState {}

export const actions: ActionTree<RootState, RootState> = {
  resetStore() {
    // TODO clear all store modules here
  }
};
