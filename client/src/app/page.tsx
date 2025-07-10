'use client'

import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import axios from 'axios'

type Message = {
  sender: 'user' | 'bot'
  content: string
}

export default function ChatBot() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage: Message = { sender: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await axios.post('http://localhost:8000/api/v1/chat', {
       question: userMessage.content })

      const botMessage: Message = {
        sender: 'bot',
        content: res.data.together || 'No response.',
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
        p: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 800,
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          borderRadius: 3,
          boxShadow: 4,
          p: 3,
        }}
      >
        {/* Header */}
        <Typography variant="h5" fontWeight={600} color="primary" mb={2}>
          💬 Code Assistant
        </Typography>

        {/* Chat Messages */}
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

        {/* Input Field */}
        <Box mt={2}>
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSend} disabled={loading}>
                    {loading ? <CircularProgress size={20} /> : <SendIcon sx={{ color: '#1565c0' }} />}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
