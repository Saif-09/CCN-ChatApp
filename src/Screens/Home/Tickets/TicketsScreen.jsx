import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Pressable, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../utils/theme/colors';
import { getItem } from '../../../utils/mmkvStorage'; // MMKV storage utility
import Icon from 'react-native-vector-icons/Ionicons';
import NoTicket from '../../../assets/icons/svgs/noTicket';

const BASE_URL = 'http://50.17.52.102/api/tickets/';

const TicketsScreen = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Initialize navigation

  // Fetch tickets from API
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const token = getItem('access_token'); // Get stored token from MMKV
      const role = getItem('user_role'); // Get user role (Admin or Sales)

      if (!token || !role) {
        Alert.alert('Error', 'Authentication required. Please login again.');
        return;
      }

      // Determine correct endpoint based on user role
      const endpoint = role === 'Admin' ? '/api/tickets/' : '/api/tickets/assigned/';

      const response = await axios.get(`http://50.17.52.102${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setTickets(response.data);
      } else {
        Alert.alert('Error', 'Failed to fetch tickets.');
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Handle ticket press (Navigate to ChatScreen)
  const handleTicketPress = (item) => {
    navigation.navigate('Chat', {
      userId: item.student_id, // Pass student ID
      chatId: item.id, // Pass ticket ID as Chat ID
      ticketQuery: item.description, // Pass ticket query
    });
  };

  // Render each ticket item
  const renderTicketItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.ticketItem,
        pressed && styles.ticketItemPressed,
      ]}
      onPress={() => handleTicketPress(item)}
    >
      {/* Ticket Header */}
      <View style={styles.ticketHeader}>
        <Text style={styles.ticketTitle}>{item.description}</Text>
        <View style={[styles.statusBadge, styles[`status${item.status.replace(/\s/g, '')}`]]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      {/* Ticket Details */}
      <View style={styles.ticketDetails}>
        <View style={styles.detailRow}>
          <Icon name="person-outline" size={16} color={colors.textLight} />
          <Text style={styles.detailText}>Student ID: {item.student_id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="calendar-outline" size={16} color={colors.textLight} />
          <Text style={styles.detailText}>{new Date(item.created_at).toLocaleDateString()}</Text>
        </View>
        {item.answer && (
          <View style={styles.detailRow}>
            <Icon name="chatbox-ellipses-outline" size={16} color={colors.textLight} />
            <Text style={styles.detailText}>Answer: {item.answer}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Tickets</Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
      ) : tickets.length > 0 ? (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTicketItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <NoTicket width={150} height={150} />
          <Text style={styles.noTicketsText}>No Tickets Available</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TicketsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  ticketItem: {
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ticketItemPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondary,
  },
  statusassigned: {
    backgroundColor: colors.warning,
  },
  statusclosed: {
    backgroundColor: colors.success,
  },
  ticketDetails: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  noTicketsText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.textLight,
    marginTop: 16,
  },
});