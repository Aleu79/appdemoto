import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, FlatList, StyleSheet, Text } from 'react-native';
import { database } from './firebaseConfig';
import { ref, onValue } from 'firebase/database';
import MotoForm from './MotoForm';

const App = () => {
  const [motos, setMotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMotos, setFilteredMotos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Obtener motos desde Firebase
  useEffect(() => {
    const motosRef = ref(database, 'motos/');
    onValue(motosRef, (snapshot) => {
      const data = snapshot.val();
      const motosArray = [];
      for (const marca in data) {
        for (const id in data[marca]) {
          motosArray.push({ id, ...data[marca][id], marca });
        }
      }
      setMotos(motosArray);
    });
  }, []);

  // Filtrar motos según el término de búsqueda
  const handleSearch = () => {
    if (searchTerm) {
      const filtered = motos.filter(moto =>
        moto.marca.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMotos(filtered);
    } else {
      setFilteredMotos([]); // Si no hay término, no mostrar nada
    }
  };

  const handleAddMoto = () => {
    setShowForm(!showForm);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar moto por marca..."
          placeholderTextColor="#888" 
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch} // Buscar cuando se presiona 'Enter'
        />
        <View style={styles.buttonContainer}>
          <Button title="Buscar" onPress={handleSearch} color="#007bff" />
          <Button title="Agregar Moto" onPress={handleAddMoto} color="#28a745" />
        </View>
        {showForm && <MotoForm />}
      </View>
      {filteredMotos.length > 0 && (
        <FlatList
          data={filteredMotos}
          keyExtractor={item => item.id.toString()} // Asegurar que la clave sea única
          renderItem={({ item }) => (
            <View style={styles.motoItem}>
              <Text style={styles.motoText}>{`${item.marca} ${item.nombre} (${item.modelo})`}</Text>
              <Text style={styles.motoDetail}>{`Año: ${item.año}, Motor: ${item.motor}, Color: ${item.color}`}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#e6e6e6',
  },
  inputContainer: {
    width: '80%', 
    alignItems: 'center',
  },
  searchInput: {
    height: 50,
    width: '100%', 
    borderColor: '#007bff',
    borderWidth: 2,
    borderRadius: 40,
    marginBottom: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3, 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',  },
  motoItem: {
    marginVertical: 10,
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 40, 
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3, 
  },
  motoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  motoDetail: {
    fontSize: 14,
    color: '#555',
  },
});

export default App;
