import { sendMessage } from '../../api/chatApi'
import {
  CHAT_SEND_REQUEST, CHAT_SEND_SUCCESS, CHAT_SEND_FAILURE,
  CHAT_CLEAR,
} from '../index'

export const sendChatMessage = (question) => async (dispatch, getState) => {
  dispatch({ type: CHAT_SEND_REQUEST })

  const userMessage = {
    id: Date.now(),
    role: 'user',
    content: question,
    timestamp: new Date().toISOString(),
  }

  try {
    const { data } = await sendMessage(question)

    const botMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: data.response,
      context: data.context,
      timestamp: new Date().toISOString(),
    }

    dispatch({
      type: CHAT_SEND_SUCCESS,
      payload: { userMessage, botMessage, threadId: data.thread_id },
    })
    return true
  } catch (error) {
    const message = error.response?.data?.detail || 'Mesaj gonderilemedi'
    dispatch({ type: CHAT_SEND_FAILURE, payload: message })
    return false
  }
}

export const clearChat = () => (dispatch) => {
  dispatch({ type: CHAT_CLEAR })
}
