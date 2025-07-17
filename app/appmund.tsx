import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { X, Mic, ArrowUp } from 'lucide-react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const suggestionChips = [
  'Make vegan',
  'Add more protein',
  'Only re...',
  'Reduce Carbon footprint',
  'Lower calories',
];

export default function AppmundScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello, I\'m Appmund, your cooking companion. How do you want to adapt this recipe?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleBack = () => {
    router.back();
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I understand you want to adjust the recipe. Let me help you with that modification. Would you like to create a new recipe based on this?',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSuggestionPress = (suggestion: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: suggestion,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand you want to "${suggestion.toLowerCase()}". Let me help you with that modification to the recipe. Would you like to create a new recipe based on this?`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleVoiceInput = async () => {
    if (Platform.OS === 'web') {
      // Web Speech API implementation
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'de-DE'; // German language
        
        recognition.onstart = () => {
          setIsListening(true);
        };
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          setIsListening(false);
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          Alert.alert('Fehler', 'Spracherkennung fehlgeschlagen. Bitte versuchen Sie es erneut.');
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.start();
      } else {
        Alert.alert('Nicht unterstützt', 'Spracherkennung wird in diesem Browser nicht unterstützt.');
      }
    } else {
      // For mobile platforms, we'll simulate voice input for now
      // In a real app, you would use expo-speech or react-native-voice
      setIsListening(true);
      
      // Simulate voice recognition delay
      setTimeout(() => {
        setIsListening(false);
        // Simulate recognized text
        const simulatedVoiceInputs = [
          'Mache es vegan',
          'Füge mehr Protein hinzu',
          'Reduziere die Kalorien',
          'Mache es glutenfrei',
          'Verwende weniger Salz'
        ];
        const randomInput = simulatedVoiceInputs[Math.floor(Math.random() * simulatedVoiceInputs.length)];
        setInputText(randomInput);
      }, 2000);
    }
  };

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleCreateRecipe = (messageId: string) => {
    // Navigate back to recipe screen with success state
    router.back();
    // Pass success state via router params
    setTimeout(() => {
      router.setParams({ showSuccess: 'true' });
    }, 100);
  };

  const renderMessage = (message: Message) => (
    <View key={message.id}>
      <View
        style={[
          styles.messageContainer,
          message.isUser ? styles.userMessage : styles.botMessage,
        ]}
      >
        {!message.isUser && (
          <View style={styles.botAvatarContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=60' }}
              style={styles.botAvatar}
            />
          </View>
        )}
        <View
          style={[
            styles.messageBubble,
            message.isUser ? styles.userBubble : styles.botBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              message.isUser ? styles.userText : styles.botText,
            ]}
          >
            {message.text}
          </Text>
        </View>
      </View>
      
      {/* Confirmation button for bot messages */}
      {!message.isUser && message.id !== '1' && (
        <View style={styles.confirmationContainer}>
          <TouchableOpacity
            style={styles.confirmationButton}
            onPress={() => handleCreateRecipe(message.id)}
          >
            <Text style={styles.confirmationButtonText}>Yes!</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <LinearGradient
      colors={['#4a4a4a', '#8B0000', '#D32F2F']}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
              <X size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Chat mit Appmund</Text>
            <View style={styles.headerAvatar}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=60' }}
                style={styles.headerAvatarImage}
              />
            </View>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Recipe Image */}
            <View style={styles.recipeImageContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800' }}
                style={styles.recipeImage}
              />
            </View>

            {/* Messages */}
            <View style={styles.messagesContainer}>
              {messages.map(renderMessage)}
            </View>
          </ScrollView>

          {/* Suggestion Chips */}
          <View style={styles.suggestionsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.suggestionsContent}
            >
              {suggestionChips.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionChip}
                  onPress={() => handleSuggestionPress(suggestion)}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Input Area */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPrefix}>+</Text>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Frag mich etwas..."
                placeholderTextColor="#999"
                multiline
                maxLength={500}
                onSubmitEditing={handleSendMessage}
                blurOnSubmit={false}
              />
              <TouchableOpacity 
                style={[styles.micButton, isListening && styles.micButtonActive]} 
                onPress={handleVoiceInput}
                disabled={isListening}
              >
                <Mic size={20} color={isListening ? '#CD853F' : '#999'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  inputText.trim() ? styles.sendButtonActive : styles.sendButtonInactive,
                ]}
                onPress={handleSendMessage}
                disabled={!inputText.trim()}
              >
                <ArrowUp
                  size={20}
                  color={inputText.trim() ? '#fff' : '#999'}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.disclaimer}>
              Appmund lernt noch – Antworten können Fehler enthalten.
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 60,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  headerAvatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  recipeImageContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 40,
  },
  recipeImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  messagesContainer: {
    paddingHorizontal: 20,
  },
  messageContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  botAvatarContainer: {
    marginRight: 8,
    marginBottom: 4,
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#fff',
  },
  suggestionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  suggestionsContent: {
    paddingRight: 20,
  },
  suggestionChip: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
    marginBottom: 8,
  },
  inputPrefix: {
    fontSize: 18,
    color: '#999',
    marginRight: 8,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    maxHeight: 100,
    paddingVertical: 8,
  },
  micButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderRadius: 16,
  },
  micButtonActive: {
    backgroundColor: 'rgba(205, 133, 63, 0.2)',
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  sendButtonActive: {
    backgroundColor: '#D32F2F',
  },
  sendButtonInactive: {
    backgroundColor: 'transparent',
  },
  disclaimer: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginTop: 4,
  },
  confirmationContainer: {
    alignItems: 'flex-start',
    paddingLeft: 52, // Align with bot message bubble (avatar width + margin)
    marginTop: 8,
    marginBottom: 8,
  },
  confirmationButton: {
    backgroundColor: '#CD853F',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  confirmationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});