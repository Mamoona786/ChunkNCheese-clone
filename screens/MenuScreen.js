import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, FlatList, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

// Slider images
const images = [
  require("../assets/imageslider1.jpeg"),
  require("../assets/imageslider2.jpeg"),
  require("../assets/imageslider3.jpeg"),
  require("../assets/imageslider4.jpeg"),
];

// Menu Items with Categories
const menuItems = [
  {
    id: 1,
    category: "Burgers",
    name: "Dynamite",
    description: "Crispy fried thigh, crispy lettuce, spicy dynamite sauce, served in a sesame seed bun.",
    price: "Rs. 490.00",
    image: require("../assets/burgers1.jpg"),
  },
  {
    id: 2,
    category: "Burgers",
    name: "Red Dragon",
    description: "Crispy fried chicken, fresh lettuce, tomato, oriental sauce, spicy dynamite sauce, served in a sesame seed bun.",
    price: "Rs. 550.00",
    image: require("../assets/burgers2.jpg"),
  },
  {
    id: 3,
    category: "Burgers",
    name: "Zingler",
    description: "Crispy fried chicken, fresh lettuce, spicy dynamite sauce, served in a sesame seed bun.",
    price: "Rs. 550.00",
    image: require("../assets/burgers3.jpeg"),
  },
  {
    id: 5,
    category: "Deals",
    name: "Cheesy Box",
    description: "1 Large pizza, 1 Family salad, 1 sandwich/platter, 1 Drink 1.5 ltr",
    price: "Rs. 2,890.00",
    image: require("../assets/deals1.jpeg"),
  },
  {
    id: 6,
    category: "Deals",
    name: "Chunky Quad",
    description: "4 Burgers (Chicken or Beef), 1 Family Fries, 1 Drink 1.5 ltr",
    price: "Rs. 2,390.00",
    image: require("../assets/deals2.jpeg"),
  },
  {
    id: 7,
    category: "Deals",
    name: "Chunky Duo",
    description: "2 Burgers (Chicken or Beef), 1 Drink 500 ml",
    price: "Rs. 1,090.00",
    image: require("../assets/deals3.jpeg"),
  },
  {
    id: 8,
    category: "Deals",
    name: "Family Feast 2",
    description: "2 Extra Large Pizza & 1 - 1.5 Litre Coke",
    price: "Rs. 3,850.00",
    image: require("../assets/deals4.jpg"),
  },
  {
    id: 9,
    category: "Appetizers",
    name: "Garlic Bread Plain",
    description: "Four pieces of freshly baked bread with garlic butter and herbs topping",
    price: "Rs. 270.00",
    image: require("../assets/appetizers1.jpeg"),
  },
  {
    id: 10,
    category: "Appetizers",
    name: "Cheesy Garlic Bread",
    description: "Four pieces of garlic bread smothered with melted cheese",
    price: "Rs. 380.00",
    image: require("../assets/appetizers2.jpeg"),
  },
  {
    id: 11,
    category: "Appetizers",
    name: "Nuggets & Chips",
    description: "Six pieces of nuggets with french fries",
    price: "Rs. 390.00",
    image: require("../assets/appetizers3.jpeg"),
  },
  {
    id: 12,
    category: "Appetizers",
    name: "Jalapeno Cheese Sticks",
    description: "Jalapeno cheese sticks served with dip sauce",
    price: "Rs. 630.00",
    image: require("../assets/appetizers4.jpeg"),
  },
  {
    id: 13,
    category: "Wings & Wraps",
    name: "Breaded Saucy Wings",
    description: "Crispy deep fried breaded chicken wings with buffalo sauce.",
    price: "Rs. 440.00",
    image: require("../assets/wings1.jpeg"),
  },
  {
    id: 14,
    category: "Wings & Wraps",
    name: "Oven Baked Wings",
    description: "Special oven baked wings with BBQ flavor.",
    price: "Rs. 440.00",
    image: require("../assets/wings2.jpeg"),
  },
  {
    id: 15,
    category: "Wings & Wraps",
    name: "Maxican Chilli Wings",
    description: "Batter fried wings tossed in Mexican chilli sauce.",
    price: "Rs. 440.00",
    image: require("../assets/wings3.jpeg"),
  },
  {
    id: 16,
    category: "Wings & Wraps",
    name: "Loaded Wings",
    description: "Chicken wings topped with special sauces.",
    price: "Rs. 480.00",
    image: require("../assets/wings4.jpeg"),
  },
  {
    id: 17,
    category: "Pastas",
    name: "White Penne Pasta",
    description: "Grilled chicken, mushrooms, and penne pasta baked in a blend of farmhouse, garnished with black olives and mozzarella cheese.",
    price: "Rs. 790.00",
    image: require("../assets/pastas1.jpeg"),
  },
  {
    id: 18,
    category: "Pastas",
    name: "Macaroni Special",
    description: "Chicken chunks, mushrooms, special sauce topped with mozzarella and cheddar cheese.",
    price: "Rs. 790.00",
    image: require("../assets/pastas2.jpeg"),
  },
  {
    id: 19,
    category: "Pastas",
    name: "Hot N Spicy",
    description: "Grileed chicken, mushrooms, and penne pasta baked in a blend of farmhouse, garnished with black olives and mozzarella cheese.",
    price: "Rs. 790.00",
    image: require("../assets/pastas3.jpeg"),
  },
  {
    id: 20,
    category: "Pastas",
    name: "Fettuccine Alfredo",
    description: "Grilled chicken, mushrooms, abd penne pasta baked in a blend of farmhouse, garnished with black olives and mozzarella cheese.",
    price: "Rs. 820.00",
    image: require("../assets/pastas4.jpeg"),
  },
  {
    id: 21,
    category: "Rolls & Platter",
    name: "Chicken Kabab Rolls",
    description: "4 pieces of rolls filled with chicken kebab, lettuce, onion ring, jalapenos, farmhouse sauce and cheese.",
    price: "Rs. 590.00",
    image: require("../assets/rolls1.jpeg"),
  },
  {
    id: 22,
    category: "Rolls & Platter",
    name: "Stuffed Chicken Spring Rolls",
    description: "4 pieces spring rolls, wrapped in tortilla bread, stuffed with special marinated chicken cubes, and topped with mozzarella cheese.",
    price: "Rs. 550.00",
    image: require("../assets/rolls2.jpeg"),
  },
  {
    id: 23,
    category: "Rolls & Platter",
    name: "Zinger Chicken Rolls",
    description: "Crispy chicken stuffed in creamy tortilla bread.",
    price: "Rs. 590.00",
    image: require("../assets/rolls3.jpeg"),
  },
  {
    id: 24,
    category: "Rolls & Platter",
    name: "Chunk N Cheese Platter",
    description: "4 pieces spring rolls, wrapped in tortilla bread, stuffed with special marinated chicken cubes, and topped with mozzarella cheese.",
    price: "Rs. 890.00",
    image: require("../assets/rolls4.jpeg"),
  },
  {
    id: 25,
    category: "Salad & Sandwich",
    name: "Salad",
    description: " ",
    price: "Rs. 440.00",
    image: require("../assets/sandwiches1.jpeg"),
  },
  {
    id: 26,
    category: "Salad & Sandwich",
    name: "Classic Chicken Sandwich",
    description: "Cube chicken, lettuce, tomatoes and cheese served with special sauce & french fries.",
    price: "Rs. 790.00",
    image: require("../assets/sandwiches2.jpeg"),
  },
  {
    id: 27,
    category: "Salad & Sandwich",
    name: "Five Star Sandwich",
    description: "A unique arrangement of special fie ingredients and its wonder to eat with topped cheese and sauce",
    price: "Rs. 830.00",
    image: require("../assets/sandwiches3.jpeg"),
  },
  {
    id: 28,
    category: "Salad & Sandwich",
    name: "Mughlai Chicken Sandwich",
    description: "Special marinated creamy mughlai chicken with lettuce, tomatoes, cheese served with creamy mughlai sauce & french fries.",
    price: "Rs. 790.00",
    image: require("../assets/sandwiches4.jpeg"),
  },
  {
    id: 29,
    category: "Favourite Pizza",
    name: "Tandoori Paneer",
    description: "Tandoori sauce with tandoori chicken, onion, cheese, sprinkled special herbs & spices.",
    price: "Rs. 500.00",
    image: require("../assets/favourite1.jpeg"),
  },
  {
    id: 30,
    category: "Favourite Pizza",
    name: "Fajita Chicken",
    description: "Fajita chicken, green pepper, tomato sauce, onions & mozzarella cheese.",
    price: "Rs. 500.00",
    image: require("../assets/favourite2.jpeg"),
  },
  {
    id: 31,
    category: "Favourite Pizza",
    name: "Mexican 360 Mayo",
    description: "Chicken, mayonnaise and mozzarella cheese.",
    price: "Rs. 500.00",
    image: require("../assets/favourite3.jpeg"),
  },
  {
    id: 32,
    category: "Favourite Pizza",
    name: "Classic Euro",
    description: "Smoked chicken, chicken sausage, mushrooms, green peppers, tomatoes, olives & mozzarella cheese",
    price: "Rs. 500.00",
    image: require("../assets/favourite4.jpeg"),
  },
  {
    id: 33,
    category: "Make Your Own Pizza",
    name: "Half & Half Pizza",
    description: "Choose any 2 toppings",
    price: "Rs. 1150.00",
    image: require("../assets/make1.jpeg"),
  },
  {
    id: 34,
    category: "Make Your Own Pizza",
    name: "Half N Half Special",
    description: "Smoked chicken, chicken sausage, mushroom, green pepper, tomatoes & olives",
    price: "Rs. 1230.00",
    image: require("../assets/make2.jpeg"),
  },
  {
    id: 35,
    category: "Make Your Own Pizza",
    name: "Cheese Max",
    description: "Loaded with mozzarela cheese on top of tomato sauce.",
    price: "Rs. 420.00",
    image: require("../assets/make3.jpeg"),
  },
  {
    id: 36,
    category: "Make Your Own Pizza",
    name: "Veggie Max",
    description: "Black olives, mushrooms, onions, green pepper and tomatoes",
    price: "Rs. 420.00",
    image: require("../assets/make4.jpeg"),
  },
  {
    id: 37,
    category: "Signature Pizza",
    name: "Best Of West",
    description: "Juicy chicken, mized vegetables, pepperoni, mexican sauce topped with cheese",
    price: "Rs. 1290.00",
    image: require("../assets/signature1.jpeg"),
  },
  {
    id: 38,
    category: "Signature Pizza",
    name: "Double Melt Extreme",
    description: "Double crust with special cheese sauces.",
    price: "Rs. 1290.00",
    image: require("../assets/signature2.jpeg"),
  },
  {
    id: 380,
    category: "Signature Pizza",
    name: " ",
    description: " ",
    price: " ",
    // image: require("../assets/signature2.jpeg"),
  },
  {
    id: 381,
    category: "Signature Pizza",
    name: " ",
    description: " ",
    price: " ",
    // image: require("../assets/signature2.jpeg"),
  },
  {
    id: 39,
    category: "Pizza Special",
    name: "Home Town Special",
    description: "Spicy chicken, creamy homemade sauce, green peppers, onion mushrooms, chicken sausages, black olives and lots of cheese",
    price: "Rs. 520.00",
    image: require("../assets/special1.jpeg"),
  },
  {
    id: 40,
    category: "Pizza Special",
    name: "Peri Slice",
    description: "Peri peri chicken, onions, veggies, pickles, jalapenos, mixed herbs, mozzarella cheese and peri mayo sauce",
    price: "Rs. 520.00",
    image: require("../assets/special2.jpeg"),
  },
  {
    id: 41,
    category: "Pizza Special",
    name: "The Fire House",
    description: "Signature pizza with special creamy mughlai chicken, green peppers, onions, sliced tomatoes, jalapenos, special white creamy sauce and mozzarella cheese.",
    price: "Rs. 520.00",
    image: require("../assets/special3.jpeg"),
  },
  {
    id: 42,
    category: "Pizza Special",
    name: "The Bonfire",
    description: "Spicy chicken, onions, mixed veggies, red jalapenos, topped with mozzarella cheese.",
    price: "Rs. 520.00",
    image: require("../assets/special4.jpeg"),
  },
  {
    id: 43,
    category: "Addons",
    name: "Mayo Dip",
    description: "  ",
    price: "Rs. 50.00",
    image: require("../assets/addons1.jpeg"),
  },
  {
    id: 44,
    category: "Addons",
    name: "Coke",
    description: "  ",
    price: "Rs. 120.00",
    image: require("../assets/addons2.jpeg"),
  },
  {
    id: 45,
    category: "Addons",
    name: "Sprite",
    description: "  ",
    price: "Rs. 120.00",
    image: require("../assets/addons3.jpeg"),
  },
  {
    id: 46,
    category: "Addons",
    name: "Water",
    description: "  ",
    price: "Rs. 80.00",
    image: require("../assets/addons4.jpeg"),
  },
];

// Categories for the navbar
const categories = [
  "Burgers",
  "Deals",
  "Appetizers",
  "Wings & Wraps",
  "Pastas",
  "Rolls & Platter",
  "Salad & Sandwich",
  "Favourite Pizza",
  "Make Your Own Pizza",
  "Signature Pizza",
  "Pizza Special",
  "Addons",
];

const MenuScreen = ({ route }) => {
  const navigation = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState("Burgers");
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  const [selectedAddon, setSelectedAddon] = useState(null);
  const [addonPrice, setAddonPrice] = useState(0);

  // Update cart items from Cart screen
  useEffect(() => {
    if (route.params?.updatedCartItems) {
      setCartItems(route.params.updatedCartItems);
    }
  }, [route.params?.updatedCartItems]);

  // Slider functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Filter menu items based on the selected category
  const filteredMenuItems = (category) => {
    return menuItems.filter((item) => item.category === category);
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedItem(item); // Set the selected item
        setModalVisible(true); // Open the modal
      }}
      style={styles.menuItem}
    >
      <View style={styles.menuDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>

      <View style={styles.plusContainer}>
        <Image
          source={item.image}
          style={styles.itemImage}
        />
        <Text style={styles.plusText}>+</Text>
      </View>
    </TouchableOpacity>
  );


  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

   const totalPrice = cartItems.reduce((total, item) => total + (parseFloat(item.price.replace(/Rs\. /, '').replace(/,/g, '')) * item.quantity),0).toFixed(2);

   const addToCart = (item) => {
     const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

     if (existingItemIndex > -1) {
       // If item already exists in cart, update quantity
       const updatedCartItems = [...cartItems];
       updatedCartItems[existingItemIndex].quantity += quantity;
       updatedCartItems[existingItemIndex].totalPrice += (parseFloat(item.price.replace(/Rs\. /,'').replace(/,/g,'')) + addonPrice) * quantity; // Update total price with addon
       setCartItems(updatedCartItems);
     } else {
       // If item is new, add it to cart
       setCartItems([...cartItems,{ ...item , quantity}]);
     }

     setModalVisible(false); // Close modal after adding to cart
     setQuantity(1); // Reset quantity for next selection
   };

   return (
     <FlatList
       data={filteredMenuItems(selectedCategory)} // Apply category filter
       keyExtractor={(item) => item.id.toString()}
       renderItem={renderMenuItem}
       contentContainerStyle={styles.menuList}
       ListHeaderComponent={
         <>
           {/* Image Slider */}
           <View style={styles.sliderContainer}>
             <Image source={images[sliderIndex]} style={styles.sliderImage} resizeMode="contain" />
           </View>

           {/* Category Navbar */}
           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
             {categories.map((category) => (
               <TouchableOpacity
                 key={category}
                 onPress={() => setSelectedCategory(category)}
                 style={[styles.categoryButton, selectedCategory === category ? styles.activeCategoryButton : styles.inactiveCategoryButton]}
               >
                 <Text
                   style={[styles.categoryText, selectedCategory === category ? styles.activeCategoryText : styles.inactiveCategoryText]}
                 >
                   {category}
                 </Text>
               </TouchableOpacity>
             ))}
           </ScrollView>
         </>
       }
       ListFooterComponent={
         <>
           {/* Modal for Enlarged Item */}
           <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
             <View style={styles.modalOverlay}>
               <View style={styles.modalContent}>
                 <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                   <Text style={styles.closeText}>X</Text>
                 </TouchableOpacity>
                 <Image source={selectedItem?.image} style={styles.modalImage} />

                 {/* Item Name and Price */}
                 <View style={styles.modalItemInfo}>
                   <Text style={styles.modalItemName}>{selectedItem?.name}</Text>
                   <Text style={[styles.modalItemPrice]}>{selectedItem?.price}</Text>
                 </View>

                 {/* Item Description */}
                 <Text style={styles.modalItemDescription}>{selectedItem?.description}</Text>

                 {/* Grey Line */}
                 <View style={styles.separator} />

                 {/* Addon Section */}
<View style={styles.addonSection}>
  <Text style={{ fontWeight: 'bold' }}>Addon:</Text>
  <Text>Please select any option:</Text>
  <View style={styles.addonOption}>
    <RadioButton
      text="Fries & Drink"
      // price={150}
      isSelected={selectedAddon === 'Fries & Drink'}
      onPress={() => {
        setSelectedAddon('Fries & Drink');
        setAddonPrice(150);
      }}
    />
    <Text style={styles.addonPrice}>Rs. 150.00</Text>
  </View>
  <View style={styles.quantityButtonsContainer}>
                   <TouchableOpacity onPress={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)} style={styles.quantityButton}>
                     <Text style={styles.quantityText}>-</Text>
                   </TouchableOpacity>

                   <Text style={styles.quantityDisplay}>{quantity}</Text>

                   <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}>
                     <Text style={styles.quantityText}>+</Text>
                   </TouchableOpacity>

                   {/* Add to Cart Button */}
                   <TouchableOpacity onPress={() => addToCart(selectedItem)} style={styles.addToCartButton}>
                     <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                   </TouchableOpacity>
                 </View>

</View>


                 {/* Quantity Control */}


               </View>
             </View>
           </Modal>

           {/* Bottom Navigation Bar */}
           {/* Bottom Navigation Bar */}
{totalItems > 0 && (
  <View style={styles.bottomNavBar}>
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart', { cartItems })}
      style={styles.cartCircle}
    >
      <Text>{totalItems}</Text>
    </TouchableOpacity>
    <Text style={{ fontWeight: 'bold', color: '#fff', marginLeft: 10 }}>View Cart</Text>
    <View style={{ flex: 1 }} />
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={{ color: '#fff', fontSize: 12 }}>{`Rs. ${totalPrice}`}</Text>
      <Text style={{ color: '#fff', fontSize: 10 }}>Price Exclusive TAX</Text>
    </View>
  </View>
)}

         </>
       }
     />
   );
};

// Custom Radio Button Component
const RadioButton = ({ text, price, isSelected, onPress }) => (
   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
     <TouchableOpacity onPress={onPress}
       style={{
         width:20,
         height:20,
         borderRadius:10,
         borderWidth:2,
         borderColor:'#000',
         justifyContent:'center',
         alignItems:'center',
         backgroundColor:isSelected ? '#000' : 'transparent'
       }}>
       {isSelected && (
         <View style={{ width:12,height:12,borderRadius:6,backgroundColor:'#fff' }} />
       )}
     </TouchableOpacity>
     <Text>{text}</Text>
     {/* <Text>Rs. {price}</Text> */}
   </View>
);

const styles = StyleSheet.create({

  sliderContainer: {
    width: 700,
    height: 610,
    marginBottom: -200,
    marginLeft: -160,
    marginTop: -180,
  },
  sliderImage: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  categoryContainer: {
    flexDirection: "row",
    height: 60, // Fixed height for the category navbar
    paddingTop: 3,
    paddingBottom: 3,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  categoryButton: {
    // marginVertical: 2,
    marginRight: 15,
    marginLeft: 5,
    marginTop: 9,
    marginBottom: 8,
    // padding: 10,
    paddingTop: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "space-between",
  },
  activeCategoryButton: {
    backgroundColor: "#ffcc00", // Yellow background for selected category
  },
  inactiveCategoryButton: {
    backgroundColor: "#fff", // White background for unselected categories
  },
  categoryText: {
    fontSize: 16,
  },
  menuList:{
    paddingBottom :100 // Space for bottom navbar
 },
  activeCategoryText: {
    color: "#fff", // White text for the selected category
  },
  inactiveCategoryText: {
    color: "#888", // Grey text for unselected categories
  },
  menuItem: {
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 10,
    // paddingVertical: 2,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center", // Align items in the center
  },
  menuDetails: {
    // flex: 2,
    marginRight: 60,
    paddingRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "#555",
    marginRight: 20,
    marginVertical: 15,
    marginBottom: 15,
  },
  itemPrice: {
    fontSize: 14,
    color: "#ff6347",
    fontWeight: "bold",
  },
  imageContainer: {
    position: "relative", // To allow absolute positioning of the plus sign on top of the image
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginRight: 70,
    marginTop: -80,
  },
  plusContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#ffcc00", // Yellow background
    width: 30,
    height: 30,
    borderRadius: 15, // Circular shape
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Ensure the plus sign stays on top of the image
  },
  plusText: {
    fontSize: 20,
    color: "#fff", // White text
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: screenWidth - 40,
    backgroundColor: "#fff",
    // padding: 20,
    borderRadius: 10,
    alignItems:"flex-start", // Align items to the left
    flex: 1,
    padding: 16,
    // justifyContent: 'space-between',
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#1B02A4",
    padding: 10,
    borderRadius: 20,
  },
  closeText: {
    fontSize: 20,
    color: "#fff",
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalItemName:{
    fontSize :18 ,
    fontWeight :"bold" ,
    textAlign :'left',
    width:'70%', // Adjust width as necessary
 },
 modalItemPrice:{
  textAlign :'left',
  color:'#000',
  fontSize: 12, // Smaller size for price
  width:'30%', // Adjust width as necessary

},
  modalItemDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  modalItemInfo:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10
  },
  quantityControl: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between', // Space between quantity controls and Add to Cart button
    marginTop: 15, // Add some margin for spacing
},

quantityButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
    // paddingRight: 10,
    // paddingHorizontal: 1,
},

quantityButton: {
    backgroundColor: "#ffcc00",
    paddingVertical: 5,
    paddingHorizontal: 4,
    borderRadius: 5,
    marginRight: 5,
    // marginHorizontal: 15,
},

quantityText: {
    fontSize: 20,
    color: "#fff",
    textAlign: 'center',
},

quantityDisplay: {
    fontSize: 18,
    marginHorizontal: 5,
},

addToCartButton: {
    backgroundColor: '#003580',
    paddingVertical: 10,
    paddingHorizontal: 55, // Adjusted for better spacing
    borderRadius: 5,
    alignSelf: 'flex-end', // Align button to the right
},

addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
},

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 20,
   },
   modalContent: {
     width: screenWidth - 40,
     backgroundColor: "#fff",
     borderRadius: 10,
     padding: 20,
     alignItems: "center",
   },
   separator: {
     height: 1,
     backgroundColor: "#ccc",
     marginVertical: 10,
     width: '100%',
   },
   addonSection: {
    width: '100%',
    marginVertical: 10,
  },

  addonOption: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    width: '100%',
    flexDirection:'row',
  },

  addonText: {
    marginLeft: -70, // Space between radio button and text
  },

  addonPrice: {
    color: '#000', // Price color
    fontSize: 12, // Smaller font size for price
  },
  bottomNavBar:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor: "#003580",
    paddingVertical :10,
    paddingHorizontal :15,
    text: "#fff",
 },
 cartCircle:{
    width :30,
    height :30,
    borderRadius :15,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    marginRight :10
 },
});


export default MenuScreen;
