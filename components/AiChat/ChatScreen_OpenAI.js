import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';

// REPLACE WITH YOUR VALID OPENAI API KEY
const OPENAI_API_KEY = "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"; // 🔑 Get from https://platform.openai.com/api-keys

const ChatMessage = ({ message, isUser }) => {
  const handleCopyText = async () => {
    try {
      await Clipboard.setStringAsync(message.text);
      Alert.alert('Success', 'Text copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy text');
    }
  };

  return (
    <View
      style={[
        styles.messageContainer,
        isUser ? styles.userMessageContainer : styles.botMessageContainer
      ]}
    >
      {!isUser && (
        <View style={[styles.avatar, styles.aiAvatar]}>
          <Image
            source={require('../../assets/chatBackground.jpeg')}
            style={styles.botAvatarImage}
          />
        </View>
      )}
      <View style={[
        styles.messageContent,
        isUser ? styles.userMessageContent : styles.botMessageContent
      ]}>
        {message.image && (
          <Image
            source={{ uri: message.image }}
            style={styles.messageImage}
            resizeMode="contain"
          />
        )}
        <Text style={[
          styles.messageText,
          isUser ? styles.userMessageText : styles.botMessageText
        ]}>
          {message.text}
        </Text>
        <View style={styles.messageActions}>
          {!isUser && (
            <TouchableOpacity style={styles.actionButton} onPress={handleCopyText}>
              <Ionicons name="copy-outline" size={20} color="#666" />
              <Text style={styles.actionButtonText}>Copy Text</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isUser && (
        <Image
          source={require('../../assets/WayGo.png')}
          style={styles.avatar}
        />
      )}
    </View>
  );
};

const ChatAI = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I\'m your academic assistant. How can I help?', isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef();

  // Get AI response from OpenAI API
  const getAIResponse = async (userInput) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // ✅ Use valid model name
          messages: [{ role: "user", content: userInput }],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      // Enhanced error handling
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('API Error:', error.message);
      return `Sorry, I'm having trouble: ${error.message}`;
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission needed', 
        'Please enable photo access in Settings to use this feature'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newUserMessage = {
        id: Date.now(),
        image: result.assets[0].uri,
        isUser: true,
      };

      setMessages(prev => [...prev, newUserMessage]);
      
      const aiResponse = "I've received your image. How can I assist you with it?";
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: aiResponse, 
        isUser: false 
      }]);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    
    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text: inputText.trim(),
      isUser: true,
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    
    // Get AI response
    const aiResponse = await getAIResponse(inputText.trim());
    
    // Add AI message
    setMessages(prev => [...prev, { 
      id: Date.now() + 1, 
      text: aiResponse, 
      isUser: false 
    }]);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Image
            source={require('../../assets/MyAcademiaLogo.png')}
            style={styles.headerAvatar}
          />
        </View>
        <Text style={styles.headerTitle}>Ace</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.messagesContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <ChatMessage message={item} isUser={item.isUser} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.scrollView}
        />
        
        {isLoading && (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="small" color="#01796f" />
            <Text style={styles.loadingText}>Ace is thinking...</Text>
          </View>
        )}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask Ace anything"
            placeholderTextColor="#888"
            onSubmitEditing={handleSend}
            multiline={true}
            editable={!isLoading}
          />
          <TouchableOpacity 
            style={styles.inputButton} 
            onPress={pickImage}
            disabled={isLoading}
          >
            <Ionicons name="image-outline" size={24} color="#01796f" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
          >
            <Ionicons name="paper-plane" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
    marginTop: 50
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    padding: 4,
  },
  headerAvatar: {
    width: 45,
    height: 45,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    position: 'absolute',
    left: '45%',
    transform: [{ translateX: -40 }],
  },
  headerRight: {
    width: 24,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  scrollView: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 12,
  },
  aiAvatar: {
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  botAvatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  messageContent: {
    borderRadius: 12,
    padding: 12,
    maxWidth: '75%',
  },
  messageImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  userMessageContent: {
    backgroundColor: '#01796f',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  botMessageContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 1,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  botMessageText: {
    color: '#333333',
  },
  messageActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  actionButtonText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  inputContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    borderRadius: 24,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  inputButton: {
    padding: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#01796f',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#b2dfdb',
  },
  loadingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#e3f2fd',
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  loadingText: {
    marginLeft: 8,
    color: '#01579b',
    fontSize: 14,
  },
});

export default ChatAI;
