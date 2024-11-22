import React from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';

type CategoryListProps = {
  categories: string[];
  onCategoryPress: (category: string) => void;
  selectedCategory: string;
};

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onCategoryPress,
  selectedCategory,
}) => {
  return (
    <SafeAreaView>
      <View style={styles.category}>
        {categories.map((cat, i) => (
          <Pressable
            style={[
              styles.categoryButton,
              cat === selectedCategory && styles.selectedCategoryButton,
            ]}
            key={i}
            onPress={() => onCategoryPress(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                cat === selectedCategory && styles.selectedCategoryText,
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  category: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    marginBottom: 5,
  },
  selectedCategoryButton: {
    backgroundColor: '#6200EE',
  },
  categoryText: {
    color: '#000',
  },
  selectedCategoryText: {
    color: '#FFF',
  },
});


