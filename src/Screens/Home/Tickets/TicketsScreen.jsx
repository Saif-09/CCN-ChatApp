// TicketsScreen.js
import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Pressable } from 'react-native';
import colors from '../../../utils/theme/colors';
import { isAndroid } from '../../../utils/theme/responsiveTheme';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import NoTicket from '../../../assets/icons/svgs/noTicket';

// Mock data for open tickets
const mockOpenTickets = [
  {
    id: '1',
    studentName: 'John Doe',
    course: 'CCN101 - Introduction to CCN',
    query: 'I am unable to access the course materials.',
    status: 'Open',
    date: '2023-10-01',
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    course: 'CCN201 - Advanced CCN Concepts',
    query: 'The video lectures are not loading properly.',
    status: 'In Progress',
    date: '2023-10-02',
  },
];

const TicketsScreen = () => {
  // Handle ticket press
  const handleTicketPress = (item) => {
    console.log('Ticket Pressed:', item);
    // Add logic to navigate to the ticket details screen
  };

  // Render each open ticket item
  const renderTicketItem = ({ item }) => (
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
      <Text style={styles.header}>Open Tickets</Text>
      {mockOpenTickets.length > 0 ? (
        <FlatList
          data={mockOpenTickets}
          keyExtractor={(item) => item.id}
          renderItem={renderTicketItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        renderNoTickets()
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
    fontWeight: '500', // semibold
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
    paddingHorizontal: isAndroid ? 0 : 16,
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
    color: colors.secondary,
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