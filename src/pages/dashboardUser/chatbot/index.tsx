import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Divider,
  useTheme,
  styled,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Message {
  from: 'user' | 'ai';
  text: string;
}

const ChatWrapper = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 128px)',
  borderRadius: 25,
  overflow: 'hidden',
}));

const StickyTabs = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 2,
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.grey[50],
  paddingBottom: theme.spacing(10),

  '&::-webkit-scrollbar': {
    width: 8,
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.grey[200],
    borderRadius: 4,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
  },
}));

const InputBar = styled(Box)(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
}));

function TabPanel({
  children,
  value,
  index,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}) {
  return (
    <div role="tabpanel" hidden={value !== index} style={{ height: '100%' }}>
      {value === index && (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ChatPage: React.FC = () => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'ai', text: `Echo: ${input}` }]);
    }, 600);
  };

  return (
    <Box>
      <ChatWrapper elevation={3}>
        {/* Sticky Tabs */}
        <StickyTabs>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="fullWidth"
            sx={{
              '& .MuiTabs-indicator': {
                height: 4,
                borderRadius: 2,
              },
              '& .Mui-selected': {
                color: 'black'
              }
            }}
          >
            <Tab label="AI Chat" sx={{ fontWeight: 600 }} />
            <Tab label="Avatar Chat" sx={{ fontWeight: 600 }} />
          </Tabs>
        </StickyTabs>

        {/* AI Chat Panel */}
        <TabPanel value={tab} index={0}>
          <MessagesContainer ref={scrollRef}>
            {messages.length === 0 ? (
              <Typography
                color="textSecondary"
                align="center"
                sx={{ mt: 4, fontStyle: 'italic' }}
              >
                Start the conversation…
              </Typography>
            ) : (
              messages.map((msg, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      backgroundColor:
                        msg.from === 'user'
                          ? theme.palette.primary.main
                          : theme.palette.grey[300],
                      color: msg.from === 'user'
                        ? theme.palette.primary.contrastText
                        : theme.palette.text.primary,
                    }}
                  >
                    <Typography variant="body1">{msg.text}</Typography>
                  </Box>
                </Box>
              ))
            )}
          </MessagesContainer>

          {/* Sticky Input */}
          <Divider />
          <InputBar>
            <TextField
              fullWidth
              placeholder="Type your message…"
              variant="outlined"
              size="medium"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={!input.trim()}
              sx={{
                ml: 1,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  color: 'white'
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </InputBar>
        </TabPanel>

        {/* Avatar Chat Panel */}
        <TabPanel value={tab} index={1}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              p: 4,
            }}
          >
            <Avatar
              sx={{ bgcolor: theme.palette.primary.main, width: 80, height: 80, mb: 2 }}
            >
              A
            </Avatar>
            <Typography color="textSecondary">Avatar chat coming soon…</Typography>
          </Box>
        </TabPanel>
      </ChatWrapper>
    </Box>
  );
};

export default ChatPage;
