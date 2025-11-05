import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  socialConnectModalOpen: boolean;
}

const initialState: ModalState = {
  socialConnectModalOpen: false,
};

const socialConnectModallSlice = createSlice({
  name: "socialConnectModal",
  initialState,
  reducers: {
    openSocialConnectModal: (state) => {
      state.socialConnectModalOpen = true;
    },
    closeSocialConnectModal: (state) => {
      state.socialConnectModalOpen = false;
    },
  },
});

export const { openSocialConnectModal, closeSocialConnectModal } =
  socialConnectModallSlice.actions;
export default socialConnectModallSlice.reducer;
