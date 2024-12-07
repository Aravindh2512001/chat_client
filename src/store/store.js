import { create } from 'zustand';
import { authSlice } from './authSlice';
import { themeSlice } from './themeSlice';
import { useChatStore } from './chatStore';


export const useStore = create((...a) => ({
  ...authSlice(...a),
  ...themeSlice(...a),
  ...useChatStore(...a),
}))
