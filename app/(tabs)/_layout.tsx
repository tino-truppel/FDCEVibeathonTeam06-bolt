import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Chrome as Home, Ticket, CreditCard, Percent, ChefHat } from 'lucide-react-native';
import { usePathname } from 'expo-router';

export default function TabLayout() {
  const pathname = usePathname();
  const isRecipeDetail = pathname.match(/\/\(recipes\)\/\d+$/);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: isRecipeDetail ? { display: 'none' } : {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          height: 90,
          paddingBottom: 20,
          paddingTop: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="coupons"
        options={{
          title: 'Gutscheine',
          tabBarIcon: ({ color, size }) => (
            <Ticket size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="mpreis-card"
        options={{
          title: 'MPREIS-Karte',
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                backgroundColor: '#d32f2f',
                borderRadius: 25,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -10,
              }}>
              <CreditCard 
                size={size} 
                color="white" 
                strokeWidth={1.5} 
              />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            marginTop: 8,
          },
        }}
      />
      <Tabs.Screen
        name="promotions"
        options={{
          title: 'Aktionen',
          tabBarIcon: ({ color, size }) => (
            <Percent size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="(recipes)"
        options={{
          title: 'Rezepte',
          tabBarIcon: ({ color, size }) => (
            <ChefHat size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
    </Tabs>
  );
}