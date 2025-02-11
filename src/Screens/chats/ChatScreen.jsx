import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import colors from '../../utils/theme/colors';
import {useNavigation} from '@react-navigation/native';

const ChatScreen = ({route}) => {
  const {userId, chatId, ticketQuery} = route.params; // Extract params
  const navigation = useNavigation(); // Initialize navigation

  const [comment, setComment] = useState(''); // Optional comment input
  const [teamName] = useState('Operations Team'); // Static team name for now
  const [userDetails, setUserDetails] = useState(null); // State to hold user details
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `http://50.17.52.102/api/students/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data); // Set user details in state
      } else {
        Alert.alert('Error', 'Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      Alert.alert(
        'Error',
        'An error occurred while fetching user details. Please try again.',
      );
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Handle marking the chat as resolved
  const markAsResolved = async () => {
    try {
      const payload = {
        comment: comment.trim(),
        teamName: teamName,
      };

      const response = await fetch(
        `http://54.91.37.28/api/close-ticket/${chatId}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', data.message); // Display success message

        // Navigate to the Tickets tab in BottomNavigator
        navigation.navigate('Home', {screen: 'Tickets'});
      } else {
        Alert.alert('Error', 'Failed to close the ticket');
      }
    } catch (error) {
      console.error('Error closing the ticket:', error);
      Alert.alert(
        'Error',
        'An error occurred while closing the ticket. Please try again.',
      );
    }
  };

  useEffect(() => {
    fetchUserDetails(); // Fetch user details when the component mounts
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Chat ID */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Ticket Details</Text>
        <Text style={styles.subHeaderText}>Chat ID: {chatId}</Text>
      </View>

      {/* User Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>
          <Text style={styles.detailsLabel}>User ID:</Text> {userId}
        </Text>
        <Text style={styles.detailsText}>
          <Text style={styles.detailsLabel}>Name:</Text>{' '}
          {userDetails?.name || 'N/A'}
        </Text>
        <Text style={styles.detailsText}>
          <Text style={styles.detailsLabel}>Education:</Text>{' '}
          {userDetails?.education_qualification || 'N/A'}
        </Text>
        <Text style={styles.detailsText}>
          <Text style={styles.detailsLabel}>Position:</Text>{' '}
          {userDetails?.working_position || 'N/A'}
        </Text>
        <Text style={styles.detailsText}>
          <Text style={styles.detailsLabel}>Email:</Text>{' '}
          {userDetails?.email || 'N/A'}
        </Text>
        <Text style={styles.detailsText}>
          <Text style={styles.detailsLabel}>Mobile:</Text>{' '}
          {userDetails?.mobile_no || 'N/A'}
        </Text>
        <Text style={styles.detailsText}>
          <Text style={styles.detailsLabel}>Verified:</Text>{' '}
          {userDetails?.is_verified ? 'Yes' : 'No'}
        </Text>
      </View>

      {/* User's Ticket Query */}
      <View style={styles.queryContainer}>
        <Text style={styles.queryLabel}>User's Query:</Text>
        <Text style={styles.queryText}>{ticketQuery}</Text>
      </View>

      {/* Comment Input */}
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment (optional)..."
        value={comment}
        onChangeText={setComment}
      />

      {/* Mark as Resolved Button */}
      <TouchableOpacity style={styles.resolveButton} onPress={markAsResolved}>
        <Text style={styles.resolveButtonText}>Mark as Resolved</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  subHeaderText: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,
  },
  detailsContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.secondary,
    borderRadius: 8,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.text,
  },
  detailsLabel: {
    fontWeight: 'bold',
  },
  queryContainer: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#e4ffe1', // Light green for query section
    borderRadius: 8,
    marginBottom: 16,
  },
  queryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  queryText: {
    fontSize: 16,
    color: colors.text,
  },
  commentInput: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resolveButton: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: colors.success, // Green for resolved button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resolveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
