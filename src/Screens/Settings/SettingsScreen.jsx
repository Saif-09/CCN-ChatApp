// SettingsScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import colors from '../../utils/theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingsScreen = () => {
  const isAdmin = true; // Set this dynamically based on user role

  const handleEditProfile = () => {
    console.log('Edit Profile');
    // Add logic to navigate to the Edit Profile screen
  };

  const handleChangePassword = () => {
    console.log('Change Password');
    // Add logic to navigate to the Change Password screen
  };

  const handleThemeSelection = () => {
    console.log('Theme Selection');
    // Add logic to navigate to the Theme Selection screen
  };

  const handlePrivacySettings = () => {
    console.log('Privacy Settings');
    // Add logic to navigate to the Privacy Settings screen
  };

  const handleHelpCenter = () => {
    console.log('Help Center');
    // Add logic to navigate to the Help Center screen
  };

  const handleCreateNewUser = () => {
    console.log('Create New User');
    // Add logic to navigate to the Create New User screen
  };

  const handleManageUsers = () => {
    console.log('Manage Users');
    // Add logic to navigate to the Manage Users screen
  };

  const handleLogout = () => {
    console.log('Logout');
    // Add logic to logout the user
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {/* Title */}
        <Text style={styles.title}>Settings</Text>

        {/* Account Management */}
        <Text style={styles.sectionHeader}>Account</Text>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <View style={styles.buttonContent}>
            <Icon name="person-outline" size={20} color={colors.primary} />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </View>
          <Icon name="chevron-forward" size={20} color={colors.textLight} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <View style={styles.buttonContent}>
            <Icon name="lock-closed-outline" size={20} color={colors.primary} />
            <Text style={styles.buttonText}>Change Password</Text>
          </View>
          <Icon name="chevron-forward" size={20} color={colors.textLight} />
        </TouchableOpacity>


        {/* User Management (Admin Only) */}
        {isAdmin && (
          <>
            <Text style={styles.sectionHeader}>User Management</Text>
            <TouchableOpacity style={styles.button} onPress={handleCreateNewUser}>
              <View style={styles.buttonContent}>
                <Icon name="person-add-outline" size={20} color={colors.primary} />
                <Text style={styles.buttonText}>Create New User</Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleManageUsers}>
              <View style={styles.buttonContent}>
                <Icon name="people-outline" size={20} color={colors.primary} />
                <Text style={styles.buttonText}>Manage Users</Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>
          </>
        )}

        {/* Help and Support */}
        <Text style={styles.sectionHeader}>Support</Text>
        <TouchableOpacity style={styles.button} onPress={handleHelpCenter}>
          <View style={styles.buttonContent}>
            <Icon name="help-circle-outline" size={20} color={colors.primary} />
            <Text style={styles.buttonText}>Help Center</Text>
          </View>
          <Icon name="chevron-forward" size={20} color={colors.textLight} />
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Button (Fixed at Bottom) */}
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: '500', // semibold
    color: colors.primary,
    marginBottom: 30,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600', // semibold
    color: colors.text,
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600', // semibold
    color: colors.text,
    marginLeft: 10,
  },
  logoutButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logoutButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: colors.error,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600', // semibold
    color: colors.secondary,
  },
});