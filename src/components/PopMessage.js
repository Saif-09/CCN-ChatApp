import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PopMessage = ({text, type, visible, onClose}) => {
  const backgroundColor =
    type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#607D8B'; // Material colors
  const iconName = type === 'success' ? 'checkmark-circle' : 'alert-circle';

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <View style={styles.iconContainer}>
            <Icon name={iconName} size={30} color={backgroundColor} />
          </View>
          <Text style={styles.messageText}>{text}</Text>
          <TouchableOpacity
            style={[styles.closeButton, {backgroundColor}]}
            onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
  },
  popupContainer: {
    width: '70%', // Compact size
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slightly opaque white
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333', // Neutral text color
    textAlign: 'center',
    marginBottom: 15,
  },
  closeButton: {
    width: '60%', // Adaptive width
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PopMessage;
