'use client'

import {
  Box,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
  Tooltip,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import axios from 'axios'
import { Message } from '@mui/icons-material'

type Message = {
  sender: 'user' | 'bot'
  content: string
}

export default function ChatBot() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedModel, setModel] = useState('mistralai/Mixtral-8x7B-Instruct-v0.1')

  const models = [
  {
    label: 'Mixtral 8x7B Instruct',
    value: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
  },
  
  {
    label: 'DeepSeek',
    value: 'deepseek-ai/DeepSeek-V3',
  },
  {
    label: 'Meta Llama',
    value: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
  },

]


  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage: Message = { sender: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await axios.post('http://localhost:8000/api/v1/chat', {
       user_question: userMessage.content,
       llm_model: selectedModel 
      })

      const botMessage: Message = {
        sender: 'bot',
        content: res.data.llm_response || 'No response.',
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot' as const, content: '❌ Something went wrong.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handlePseudocode = async () => {
    if(!input.trim()) return
    const userMessage: Message={sender: 'user', content: input}
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
    const res= await axios.post('http://localhost:8000/api/v1/pseudocode', {
      user_question: userMessage.content,
      llm_model: selectedModel
    })
    const botMessage: Message = {
      sender: 'bot',
      content: res.data.llm_response || 'No response.'
    }
    setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot' as const, content: '❌ Something went wrong.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  
  return (
  <Box
    sx={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#e3eaf2',
     
    }}
  >
    <Box
      sx={{
        width: '100%',
        maxWidth: 1000,
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        borderRadius: 3,
        boxShadow: 4,
        p: 3,
      }}
    >
      <Typography variant="h5" fontWeight={600} color="primary" mb={2}>
        💬 Code Assistant
      </Typography>
      {/* Message Box */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          pr: 1,
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              bgcolor: msg.sender === 'user' ? '#1565c0' : '#f0f0f0',
              color: msg.sender === 'user' ? 'white' : '#1a1a1a',
              px: 2,
              py: 1.5,
              borderRadius: 2,
              maxWidth: '80%',
              whiteSpace: 'pre-wrap',
              fontSize: '0.9rem',
              boxShadow: 1,
            }}
          >
            {msg.content}
          </Box>
        ))}

        {loading && (
          <Typography
            sx={{
              color: 'gray',
              fontStyle: 'italic',
              fontSize: '0.85rem',
            }}
          >
            Generating response...
          </Typography>
        )}
      </Box>

      {/* Input Box */}
  <Box mt={2} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  <TextField
    multiline
    rows={4}
    placeholder="Ask your coding question..."
    fullWidth
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    }}
  />

  {/* Send and Pseudocode Button */}
  <IconButton
    onClick={handleSend}
    disabled={loading}
    sx={{ height: '56px', width: '56px', bgcolor: '#1565c0', color: 'white' }}
  >
    {loading ? <CircularProgress size={20} /> : <SendIcon />}
  </IconButton>
  <Tooltip title="Generate Pseudocode" arrow>
  <IconButton onClick={handlePseudocode} disabled={loading}>
    📝
  </IconButton>
  </Tooltip>

  {/* Model Selector*/}
  <TextField
    select
    value={selectedModel}
    onChange={(e) => setModel(e.target.value)}
    size="small"
    sx={{ minWidth: 160}}
  >
    {models.map((model) => (
      <MenuItem key={model.value} value={model.value}>
        {model.label}
      </MenuItem>
    ))}
  </TextField>
  </Box>
    </Box>
  </Box>
)
}