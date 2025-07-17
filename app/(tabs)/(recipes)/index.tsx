import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Clock, Heart } from 'lucide-react-native';
import { router } from 'expo-router';

const recipes = [
  {
    id: '1',
    title: 'Grießschmarren mit Ribisel',
    author: 'narrischguat',
    cookingTime: '1 Stunde 3 Min.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasPromotion: true,
  },
  {
    id: '2',
    title: 'Mimosa Eier',
    author: 'MPREIS',
    cookingTime: '19 Minuten',
    image: 'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasPromotion: false,
  },
  {
    id: '3',
    title: 'Kartoffelgratin',
    author: 'MPREIS',
    cookingTime: '20 Minuten',
    image: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasPromotion: false,
  },
  {
    id: '4',
    title: 'Spinat Lasagne',
    author: 'MPREIS',
    cookingTime: '15 Minuten',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasPromotion: false,
  },
  {
    id: '5',
    title: 'Tiroler Gröstl',
    author: 'MPREIS',
    cookingTime: '25 Minuten',
    image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasPromotion: true,
  },
  {
    id: '6',
    title: 'Apfelstrudel',
    author: 'narrischguat',
    cookingTime: '45 Minuten',
    image: 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg?auto=compress&cs=tinysrgb&w=400',
    hasPromotion: false,
  },
];

export default function RecipesScreen() {
  const handleRecipePress = (recipeId: string) => {
    router.push(`/(tabs)/(recipes)/${recipeId}`);
  };

  const renderRecipeCard = (recipe: typeof recipes[0]) => (
    <TouchableOpacity
      key={recipe.id}
      style={styles.recipeCard}
      onPress={() => handleRecipePress(recipe.id)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <View style={styles.timeContainer}>
          <Clock size={12} color="#666" />
          <Text style={styles.timeText}>{recipe.cookingTime}</Text>
        </View>
        <TouchableOpacity style={styles.heartButton}>
          <Heart size={20} color="#666" />
        </TouchableOpacity>
        {recipe.hasPromotion && (
          <View style={styles.promotionBadge}>
            <Text style={styles.promotionText}>% Aktion</Text>
          </View>
        )}
      </View>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        <View style={styles.authorContainer}>
          <View style={styles.authorAvatar} />
          <View>
            <Text style={styles.authorLabel}>Rezepte von</Text>
            <Text style={styles.authorName}>{recipe.author}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>M</Text>
            </View>
            <View>
              <Text style={styles.marketText}>Meinen Markt wählen</Text>
              <Text style={styles.availabilityText}>Für Verfügbarkeiten & Aktionen</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <View style={styles.iconButton}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </View>
            <View style={styles.iconButton}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>✓</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.pageTitle}>Rezepte</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Favorites Section */}
        <TouchableOpacity style={styles.favoritesSection}>
          <View style={styles.favoritesContent}>
            <Heart size={20} color="#4CAF50" fill="#4CAF50" />
            <Text style={styles.favoritesText}>Meine Lieblingsrezepte</Text>
            <View style={styles.favoriteBadge}>
              <Text style={styles.favoriteBadgeText}>1</Text>
            </View>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Recipe Grid */}
        <View style={styles.recipeGrid}>
          {recipes.map(renderRecipeCard)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: '#D32F2F',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  marketText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  availabilityText: {
    fontSize: 12,
    color: '#666',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  favoritesSection: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favoritesContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoritesText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 12,
  },
  favoriteBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  favoriteBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  chevron: {
    fontSize: 20,
    color: '#666',
  },
  recipeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 100,
  },
  recipeCard: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 140,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  timeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 4,
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promotionBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  promotionText: {
    color: '#D32F2F',
    fontSize: 10,
    fontWeight: 'bold',
  },
  recipeInfo: {
    padding: 12,
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 24,
    height: 24,
    backgroundColor: '#ddd',
    borderRadius: 12,
    marginRight: 8,
  },
  authorLabel: {
    fontSize: 10,
    color: '#666',
  },
  authorName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
});