import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const IP = "192.168.0.102";

export default function App() {
  const [titulos, setTitulos] = useState([]);
  const [novoTitulo, setNovoTitulo] = useState("");

  async function cadastrar() {
    const response = await fetch(`http://${IP}:3000/api/titulos`, {
      method: "POST",
      body: JSON.stringify({ titulo: novoTitulo }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setNovoTitulo("");
    listar();
  }

  async function listar() {
    const response = await fetch(`http://${IP}:3000/api/titulos`);
    const json = await response.json();
    setTitulos(json);
  }

  async function remover(id) {
    const response = await fetch(
      `http://${IP}:3000/api/titulos/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    listar();
  }

  async function atualizar(id) {
    const response = await fetch(
      `http://${IP}:3000/api/titulos/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titulo: novoTitulo }),
      },
    );
    setNovoTitulo("");
    listar();
  }

  function editar(titulo) {
    setNovoTitulo(titulo.titulo);
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={novoTitulo}
        onChangeText={setNovoTitulo}
        placeholder="Digite seu título."
      />
      <Button title="Cadastrar (POST)" onPress={() => cadastrar()} />
      <Button title="Listar (GET)" onPress={() => listar()} />
      <FlatList
        data={titulos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View>
            <Text>{item.titulo}</Text>
            <Button title="Editar" onPress={() => editar(item)} />
            <Button
              title="Atualizar (PATCH)"
              onPress={() => atualizar(item.id)}
            />
            <Button
              title="Excluir (DELETE)"
              onPress={() => remover(item.id)}
              color="red"
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
});
