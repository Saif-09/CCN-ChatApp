import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getItem } from '../../utils/mmkvStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/theme/colors';
import { BASE_URL } from '../../api';

const ChatScreen = ({ route }) => {
  const { userId, chatId, ticketQuery } = route.params;
  const navigation = useNavigation();

  const [comment, setComment] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isResolved, setIsResolved] = useState(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/students/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
      } else {
        Alert.alert('Error', 'Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      Alert.alert('Error', 'An error occurred while fetching user details.');
    } finally {
      setLoading(false);
    }
  };

  const updateTicketAnswer = async () => {
    if (!comment.trim()) {
      Alert.alert('Error', 'Please enter an answer before submitting.');
      return;
    }

    try {
      const token = getItem('access_token');
      if (!token) {
        Alert.alert('Error', 'Authentication token is missing. Please log in again.');
        return;
      }

      const payload = { answer: comment.trim() };

      const response = await fetch(
        `${BASE_URL}/api/tickets/update-view-ticket/${chatId}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        Alert.alert('Success', 'Ticket marked as resolved.');
        setIsResolved(true);
      } else {
        Alert.alert('Error', 'Failed to update the ticket.');
      }
    } catch (error) {
      console.error('Error updating ticket answer:', error);
      Alert.alert('Error', 'An error occurred while updating the ticket.');
    }
  };

  const closeTicket = async () => {
    try {
      const token = getItem('access_token');
      if (!token) {
        Alert.alert('Error', 'Authentication token is missing. Please log in again.');
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/close-ticket/${chatId}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        Alert.alert('Success', 'Ticket closed successfully.');
        navigation.navigate('Tickets', { closedTicketId: chatId });
      } else {
        Alert.alert('Error', 'Failed to close the ticket.');
      }
    } catch (error) {
      console.error('Error closing the ticket:', error);
      Alert.alert('Error', 'An error occurred while closing the ticket.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerText}>{ticketQuery.substring(0, 20)}...</Text>
              {isResolved && (
                <TouchableOpacity style={styles.closeTicketButton} onPress={closeTicket}>
                  <Text style={styles.closeTicketButtonText}>Close Ticket</Text>
                </TouchableOpacity>
              )}
            </View>

            <ScrollView style={styles.content}>
              {/* User Details (Accordion Style) */}
              <TouchableOpacity onPress={() => setIsDetailsExpanded(!isDetailsExpanded)}>
                <View style={styles.accordionHeader}>
                  <Text style={styles.accordionHeaderText}>User Details</Text>
                  <Ionicons
                    name={isDetailsExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={colors.text}
                  />
                </View>
              </TouchableOpacity>

              {isDetailsExpanded && (
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>Name: {userDetails?.name || 'N/A'}</Text>
                  <Text style={styles.detailsText}>Email: {userDetails?.email || 'N/A'}</Text>
                  <Text style={styles.detailsText}>Mobile: {userDetails?.mobile_no || 'N/A'}</Text>
                  <Text style={styles.detailsText}>Position: {userDetails?.working_position || 'N/A'}</Text>
                  <Text style={styles.detailsText}>Verified: {userDetails?.is_verified ? 'Yes' : 'No'}</Text>
                </View>
              )}

              {/* User's Query */}
              <View style={styles.queryContainer}>
                <Text style={styles.queryLabel}>User's Query:</Text>
                <Text style={styles.queryText}>{ticketQuery}</Text>
              </View>
            </ScrollView>

            {/* Answer Chatbox */}
            {!isResolved && (
              <View style={styles.footer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Write your answer..."
                  value={comment}
                  placeholderTextColor={'gray'}
                  onChangeText={setComment}
                />
                <TouchableOpacity style={styles.resolveButton} onPress={updateTicketAnswer}>
                  <Text style={styles.resolveButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
  },
  headerText: { fontSize: 16, fontWeight: 'bold', color: 'white' },
  closeTicketButton: { backgroundColor: 'red', padding: 8, borderRadius: 5 },
  closeTicketButtonText: { color: 'white', fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 8,
  },
  accordionHeaderText: { fontSize: 16, fontWeight: 'bold' },
  detailsContainer: { padding: 12, backgroundColor: 'white', borderRadius: 8, marginTop: 8 },
  detailsText: { fontSize: 14, marginBottom: 4 },
  queryContainer: { padding: 16, backgroundColor: '#FFF3CD', borderRadius: 8, marginTop: 16 },
  queryLabel: { fontWeight: 'bold', fontSize: 16 },
  queryText: { fontSize: 16 },
  footer: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'white' },
  commentInput: { flex: 1, padding: 10, borderWidth: 1, borderRadius: 8, borderColor: colors.border , color:'black'},
  resolveButton: { marginLeft: 10, backgroundColor: colors.success, padding: 10, borderRadius: 8 },
  resolveButtonText: { color: 'white', fontWeight: 'bold' },
});