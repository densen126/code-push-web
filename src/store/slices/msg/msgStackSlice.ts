import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MsgItem {
    id: string;
    text: string;
    type: 'info' | 'success' | 'error' | 'warning';
    showTime: number;
}

interface MsgStackState {
    messages: MsgItem[];
}

const initialState: MsgStackState = {
    messages: [],
};

const msgStackSlice = createSlice({
    name: 'msgStack',
    initialState,
    reducers: {
        // 添加展示消息
        addShowMsg: {
            reducer(state, action: PayloadAction<MsgItem>) {
                state.messages.push(action.payload);
            },
            // 生成唯一 id
            prepare(text: string, type: MsgItem['type'] = 'info', showTime: number = 10) {
                return {
                    payload: {
                        id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
                        text,
                        type,
                        showTime,
                    },
                };
            },
        },
        // 关闭（移除）消息
        closeMsg(state, action: PayloadAction<string>) {
            state.messages = state.messages.filter(msg => msg.id !== action.payload);
        },
    },
});

export const { addShowMsg, closeMsg } = msgStackSlice.actions;
export default msgStackSlice.reducer;
