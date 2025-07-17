import { View, Text, StyleSheet } from 'react-native';

export default function CouponsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gutscheine</Text>
      <Text style={styles.subtitle}>Hier finden Sie Ihre Gutscheine</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});