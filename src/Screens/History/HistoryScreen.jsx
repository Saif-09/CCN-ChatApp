// History.js
import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Pressable } from 'react-native';
import colors from '../../utils/theme/colors';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import { isIOS } from '../../utils/theme/responsiveTheme';
import NoTicket from '../../assets/icons/svgs/noTicket';

// Mock data for closed tickets
const mockClosedTickets = [
  {
    id: '1',
    studentName: 'Alice Johnson',
    course: 'CCN301 - CCN Certification Prep',
    query: 'I need clarification on the final project requirements.',
    status: 'Closed',
    date: '2023-10-03',
  },
  {
    id: '2',
    studentName: 'Bob Brown',
    course: 'CCN101 - Introduction to CCN',
    query: 'The quiz questions seem incorrect.',
    status: 'Closed',
    date: '2023-10-04',
  },
  {
    id: '3',
    studentName: 'Charlie Davis',
    course: 'CCN201 - Advanced CCN Concepts',
    query: 'The assignment deadline was too short.',
    status: 'Closed',
    date: '2023-10-05',
  },
];

const History = () => {
  // Handle ticket press event
  const handleTicketPress = (item) => {
    // Implement your logic here
    console.log('Ticket pressed:', item);
  };

  // Render each closed ticket item
  const renderClosedTicketItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.ticketItem,
        pressed && styles.ticketItemPressed, // Add visual feedback when pressed
      ]}
      onPress={() => handleTicketPress(item)}
    >
      {/* Ticket Header */}
      <View style={styles.ticketHeader}>
        <Text style={styles.ticketTitle}>{item.query}</Text>
        <View style={[styles.statusBadge, styles[`status${item.status.replace(/\s/g, '')}`]]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      {/* Ticket Details */}
      <View style={styles.ticketDetails}>
        <View style={styles.detailRow}>
          <Icon name="person-outline" size={16} color={colors.textLight} />
          <Text style={styles.detailText}>{item.studentName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="book-outline" size={16} color={colors.textLight} />
          <Text style={styles.detailText}>{item.course}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="calendar-outline" size={16} color={colors.textLight} />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
      </View>
    </Pressable>
  );

  const renderNoTickets = () => (
    <View style={{ width: '100%', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <NoTicket width={150} height={150} />
      <Text style={styles.noTicketsText}>No Tickets Available</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>History</Text>
      {mockClosedTickets.length > 0 ? (<FlatList
        data={mockClosedTickets}
        keyExtractor={(item) => item.id}
        renderItem={renderClosedTicketItem}
        contentContainerStyle={styles.listContainer}
      />) : renderNoTickets()}
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
    marginBottom: 40,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
    paddingHorizontal: isIOS ? 16 : 0,
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
    elevation: 3, // For Android
  },
  ticketItemPressed: {
    opacity: 0.8, // Visual feedback when pressed
    transform: [{ scale: 0.98 }], // Slightly shrink when pressed
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '600', // semibold
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
    fontWeight: '600', // semibold
    color: colors.secondary, // Changed to white for better visibility
  },
  statusClosed: {
    backgroundColor: colors.success, // Green for Closed status
  },
  statusOpen: {
    backgroundColor: colors.error, // Red for Open status
  },
  statusInProgress: {
    backgroundColor: colors.warning, // Gold for In Progress status
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