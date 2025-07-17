import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  SafeAreaView 
} from 'react-native';
import { ArrowLeft, Heart, Clock, Users } from 'lucide-react-native';
import { useLocalSearchParams, router } from 'expo-router';

const recipeData = {
  '1': {
    title: 'Grießschmarren mit Ribisel',
    author: 'narrischguat',
    cookingTime: '1 Stunde 3 Min.',
    servings: '4 Personen',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Ein traditionelles österreichisches Dessert mit süßem Grieß und frischen Ribiseln. Perfekt für gemütliche Nachmittage.',
    ingredients: [
      '500ml Milch',
      '100g Grieß',
      '3 Eier',
      '50g Zucker',
      '200g Ribiseln',
      '2 EL Butter',
      'Prise Salz'
    ],
    instructions: [
      'Milch in einem Topf erhitzen und Grieß einrühren.',
      'Bei mittlerer Hitze unter ständigem Rühren kochen lassen.',
      'Eier trennen und Eigelb mit Zucker verrühren.',
      'Eiweiß zu steifem Schnee schlagen.',
      'Grießbrei vom Herd nehmen und Eigelb unterrühren.',
      'Eischnee vorsichtig unterheben.',
      'In der Pfanne goldbraun backen und zerreißen.',
      'Mit Ribiseln servieren.'
    ]
  },
  '2': {
    title: 'Mimosa Eier',
    author: 'MPREIS',
    cookingTime: '19 Minuten',
    servings: '2 Personen',
    image: 'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Elegante Vorspeise mit gekochten Eiern und cremiger Füllung.',
    ingredients: [
      '6 Eier',
      '3 EL Mayonnaise',
      '1 TL Senf',
      'Schnittlauch',
      'Salz, Pfeffer'
    ],
    instructions: [
      'Eier hart kochen und abkühlen lassen.',
      'Eier halbieren und Eigelb herausnehmen.',
      'Eigelb mit Mayonnaise und Senf verrühren.',
      'Mit Salz und Pfeffer würzen.',
      'Eiweißhälften füllen und garnieren.'
    ]
  },
  '3': {
    title: 'Kartoffelgratin',
    author: 'MPREIS',
    cookingTime: '20 Minuten',
    servings: '3 Personen',
    image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Cremiges Kartoffelgratin mit Käse überbacken.',
    ingredients: [
      '1kg Kartoffeln',
      '200ml Sahne',
      '100g Käse',
      'Salz, Pfeffer',
      'Muskatnuss'
    ],
    instructions: [
      'Kartoffeln schälen und in Scheiben schneiden.',
      'In einer Form schichten.',
      'Mit Sahne übergießen.',
      'Käse darüber streuen.',
      'Im Ofen backen bis goldbraun.'
    ]
  },
  '4': {
    title: 'Spinat Lasagne',
    author: 'MPREIS',
    cookingTime: '15 Minuten',
    servings: '4 Personen',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Vegetarische Lasagne mit frischem Spinat.',
    ingredients: [
      'Lasagneplatten',
      '500g Spinat',
      'Béchamelsauce',
      'Mozzarella',
      'Parmesan'
    ],
    instructions: [
      'Spinat waschen und blanchieren.',
      'Lasagneplatten kochen.',
      'Schichtweise aufbauen.',
      'Mit Käse bestreuen.',
      'Im Ofen überbacken.'
    ]
  },
  '5': {
    title: 'Tiroler Gröstl',
    author: 'MPREIS',
    cookingTime: '25 Minuten',
    servings: '2 Personen',
    image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Traditionelles Tiroler Gericht mit Kartoffeln und Speck.',
    ingredients: [
      '500g Kartoffeln',
      '200g Speck',
      '1 Zwiebel',
      'Eier',
      'Kümmel'
    ],
    instructions: [
      'Kartoffeln kochen und würfeln.',
      'Speck anbraten.',
      'Zwiebel dazugeben.',
      'Kartoffeln hinzufügen.',
      'Mit Ei servieren.'
    ]
  },
  '6': {
    title: 'Apfelstrudel',
    author: 'narrischguat',
    cookingTime: '45 Minuten',
    servings: '6 Personen',
    image: 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Klassischer österreichischer Apfelstrudel mit dünnem Teig.',
    ingredients: [
      'Strudelteig',
      '1kg Äpfel',
      'Zimt',
      'Zucker',
      'Rosinen'
    ],
    instructions: [
      'Äpfel schälen und schneiden.',
      'Mit Zimt und Zucker mischen.',
      'Teig ausrollen.',
      'Füllung auftragen.',
      'Einrollen und backen.'
    ]
  },
};

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const recipe = recipeData[id as string];

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Recipe not found</Text>
      </SafeAreaView>
    );
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.image }} style={styles.headerImage} />
          
          {/* Overlay Controls */}
          <View style={styles.imageOverlay}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <ArrowLeft size={24} color="#333" />
            </TouchableOpacity>
            
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{recipe.cookingTime}</Text>
            </View>
            
            <TouchableOpacity style={styles.heartButton}>
              <Heart size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>{recipe.title}</Text>
          
          {/* Recipe Info */}
          <View style={styles.recipeInfo}>
            <View style={styles.infoItem}>
              <Clock size={16} color="#666" />
              <Text style={styles.infoText}>{recipe.cookingTime}</Text>
            </View>
            <View style={styles.infoItem}>
              <Users size={16} color="#666" />
              <Text style={styles.infoText}>{recipe.servings}</Text>
            </View>
          </View>

          {/* Author */}
          <View style={styles.authorContainer}>
            <View style={styles.authorAvatar} />
            <View>
              <Text style={styles.authorLabel}>Rezept von</Text>
              <Text style={styles.authorName}>{recipe.author}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{recipe.description}</Text>

          {/* Ingredients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Zutaten</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>

          {/* Instructions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Zubereitung</Text>
            {recipe.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeContainer: {
    position: 'absolute',
    top: 50,
    left: '50%',
    transform: [{ translateX: -30 }],
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  heartButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    lineHeight: 34,
  },
  recipeInfo: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 20,
    marginRight: 12,
  },
  authorLabel: {
    fontSize: 12,
    color: '#666',
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    backgroundColor: '#D32F2F',
    borderRadius: 3,
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  stepNumber: {
    backgroundColor: '#D32F2F',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
});