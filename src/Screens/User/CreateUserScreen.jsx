import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from 'react-native';
import colors from '../../utils/theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import PopMessage from '../../components/PopMessage';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { getItem } from '../../utils/mmkvStorage';
import { BASE_URL } from '../../api';


const CreateUserScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [role, setRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popMessage, setPopMessage] = useState({
    visible: false,
    text: '',
    type: 'info',
    action: null,
  });
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateEmail = (email) => {
  if (!emailRegex.test(email)) {
    // setPopMessage({
    //   visible: true,
    //   text: 'Please enter a valid email address.',
    //   type: 'error',
    // });
  }
  setEmail(email);
};

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/roles-user/`);
        setRoles(
          response.data.map(role => ({
            label: role.role,
            value: role.id,
          }))
        );
      } catch (error) {
        setPopMessage({
          visible: true,
          text: 'Failed to load roles. Please try again later.',
          type: 'error',
        });
      }
    };
    fetchRoles();
  }, []);

  // Password validation function
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 6 characters, include 1 uppercase letter & 1 special character.');
    } else {
      setPasswordError('');
    }
    setPassword(password);
  };

  // Submit user creation form
  const handleSubmit = async () => {
    if (!username || !email || !password || !role) {
      setPopMessage({
        visible: true,
        text: 'All fields are required.',
        type: 'error',
      });
      return;
    }

    if (passwordError) {
      setPopMessage({
        visible: true,
        text: 'Please enter a strong password.',
        type: 'error',
      });
      return;
    }

    setIsLoading(true);

    try {
      const token = getItem('access_token');
      if (!token) {
        setPopMessage({
          visible: true,
          text: 'Authentication token is missing. Please log in again.',
          type: 'error',
        });
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/api/users/`,
        { username, password, email, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setPopMessage({
          visible: true,
          text: 'User created successfully!',
          type: 'success',
          action: () => navigation.goBack(),
        });
      } else {
        setPopMessage({
          visible: true,
          text: 'Failed to create user. Please try again.',
          type: 'error',
        });
      }
    } catch (error) {
      setPopMessage({
        visible: true,
        text: error.response?.data?.message || 'An unexpected error occurred.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'textInput':
        return (
          <View style={styles.formItem}>
            <Text style={styles.label}>{item.label}</Text>
            <TextInput
              style={[styles.input, item.hasError ? styles.inputError : {}]}
              placeholder={item.placeholder}
              placeholderTextColor="#A1A1A1"
              value={item.value}
              onChangeText={item.onChangeText}
              secureTextEntry={item.secureTextEntry}
            />
            {item.error && <Text style={styles.errorText}>{item.error}</Text>}
          </View>
        );
      case 'dropdown':
        return (
          <View style={styles.formItem}>
            <Text style={styles.label}>{item.label}</Text>
            <Dropdown
              data={roles}
              labelField="label"
              valueField="value"
              placeholder="Select Role"
              value={role}
              onChange={item => setRole(item.value)}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderText}
              selectedTextStyle={styles.selectedText}
              containerStyle={styles.dropdownContainer}
            />
          </View>
        );
      default:
        return null;
    }
  };

  const formItems = [
    { type: 'textInput', label: 'Username', placeholder: 'Enter username', value: username, onChangeText: setUsername },
    { type: 'textInput', label: 'Email', placeholder: 'Enter email', value: email, onChangeText: validateEmail },
    { type: 'textInput', label: 'Password', placeholder: 'Enter password', secureTextEntry: true, value: password, onChangeText: validatePassword, error: passwordError, hasError: passwordError !== '' },
    { type: 'dropdown', label: 'Role' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <PopMessage
        visible={popMessage.visible}
        text={popMessage.text}
        type={popMessage.type}
        onClose={() => {
          setPopMessage({ ...popMessage, visible: false });
          if (popMessage.action) popMessage.action();
        }}
      />

      {/* Header */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Create User</Text>
      </View>

      {/* Form Fields */}
      <FlatList
        data={formItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.formContainer}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isLoading}>
        {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.submitButtonText}>Create User</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateUserScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#3b5998',
    elevation: 5,
  },
  appBarTitle: { fontSize: 20, fontWeight: '600', color: '#fff', marginLeft: 16 },
  formContainer: { padding: 16 },
  formItem: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '500', color: '#333', marginBottom: 8 },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    elevation: 2,
    color:'black'
  },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 12, marginTop: 4 },
  dropdown: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    elevation: 2,
  },
  submitButton: {
    backgroundColor: '#3b5998',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
    elevation: 3,
  },
  submitButtonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
});