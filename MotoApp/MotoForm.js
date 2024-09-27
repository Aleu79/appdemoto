import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { agregarMoto } from './firebaseService'; 

const MotoForm = () => {
  const [nombre, setNombre] = useState('');
  const [modelo, setModelo] = useState('');
  const [año, setAño] = useState('');
  const [motor, setMotor] = useState('');
  const [color, setColor] = useState('');
  const [marca, setMarca] = useState('');

  const handleAgregarMoto = () => {
    if (!nombre || !modelo || !año || !motor || !color || !marca) {
      Alert.alert("Por favor completa todos los campos");
      return;
    }

    const nuevaMoto = {
      nombre,
      modelo,
      año,
      motor,
      color
    };

    agregarMoto(marca, nuevaMoto);
    Alert.alert("Moto agregada correctamente");

    // Limpia los campos después de agregar
    setNombre('');
    setModelo('');
    setAño('');
    setMotor('');
    setColor('');
    setMarca('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Marca (ej: ducati)"
        value={marca}
        onChangeText={setMarca}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de la moto"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={styles.input}
        placeholder="Año"
        value={año}
        onChangeText={setAño}
      />
      <TextInput
        style={styles.input}
        placeholder="Motor"
        value={motor}
        onChangeText={setMotor}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />
      <Button style={styles.btn} title="Agregar Moto" onPress={handleAgregarMoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
  input: {
    height: 50,
    padding: 15,
    borderColor: '#dfdfdf',
    borderRadius: 40,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  btn: {
    borderRadius: 20,
    marginTop: 10,
  },
});

export default MotoForm;
