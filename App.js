import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef} from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';

import api from './src/services';

export default function App() {

  const [cep, setCep] = useState();
  const inputRef = useRef(null);
  const [cepUser, setCepUSer] = useState(null);



  async function BuscarCep(){
    if(cep === ''){
      alert('Digite um CEP valido');
      setCep('');
      return;
    }

    try{
      const response = await api.get(`/${cep}/json`);
      setCepUSer(response.data);

      Keyboard.dismiss();
    }catch(error){
      console.log('ERROR: ' + error)
    }


  }

  function LimparCep(){
    setCep('');
    setCepUSer(null);
    inputRef.current.focus();

  }


  return (

    <View style={styles.container}>
      <StatusBar hidden />

      <View style={styles.areainput}>
        <Text style={styles.titulo}>Insirá um CEP valida</Text>
        <TextInput 
        keyboardType='numeric'
        style={styles.input}
        placeholder='Ex: 13185411'
        value={cep}
        onChangeText={ (texto) => setCep(texto)}
        ref={inputRef}
        />
      </View>

      <View style={styles.btnarea}>
        <TouchableOpacity style={styles.botao} onPress={BuscarCep}>
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={LimparCep}>
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser && 
        <ScrollView horizontal style={{backgroundColor: '#191919', width: '100%', maxHeight: 250, borderColor: '#000', borderWidth: 5, marginTop: 50, flexDirection: 'row'}}>
          <View style={styles.areResult}>
            <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
            <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
            <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
            <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
            <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
          </View>
        </ScrollView>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#252525'
  },
  areainput:{
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9'
  },
  titulo:{
    fontSize: 18,
    marginBottom: 15
  },
  input:{
    height: 50,
    width: '100%',
    fontSize: 18,
    padding: 5,
    marginBottom: 10,
    marginTop: 10,
    borderColor: '#a9a9a9',
    borderWidth: 1
  },
  btnarea:{
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  botao:{
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    backgroundColor: '#ff0000'
  },
  botaoText:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  areResult:{
    flex: 1,
    paddingLeft: 10,
    paddingRight: 20,
    justifyContent: 'center',
  },
  itemText:{
    fontSize: 22,
    color: '#fff',
    flexWrap: 'wrap'
  }
});
