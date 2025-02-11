import React, {useState, useEffect, useContext} from 'react';
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
import {AuthContext} from '../../context/AuthContext';
import PopMessage from '../../components/PopMessage';
import {Dropdown} from 'react-native-element-dropdown';

const CreateUserScreen = ({navigation}) => {
  const {authState} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popMessage, setPopMessage] = useState({
    visible: false,
    text: '',
    type: 'info',
    action: null, // New property to define an optional action after dismissal
  });

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(
          'http://54.91.37.28/api/roles-user/',
        );
        const data = await response.json();
        console.log('Fetched roles:', data); // Debugging line
        setRoles(
          data.map(role => ({
            label: role.role, // Display name
            value: role.id, // Identifier
          })),
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

  // Submit user creation form
  const handleSubmit = async () => {
    if (!username || !email || !password || !role) {
      setPopMessage({
        visible: true,
        text: 'All fields are required.',
        type: 'error',
        action: null, // No navigation for validation errors
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        'http://54.91.37.28/api/users/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authState.accessToken}`,
          },
          body: JSON.stringify({
            username,
            password,
            email,
            role,
          }),
        },
      );

      if (response.ok) {
        setPopMessage({
          visible: true,
          text: 'User created successfully!',
          type: 'success',
          action: () => navigation.goBack(), // Trigger navigation on success
        });
      } else {
        setPopMessage({
          visible: true,
          text: 'Failed to create user. Please try again.',
          type: 'error',
          action: null, // No redirection
        });
      }
    } catch (error) {
      setPopMessage({
        visible: true,
        text: 'An unexpected error occurred.',
        type: 'error',
        action: null, // No redirection
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({item}) => {
    switch (item.type) {
      case 'textInput':
        return (
          <View style={styles.formItem}>
            <Text style={styles.label}>{item.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={item.placeholder}
              value={item.value}
              onChangeText={item.onChangeText}
              secureTextEntry={item.secureTextEntry}
            />
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
              onChange={item => {
                setRole(item.value);
                console.log('Selected role:', item); // Debugging line
              }}
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
    {
      type: 'textInput',
      label: 'Username',
      placeholder: 'Enter username',
      value: username,
      onChangeText: setUsername,
    },
    {
      type: 'textInput',
      label: 'Email',
      placeholder: 'Enter email',
      value: email,
      onChangeText: setEmail,
    },
    {
      type: 'textInput',
      label: 'Password',
      placeholder: 'Enter password',
      secureTextEntry: true,
      value: password,
      onChangeText: setPassword,
    },
    {
      type: 'dropdown',
      label: 'Role',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <PopMessage
        visible={popMessage.visible}
        text={popMessage.text}
        type={popMessage.type}
        onClose={() => {
          setPopMessage({...popMessage, visible: false});
          if (popMessage.action) {
            popMessage.action(); // Execute the optional action, e.g., navigation
          }
        }}
      />

      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Create User</Text>
      </View>
      <FlatList
        data={formItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.formContainer}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Create User</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.primary,
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 16,
  },
  formContainer: {
    padding: 16,
  },
  formItem: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderColor: colors.textLight,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.secondary,
  },
  dropdown: {
    height: 48,
    borderColor: colors.textLight,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.secondary,
  },
  dropdownContainer: {
    borderRadius: 8,
    backgroundColor: colors.secondary,
  },
  placeholderText: {
    color: colors.textLight,
    fontSize: 16,
  },
  selectedText: {
    color: colors.text,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default CreateUserScreen;
