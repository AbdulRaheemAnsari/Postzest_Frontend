import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  createPostModalOpen: boolean;
}

const initialState: ModalState = {
  createPostModalOpen: false,
};

const createPostModalSlice = createSlice({
  name: "postModal",
  initialState,
  reducers: {
    openCreatePostModal: (state) => {
      state.createPostModalOpen = true;
    },
    closeCreatePostModal: (state) => {
      state.createPostModalOpen = false;
    },
  },
});

export const { openCreatePostModal, closeCreatePostModal } = createPostModalSlice.actions;
export default createPostModalSlice.reducer;
