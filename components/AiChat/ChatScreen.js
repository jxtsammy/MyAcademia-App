import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';

const ChatMessage = ({ message, isUser, }) => {
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
          <View style={styles.feedbackButtons}>
          </View>
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

const ChatAI = ({navigation}) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'What is AI chat bot ?', isUser: true },
    {
      id: 2,
      text: 'An AI chatbot is a computer program designed to simulate human conversation through text or voice interactions. What sets it apart from traditional chatbots is its ability to understand and respond to user input in a natural, human-like way.',
      isUser: false
    },
    { id: 3, text: 'How Does it Work?', isUser: true },
    {
      id: 4,
      text: 'User Input:\nYou type or speak a message.\nProcessing:\nThe chatbot\'s AI analyzes your message to understand its meaning.',
      isUser: false
    }
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newUserMessage = {
        id: messages.length + 1,
        image: result.assets[0].uri,
        isUser: true,
      };

      setMessages(prevMessages => [...prevMessages, newUserMessage]);

      setTimeout(() => {
        const newAIMessage = {
          id: messages.length + 2,
          text: "I've received your image. What would you like to know about it?",
          isUser: false,
        };
        setMessages(prevMessages => [...prevMessages, newAIMessage]);
      }, 1000);
    }
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const newUserMessage = {
        id: messages.length + 1,
        text: inputText.trim(),
        isUser: true,
      };

      setMessages(prevMessages => [...prevMessages, newUserMessage]);
      setInputText('');

      setTimeout(() => {
        const newAIMessage = {
          id: messages.length + 2,
          text: "This is a simulated AI response.",
          isUser: false,
        };
        setMessages(prevMessages => [...prevMessages, newAIMessage]);
      }, 1000);
    }
  };

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

      <ImageBackground
        source={require('../../assets/chatBackground.jpeg')}
        style={styles.messagesContainer}
        imageStyle={styles.backgroundImage}
      >
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          style={styles.scrollView}
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} isUser={message.isUser} />
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask Ace anything"
            placeholderTextColor="#333"
            onSubmitEditing={handleSend}
            multiline={true}
          />
          <TouchableOpacity style={styles.inputButton} onPress={pickImage}>
            <Ionicons name="image-outline" size={24} color="#01796f" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Ionicons name="paper-plane" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
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
    width: '100%',
  },
  backgroundImage: {
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'flex-start',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
    left: 20
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
    right:20
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
    padding: 10,
    maxWidth: '70%',
  },
  messageImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  userMessageContent: {
    backgroundColor: '#01796f',
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  botMessageContent: {
    backgroundColor: '#F3F4F6',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 1,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 10,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  botMessageText: {
    color: '#1F2937',
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    marginLeft: 4,
    color: '#666',
  },
  feedbackButtons: {
    flexDirection: 'row',
  },
  inputContainer: {
    padding: 10,
    bottom: 10,
    marginTop: 5,

  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 8,
  },
  input: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
    fontSize: 16,
    color: '#333',
  },
  inputButton: {
    padding: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#01796f',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#01796f',
  },
});

export default ChatAI;