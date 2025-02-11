import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Pressable, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import colors from '../../utils/theme/colors';
import { getItem } from '../../utils/mmkvStorage'; // MMKV storage utility
import Icon from 'react-native-vector-icons/Ionicons'; 
import NoTicket from '../../assets/icons/svgs/noTicket';

const BASE_URL = 'http://50.17.52.102/api/tickets/closed/'; // API Endpoint

const History = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch closed tickets from API
  const fetchClosedTickets = async () => {
    setLoading(true);
    try {
      const token = getItem('access_token'); // Get admin token from MMKV
      const role = getItem('user_role');

      if (!token || role !== 'Admin') {
        Alert.alert('Error', 'Unauthorized access. Admin role required.');
        return;
      }

      const response = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setTickets(response.data);
        console.log(response.data, "response");
      } else {
        Alert.alert('Error', 'Failed to fetch closed tickets.');
      }
    } catch (error) {
      console.error('Error fetching closed tickets:', error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClosedTickets();
  }, []);

  // Handle ticket press
  const handleTicketPress = (item) => {
    console.log('Ticket Pressed:', item);
    // Navigate to ticket details if needed
  };

  // Render each closed ticket item
  const renderClosedTicketItem = ({ item }) => (
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
        <View style={[styles.statusBadge, styles.statusClosed]}>
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
        <View style={styles.detailRow}>
          <Icon name="person-circle-outline" size={16} color={colors.textLight} />
          <Text style={styles.detailText}>Closed by: {item.closed_by || 'N/A'}</Text>
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

  const renderNoTickets = () => (
    <View style={{ width: '100%', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <NoTicket width={150} height={150} />
      <Text style={styles.noTicketsText}>No Closed Tickets</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Closed Tickets</Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
      ) : tickets.length > 0 ? (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderClosedTicketItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        renderNoTickets()
      )}
    </SafeAreaView>
  );
};

export default History;

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
    marginTop: 4,
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
  statusClosed: {
    backgroundColor: colors.success, // Green for Closed status
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