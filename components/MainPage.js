import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RoundTable from '../assets/Round Table.jpg'

const App = () => {
  const navigation = useNavigation(); // Use the navigation hook

  // Sample categories
  const categories = ['All', 'Chair', 'Table', 'Office Desk', 'Dining Set', 'Coffee'];

  // Sample product data
  const products = [
    { id: '1', name: 'Round Table', price: 199, image: 'https://www.furnituresourcephils.com/wp-content/uploads/2023/05/Mardana-Stone-Round-Table-120cm.jpg', discount: null, description: 'A stylish round table perfect for dining or meeting spaces. Its sleek design and spacious surface make it a versatile addition to any home or office. Made with durable materials, it offers a perfect blend of functionality and aesthetic appeal, making it ideal for family gatherings or business meetings.', rating: 4.5, material: 'Wood', category: 'Table' },
    { id: '2', name: 'Dining Chair', price: 149, image: 'https://mandauefoam.ph/cdn/shop/files/107971MacieDiningChair-Camel.png?v=1685337391&width=500', discount: null, description: 'A comfortable dining chair with a modern design. Made with high-quality materials, this chair provides excellent support and comfort for long dining sessions. Its clean, minimalist look pairs well with various dining tables, creating a sleek and stylish dining environment. Perfect for both casual meals and formal occasions.', rating: 4.0, material: 'Plastic', category: 'Chair' },
    { id: '3', name: 'Lounge Chair', price: 249, image: 'https://philux.ph/cdn/shop/files/Rizal_Lounge_Chair_1200x.png?v=1725528362', discount: '25%', description: 'A cozy lounge chair for relaxing in style. The ergonomic design of this chair provides optimal comfort for lounging or reading for hours. Its soft fabric upholstery and sturdy frame ensure durability while adding a touch of elegance to any living room, reading nook, or office space. The perfect chair to unwind and recharge in style.', rating: 4.8, material: 'Fabric', category: 'Chair' },
    { id: '4', name: 'Bookshelf', price: 129, image: 'https://philux.ph/cdn/shop/files/9_d8d799f9-b0ca-4efa-808d-2c36253da3c4_1200x.png?v=1725433254', discount: null, description: 'A spacious bookshelf to organize your books and decor. Crafted from high-quality wood, this bookshelf provides ample space for books, ornaments, and other items, helping you maintain a neat and organized living or office space. Its simple yet elegant design allows it to fit seamlessly into any room, offering both functionality and style.', rating: 4.2, material: 'Wood', category: 'Office Desk' },
    { id: '5', name: 'Cabinet', price: 199, image: 'https://mandauefoam.ph/cdn/shop/products/107682Russo2DoorMidCabinet-EuroOak.png?v=1679292904&width=500', discount: '25%', description: 'A versatile cabinet for storage and organization. This cabinet offers a perfect blend of form and function, with a sleek design that complements modern interiors. It features spacious compartments for storing office supplies, books, or other essentials, keeping your space tidy and organized. Ideal for home offices, living rooms, or bedrooms.', rating: 4.6, material: 'Metal', category: 'Office Desk' },
    { id: '6', name: 'Office Desk', price: 299, image: 'https://store.gentleprince.com/cdn/shop/products/jefferson2_540x.jpg?v=1620114304', discount: null, description: 'A modern office desk for your workspace. Featuring a spacious tabletop and multiple drawers for organization, this desk is designed to enhance productivity while keeping your workspace clutter-free. Its sleek, contemporary design suits any modern office setting, providing a comfortable environment for work, study, or creativity.', rating: 4.3, material: 'Wood', category: 'Office Desk' },
    { id: '7', name: 'Dining Set', price: 499, image: 'https://www.urbanconcepts.ph/wp/wp-content/uploads/2024/03/dallas-1.png', discount: '10%', description: 'A complete dining set for your home. This dining set includes a beautifully crafted table and matching chairs, perfect for family meals or dinner parties. The sturdy construction and elegant design ensure durability and style. Its clean lines and rich finish make it a versatile addition to any dining room, offering both beauty and functionality.', rating: 4.1, material: 'Wood', category: 'Dining Set' },
    { id: '8', name: 'Coffee Table', price: 149, image: 'https://images-na.ssl-images-amazon.com/images/I/81br6SJa9OL.jpg', discount: null, description: 'A stylish coffee table for your living room. With a minimalist design and sleek finish, this coffee table is both functional and fashionable. Its spacious surface provides ample space for drinks, books, or decor, making it the perfect centerpiece for your living room. Durable and easy to maintain, it fits well with various living room styles.', rating: 4.4, material: 'Glass', category: 'Coffee' },
  
    // Added two new products
    { id: '9', name: 'Sofa Set', price: 799, image: 'https://homestyledepot.com.ph/wp-content/uploads/2019/11/Toya-Icons-Katie-L-Shaped-Sofa-Set-600x600.jpg', discount: '15%', description: 'A luxurious sofa set designed for ultimate comfort and style. Perfect for large living rooms or entertainment areas, this set includes a three-seat sofa, two armchairs, and matching throw pillows. Upholstered in soft, durable fabric, it offers an inviting spot to relax with family and friends. Its modern design and neutral colors make it an easy fit for various interior themes.', rating: 4.9, material: 'Fabric', category: 'Living Room' },
    { id: '10', name: 'TV Cabinet', price: 349, image: 'https://dextertonstore.com/5115-large_default/hpmify-hc-a500-tv-cabinet-.jpg', discount: '20%', description: 'A sleek and modern TV cabinet that enhances your living room space. With spacious compartments for your media devices, remote controls, and other essentials, this TV cabinet helps keep your area organized and clutter-free. Its minimalist design and high-quality wood finish make it a stylish addition to any home, providing both functionality and elegance.', rating: 4.7, material: 'Wood', category: 'Living Room' }
  ];
  

  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { product }); // Navigate to ProductDetails with product data
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => handleProductPress(item)}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      {item.discount && <Text style={styles.productDiscount}>{item.discount}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>LuxuraSpace </Text>
       
      </View>

      {/* Categories */}
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.categoryButton, selectedCategory === item && styles.selectedCategoryButton]} 
            onPress={() => setSelectedCategory(item)} // Set selected category on press
          >
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />

     

<ScrollView contentContainerStyle={styles.productList}>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderProduct}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  categoryList: {
    paddingVertical: 10,
  },
  categoryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
    height: 30
  },
  selectedCategoryButton: {
    backgroundColor: '#ff6600', // Color for selected category
  },
  categoryText: {
    fontSize: 14,
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 15,
    borderRadius: 10,
    elevation: 3,
  },
  bannerImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  bannerText: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shopNowButton: {
    backgroundColor: '#ff6600',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  shopNowText: {
    color: '#fff',
    fontSize: 14,
  },
  productList: {
    
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    alignItems: 'center',
    borderColor: 'orange', // Add border color
    borderWidth: 1,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  productDiscount: {
    fontSize: 12,
    color: '#ff0000',
    marginTop: 5,
  },
});

export default App;